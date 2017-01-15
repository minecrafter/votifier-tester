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
	router.Path("/").Handler(http.FileServer(http.Dir("./assets")))
	router.Path("/main.js").Handler(http.FileServer(http.Dir("./assets")))
	router.Path("/send").Methods("POST").HandlerFunc(SendVote)
	http.ListenAndServe(":"+port, router)
}
