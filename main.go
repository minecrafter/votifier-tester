package main

import (
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	router := mux.NewRouter()
	router.Path("/").Methods("GET").Handler(http.FileServer(http.Dir("./assets")))
	router.Path("/main.js").Methods("GET").Handler(http.FileServer(http.Dir("./assets")))
	router.Path("/send").Methods("POST").HandlerFunc(SendVote)
	http.ListenAndServe(":"+port, router)
}
