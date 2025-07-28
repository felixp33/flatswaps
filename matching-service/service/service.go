package service

import (
	"encoding/json"
	"net/http"
	"strings"
	"sync"
)

// BinarySearchEntry holds a binary encoded search entry.
type BinarySearchEntry struct {
	UserID       string `json:"user_id"`
	CityID       uint8  `json:"city_id"`
	PropertyBits uint8  `json:"property_bits"`
	MinRooms     uint8  `json:"min_rooms"`
	MaxPrice     uint32 `json:"max_price"`
	Amenities    uint64 `json:"amenities"`
	DateStart    uint32 `json:"date_start"`
	DateEnd      uint32 `json:"date_end"`
}

// PropertyEntry represents a property listed by a user.
type PropertyEntry struct {
	UserID    string `json:"user_id"`
	CityID    uint8  `json:"city_id"`
	Rooms     uint8  `json:"rooms"`
	Price     uint32 `json:"price"`
	Amenities uint64 `json:"amenities"`
}

// Server holds search and property data in memory.
type Server struct {
	mu         sync.RWMutex
	Searches   map[string]BinarySearchEntry
	Properties map[string]PropertyEntry
}

// NewServer creates an empty server instance.
func NewServer() *Server {
	return &Server{
		Searches:   make(map[string]BinarySearchEntry),
		Properties: make(map[string]PropertyEntry),
	}
}

// addSearch handles POST /search to store a search entry
func (s *Server) AddSearch(w http.ResponseWriter, r *http.Request) {
	var entry BinarySearchEntry
	if err := json.NewDecoder(r.Body).Decode(&entry); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	s.mu.Lock()
	s.Searches[entry.UserID] = entry
	s.mu.Unlock()
	w.WriteHeader(http.StatusNoContent)
}

// addProperty handles POST /property to store a property entry
func (s *Server) AddProperty(w http.ResponseWriter, r *http.Request) {
	var entry PropertyEntry
	if err := json.NewDecoder(r.Body).Decode(&entry); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	s.mu.Lock()
	s.Properties[entry.UserID] = entry
	s.mu.Unlock()
	w.WriteHeader(http.StatusNoContent)
}

// Match handles GET /match and returns possible cycles.
func (s *Server) Match(w http.ResponseWriter, r *http.Request) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	cycles := s.FindCycles()
	json.NewEncoder(w).Encode(cycles)
}

// matchSearch checks if a property satisfies a search entry.
func matchSearch(search BinarySearchEntry, prop PropertyEntry) bool {
	if search.CityID != prop.CityID {
		return false
	}
	if prop.Rooms < search.MinRooms {
		return false
	}
	if prop.Price > search.MaxPrice {
		return false
	}
	if search.Amenities&prop.Amenities != search.Amenities {
		return false
	}
	return true
}

// FindCycles searches for swap cycles of length 2-4.
func (s *Server) FindCycles() [][]string {
	adj := make(map[string][]string)
	for u, search := range s.Searches {
		for v, prop := range s.Properties {
			if u == v {
				continue
			}
			if matchSearch(search, prop) {
				adj[u] = append(adj[u], v)
			}
		}
	}

	seen := make(map[string]bool)
	var cycles [][]string

	var dfs func(start string, path []string)
	dfs = func(start string, path []string) {
		if len(path) > 4 {
			return
		}
		last := path[len(path)-1]
		for _, next := range adj[last] {
			if next == start && len(path) >= 2 {
				cycle := append(append([]string{}, path...), start)
				key := canonicalCycleKey(cycle)
				if !seen[key] {
					seen[key] = true
					cycles = append(cycles, cycle)
				}
			} else if !contains(path, next) {
				dfs(start, append(path, next))
			}
		}
	}

	for u := range adj {
		dfs(u, []string{u})
	}
	return cycles
}

func contains(slice []string, v string) bool {
	for _, s := range slice {
		if s == v {
			return true
		}
	}
	return false
}

// canonicalCycleKey returns a deterministic key for a cycle, ignoring rotation.
func canonicalCycleKey(cycle []string) string {
	if len(cycle) == 0 {
		return ""
	}
	c := append([]string{}, cycle[:len(cycle)-1]...)
	idx := 0
	for i := 1; i < len(c); i++ {
		if c[i] < c[idx] {
			idx = i
		}
	}
	rotated := append(c[idx:], c[:idx]...)
	return strings.Join(rotated, "->")
}
