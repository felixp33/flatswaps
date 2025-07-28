package main

import (
	"fmt"
	"strings"
	"time"

	"github.com/flatswaps/matching-service/service"
)

func printCycles(srv *service.Server) [][]string {
	cycles := srv.FindCycles()
	fmt.Printf("Found %d cycles:\n", len(cycles))
	for i, c := range cycles {
		fmt.Printf("  Cycle %d: %s\n", i+1, strings.Join(c, " -> "))
	}
	fmt.Println()
	return cycles
}

func main() {
	fmt.Println("Starting matching service demo...")
	srv := service.NewServer()

	// load initial 30 users grouped in 3-person cycles
	for i := 1; i <= 30; i++ {
		uid := fmt.Sprintf("U%02d", i)
		cityProp := uint16(((i - 1) % 3) + 1)
		citySearch := cityProp%3 + 1
		srv.Properties[uid] = service.PropertyEntry{UserID: uid, CityID: cityProp, Rooms: 1, Size: 20, Price: 500, RoomType: 1, Amenities: 1}
		srv.Searches[uid] = service.BinarySearchEntry{UserID: uid, CityID: citySearch, MinRooms: 1, MinSize: 15, MaxPrice: 600, RoomType: 1, Amenities: 1}
		fmt.Printf("Added initial user %s\n", uid)
		time.Sleep(200 * time.Millisecond)
	}

	fmt.Println("Initial users inserted. Matching...")
	printCycles(srv)

	// add 10 more users over time forming 5 two-person cycles
	for i := 31; i <= 40; i++ {
		time.Sleep(1500 * time.Millisecond)
		uid := fmt.Sprintf("U%02d", i)
		// alternate cities to create 2-person cycles
		var cityProp, citySearch uint16
		if i%2 == 1 {
			cityProp = 1
			citySearch = 2
		} else {
			cityProp = 2
			citySearch = 1
		}
		srv.Properties[uid] = service.PropertyEntry{UserID: uid, CityID: cityProp, Rooms: 1, Size: 20, Price: 500, RoomType: 1, Amenities: 1}
		srv.Searches[uid] = service.BinarySearchEntry{UserID: uid, CityID: citySearch, MinRooms: 1, MinSize: 15, MaxPrice: 600, RoomType: 1, Amenities: 1}
		fmt.Printf("Added delayed user %s\n", uid)
		cycles := printCycles(srv)
		if len(cycles) > 0 {
			c := cycles[0]
			fmt.Printf("Showing cycle %s\n", strings.Join(c, " -> "))
			srv.RejectPair(c[0], c[1])
			fmt.Printf("%s rejects %s\n", c[0], c[1])
			fmt.Println("Cycles after rejection:")
			printCycles(srv)
		}
	}
}
