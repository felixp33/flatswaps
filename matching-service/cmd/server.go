package main

import (
	"log"
	"net/http"

	"github.com/flatswaps/matching-service/service"
)

func main() {
	srv := service.NewServer()
	http.HandleFunc("/search", srv.AddSearch)
	http.HandleFunc("/property", srv.AddProperty)
	http.HandleFunc("/match", srv.Match)
	log.Println("matching service listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
