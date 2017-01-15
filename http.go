package main

import (
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"os"
	"strings"

	"github.com/minecrafter/go-votifier"
)

// SendVote sends the vote to be processed.
func SendVote(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var vr voteRequest
	if err := json.NewDecoder(r.Body).Decode(&vr); err != nil {
		log.Println("can't deserialize client JSON:", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	decoded, err := base64.StdEncoding.DecodeString(vr.PublicKey)
	if err != nil {
		log.Println("can't deserialize client public key:", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	pkt, err := x509.ParsePKIXPublicKey(decoded)
	if err != nil {
		log.Println("can't parse client key:", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	key, ok := pkt.(*rsa.PublicKey)
	if !ok {
		log.Println("client key is not valid:", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Create the vote.
	vote := votifier.Vote{
		ServiceName: "test-votifier.minimum.io",
		Address:     getClientIP(r),
		Timestamp:   time.Now().String(),
		Username:    vr.Username,
	}
	log.Println("Sending vote", vote, "to", vr.Address)
	client := votifier.NewClient(vr.Address, key)
	if err = client.SendVote(vote); err != nil {
		log.Println("server error", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func getClientIP(r *http.Request) string {
	if os.Getenv("DYNO") == "" {
		return strings.Split(r.RemoteAddr, ":")[0]
	}
	xff := strings.Split(r.Header.Get("X-Forwarded-For"), ",")
	return xff[len(xff)-1]
}

type voteRequest struct {
	Address   string
	Username  string
	PublicKey string
}
