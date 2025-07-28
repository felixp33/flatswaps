package main

import (
	"fmt"
	"io"
	"log"
	"math/rand"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/flatswaps/matching-service/service"
)

func printCycles(logger *log.Logger, srv *service.Server) [][]string {
	cycles := srv.FindCycles()
	logger.Printf("Found %d cycles:", len(cycles))
	for i, c := range cycles {
		logger.Printf("  Cycle %d: %s", i+1, strings.Join(c, " -> "))
	}
	logger.Println("")
	return cycles
}

func main() {
	rand.Seed(time.Now().UnixNano())

	// create logs folder and file
	logDir := filepath.Join("logs")
	os.MkdirAll(logDir, 0o755)
	f, err := os.Create(filepath.Join(logDir, "demo.log"))
	if err != nil {
		log.Fatalf("failed to create log file: %v", err)
	}
	defer f.Close()

	logger := log.New(io.MultiWriter(os.Stdout, f), "", log.LstdFlags)

	logger.Println("Starting matching service demo...")
	srv := service.NewServer()

	// load initial users with random cities
	for i := 1; i <= 20; i++ {
		uid := fmt.Sprintf("U%02d", i)
		cityProp := uint16(rand.Intn(3) + 1)
		var citySearch uint16
		for {
			citySearch = uint16(rand.Intn(3) + 1)
			if citySearch != cityProp {
				break
			}
		}
		srv.Properties[uid] = service.PropertyEntry{UserID: uid, CityID: cityProp, Rooms: 1, Size: 20, Price: 500, RoomType: 1, Amenities: 1}
		srv.Searches[uid] = service.BinarySearchEntry{UserID: uid, CityID: citySearch, MinRooms: 1, MinSize: 15, MaxPrice: 600, RoomType: 1, Amenities: 1}
		logger.Printf("Added user %s", uid)
		time.Sleep(200 * time.Millisecond)
	}

	logger.Println("Initial users inserted. Matching...")
	printCycles(logger, srv)

	// add more users over time
	for i := 21; i <= 40; i++ {
		time.Sleep(1 * time.Second)
		uid := fmt.Sprintf("U%02d", i)
		cityProp := uint16(rand.Intn(3) + 1)
		var citySearch uint16
		for {
			citySearch = uint16(rand.Intn(3) + 1)
			if citySearch != cityProp {
				break
			}
		}
		srv.Properties[uid] = service.PropertyEntry{UserID: uid, CityID: cityProp, Rooms: 1, Size: 20, Price: 500, RoomType: 1, Amenities: 1}
		srv.Searches[uid] = service.BinarySearchEntry{UserID: uid, CityID: citySearch, MinRooms: 1, MinSize: 15, MaxPrice: 600, RoomType: 1, Amenities: 1}
		logger.Printf("Added user %s", uid)
		cycles := printCycles(logger, srv)
		if len(cycles) > 0 {
			c := cycles[0]
			if rand.Intn(2) == 0 {
				logger.Printf("%s accepts cycle %s", c[0], strings.Join(c, " -> "))
				for _, id := range c[:len(c)-1] {
					delete(srv.Properties, id)
					delete(srv.Searches, id)
				}
				logger.Println("Cycles after acceptance:")
				printCycles(logger, srv)
			} else {
				logger.Printf("%s rejects %s", c[0], c[1])
				srv.RejectPair(c[0], c[1])
				logger.Println("Cycles after rejection:")
				printCycles(logger, srv)
			}
		}
	}
}
