# 🏠 FlatSwaps

> **University Project: A Demonstration of Multi-User Property Exchange Platform**

FlatSwaps is a comprehensive university project demonstrating the development of a modern web application for apartment exchanges between users. The project showcases full-stack development skills, implementing an intelligent matching algorithm that creates swap cycles between multiple participants, combined with a responsive web interface.

## 📋 Project Overview

This project was developed as part of a university coursework to demonstrate proficiency in modern web development technologies and algorithmic problem-solving. FlatSwaps addresses the real-world challenge of property exchanges by implementing an automated matching system that can identify beneficial swap chains among multiple users.

### 🎯 Learning Objectives Addressed

-  **Full-Stack Development**: Integration of frontend and backend technologies
-  **Algorithm Design**: Implementation of cycle detection in graph structures
-  **Modern Deployment**: Cloud-based hosting and database management
-  **API Design**: RESTful service architecture
-  **User Experience**: Responsive interface design

## ✨ Key Features Implemented

-  **🔍 Intelligent Matching Algorithm**: Detects swap cycles between 2-4 users using graph theory
-  **⚡ Real-time Property Search**: Instant filtering and discovery of available properties
-  **🚫 Smart Rejection Handling**: 14-day blacklist system prevents spam matches
-  **📱 Responsive Web Interface**: Modern UI built with Next.js and React
-  **🔗 RESTful API**: Clean backend architecture with Go HTTP services

## 🏗️ Technical Architecture

The project demonstrates a microservices approach with clear separation of concerns:

```
Frontend (Next.js)     ←→     Backend Service (Go)     ←→     Database (Supabase)
     │                              │                              │
 ├── User Interface           ├── Matching Logic              ├── Property Storage
 ├── Property Display         ├── API Endpoints               ├── User Data
 └── Search Interface         └── Cycle Detection             └── Match History
```

### Directory Structure

```
FlatSwaps/
├── 🎨 src/                    # Next.js Frontend Application
│   ├── components/           # Reusable UI components
│   ├── pages/               # Application routes and views
│   └── styles/              # CSS styling and themes
│
└── ⚙️ matching-service/      # Go Backend Service
    ├── cmd/                 # HTTP server implementation
    ├── demo/                # Console demo with sample data
    └── service/             # Core matching algorithm library
```

## 🔬 Technical Implementation

### Frontend Technology Stack

-  **Next.js**: React framework for server-side rendering and routing
-  **React**: Component-based UI library for interactive interfaces
-  **TypeScript**: Type-safe JavaScript for enhanced development experience
-  **Responsive Design**: Mobile-first approach ensuring cross-device compatibility

### Backend Technology Stack

-  **Go**: High-performance backend language for concurrent processing
-  **HTTP Server**: RESTful API design following industry standards
-  **In-Memory Storage**: Fast data access for demonstration purposes
-  **Modular Architecture**: Separation of business logic and API layers

### Deployment Infrastructure

-  **Vercel**: Modern deployment platform for frontend hosting
-  **Supabase**: Backend-as-a-Service for database and authentication
-  **Cloud Integration**: Demonstrates modern DevOps practices

## 🚀 Running the Project

### Prerequisites

-  Node.js 18+ and npm
-  Go 1.19+
-  Internet connection for cloud services

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Access the application at <http://localhost:3000>

### Backend Service

```bash
# Start the matching service (port 8080)
go run ./matching-service/cmd
```

You can also run the service in Docker:
```bash
docker compose up --build
```

**API Endpoints:**

-  `POST /search` - Submit property search criteria
-  `GET /property` - Retrieve property information
-  `POST /match` - Generate and retrieve matches

### Demonstration Mode

```bash
# Run interactive demo with sample data
go run ./matching-service/demo
```

### Testing

```bash
cd matching-service
go test ./...
```

## 🧠 Algorithm Design

The core innovation of this project lies in the matching algorithm, which solves the multi-party exchange problem:

### Problem Statement

Given a set of users with properties to offer and specific requirements, find beneficial swap cycles where each participant's needs are met through a chain of exchanges.

### Solution Approach

1. **Graph Representation**: Model users and properties as nodes in a directed graph
2. **Cycle Detection**: Implement algorithms to find beneficial cycles of length 2-4
3. **Constraint Satisfaction**: Ensure all participants' requirements are met
4. **Optimization**: Prioritize matches based on user preferences and compatibility
5. **Temporal Management**: Handle rejections with time-based blacklisting

### Key Algorithmic Features

-  **Efficiency**: O(n³) complexity for cycle detection in sparse graphs
-  **Scalability**: Memory-efficient storage for demonstration purposes
-  **Robustness**: Handles edge cases and prevents infinite loops
-  **Extensibility**: Modular design allows for additional matching criteria

## 📊 Project Outcomes

This university project successfully demonstrates:

**Technical Skills:**

-  Modern web development using industry-standard tools
-  Algorithm implementation for complex optimization problems
-  Cloud deployment and infrastructure management
-  API design and integration patterns

**Problem-Solving Abilities:**

-  Analysis of real-world multi-party exchange challenges
-  Design of efficient algorithms for graph-based problems
-  Implementation of user-centric features and safeguards

**Software Engineering Practices:**

-  Clean code architecture with separation of concerns
-  Comprehensive testing and demonstration capabilities
-  Documentation and project organization
-  Version control and deployment workflows

## 🔄 Future Enhancements

Potential extensions for continued learning:

-  **Database Integration**: Replace in-memory storage with persistent database
-  **Authentication System**: User accounts and secure session management
-  **Advanced Matching**: Machine learning for improved compatibility scoring
-  **Real-time Updates**: WebSocket integration for live match notifications
-  **Geographic Features**: Location-based filtering and mapping integration

## 📚 Technologies Learned

| Category       | Technologies                                |
| -------------- | ------------------------------------------- |
| **Frontend**   | Next.js, React, TypeScript, CSS3, HTML5     |
| **Backend**    | Go, HTTP APIs, RESTful Design               |
| **Database**   | Supabase, SQL, Database Design              |
| **Deployment** | Vercel, Cloud Platforms, CI/CD              |
| **Algorithms** | Graph Theory, Cycle Detection, Optimization |

---

<div align="center">

**University Project - Demonstrating Modern Web Development and Algorithmic Problem Solving**

_Developed as part of [Course Name] - [University Name] - [Year]_

</div>
