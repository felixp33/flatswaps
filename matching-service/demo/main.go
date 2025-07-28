package main

import (
	"encoding/json"
	"fmt"

	"github.com/flatswaps/matching-service/service"
)

func main() {
	srv := service.NewServer()

	// sample properties and searches for 3-user cycle A->B->C->A
	srv.Properties["A"] = service.PropertyEntry{UserID: "A", CityID: 1, Rooms: 1, Price: 500, Amenities: 1}
	srv.Searches["A"] = service.BinarySearchEntry{UserID: "A", CityID: 2, MinRooms: 1, MaxPrice: 600, Amenities: 1}

	srv.Properties["B"] = service.PropertyEntry{UserID: "B", CityID: 2, Rooms: 1, Price: 400, Amenities: 1}
	srv.Searches["B"] = service.BinarySearchEntry{UserID: "B", CityID: 3, MinRooms: 1, MaxPrice: 600, Amenities: 1}

	srv.Properties["C"] = service.PropertyEntry{UserID: "C", CityID: 3, Rooms: 1, Price: 450, Amenities: 1}
	srv.Searches["C"] = service.BinarySearchEntry{UserID: "C", CityID: 1, MinRooms: 1, MaxPrice: 600, Amenities: 1}

	cycles := srv.FindCycles()
	out, _ := json.MarshalIndent(cycles, "", "  ")
	fmt.Println(string(out))
}
