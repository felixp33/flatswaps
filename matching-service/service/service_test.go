package service

import "testing"

func TestMatchSearch(t *testing.T) {
	search := BinarySearchEntry{CityID: 1, MinRooms: 2, MinSize: 20, MaxPrice: 1000, RoomType: 1, Amenities: 1}
	prop := PropertyEntry{CityID: 1, Rooms: 2, Size: 25, Price: 900, RoomType: 1, Amenities: 1}
	if !matchSearch(search, prop) {
		t.Fatal("expected match")
	}
}

func TestNoMatch(t *testing.T) {
	search := BinarySearchEntry{CityID: 1, MinRooms: 2, MinSize: 20, MaxPrice: 1000, RoomType: 1, Amenities: 1}
	prop := PropertyEntry{CityID: 2, Rooms: 2, Size: 25, Price: 900, RoomType: 1, Amenities: 1}
	if matchSearch(search, prop) {
		t.Fatal("expected no match")
	}
}

func TestFindCycles(t *testing.T) {
	srv := NewServer()
	srv.Properties["A"] = PropertyEntry{UserID: "A", CityID: 1, Rooms: 1, Size: 10, Price: 500, RoomType: 1, Amenities: 1}
	srv.Searches["A"] = BinarySearchEntry{UserID: "A", CityID: 2, MinRooms: 1, MinSize: 5, MaxPrice: 600, RoomType: 1, Amenities: 1}
	srv.Properties["B"] = PropertyEntry{UserID: "B", CityID: 2, Rooms: 1, Size: 10, Price: 400, RoomType: 1, Amenities: 1}
	srv.Searches["B"] = BinarySearchEntry{UserID: "B", CityID: 1, MinRooms: 1, MinSize: 5, MaxPrice: 600, RoomType: 1, Amenities: 1}

	cycles := srv.FindCycles()
	if len(cycles) != 1 {
		t.Fatalf("expected 1 cycle, got %d", len(cycles))
	}
}

func TestRejectPair(t *testing.T) {
	srv := NewServer()
	srv.Properties["A"] = PropertyEntry{UserID: "A", CityID: 1, Rooms: 1, Size: 10, Price: 500, RoomType: 1, Amenities: 1}
	srv.Searches["A"] = BinarySearchEntry{UserID: "A", CityID: 1, MinRooms: 1, MinSize: 5, MaxPrice: 600, RoomType: 1, Amenities: 1}
	srv.Properties["B"] = PropertyEntry{UserID: "B", CityID: 1, Rooms: 1, Size: 10, Price: 400, RoomType: 1, Amenities: 1}
	srv.Searches["B"] = BinarySearchEntry{UserID: "B", CityID: 1, MinRooms: 1, MinSize: 5, MaxPrice: 600, RoomType: 1, Amenities: 1}

	if len(srv.FindCycles()) == 0 {
		t.Fatal("expected initial cycle")
	}
	srv.RejectPair("B", "A")
	if len(srv.FindCycles()) != 0 {
		t.Fatal("expected cycle to disappear after rejection")
	}
}
