# 🏠 FlatSwaps

> **A modern flat swapping platform connecting users through intelligent property matching**

FlatSwaps is an innovative demo project that enables seamless apartment exchanges between users. Built with a sleek Next.js frontend and powered by a robust Go matching service, it creates intelligent swap cycles to help users find their perfect home exchange.

## ✨ Features

-  **🔍 Smart Matching**: Advanced algorithm finds swap cycles between 2-4 users
-  **🚫 Rejection Protection**: 14-day blacklist prevents repeated unwanted matches
-  **⚡ Real-time Search**: Instant property discovery and matching
-  **🎯 Cycle Detection**: Automated multi-user swap chain identification
-  **📱 Modern UI**: Responsive Next.js interface with seamless UX

## 🏗️ Architecture

```
├── 🎨 src/                    # Next.js Frontend Application
│   ├── components/           # Reusable UI components
│   ├── pages/               # Application routes
│   └── styles/              # Styling and themes
│
└── ⚙️ matching-service/      # Go Backend Service
    ├── cmd/                 # HTTP server entry point
    ├── demo/                # Sample data and console demo
    └── service/             # Core matching logic library
```

## 🚀 Quick Start

### Prerequisites

-  **Node.js** 18+ and npm
-  **Go** 1.19+
-  **Vercel CLI** (for deployment)
-  **Supabase** account (for production backend)

### 🎨 Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

🌐 **Local Development**: <http://localhost:3000>

### ⚙️ Backend Service

Launch the Go matching service:

```bash
# Start the HTTP server (port 8080)
go run ./matching-service/cmd
```

**Available Endpoints:**

-  `POST /search` - Submit property search requests
-  `GET /property` - Retrieve property details
-  `POST /match` - Generate swap matches

### 🎮 Interactive Demo

Experience the matching algorithm:

```bash
# Run console demo with sample data
go run ./matching-service/demo
```

This populates the system with test properties and demonstrates swap cycle detection.

### 🧪 Testing

```bash
cd matching-service
go test ./...
```

## 🔄 How Matching Works

The intelligent matching system operates on these principles:

1. **🔍 Search Submission**: Users submit their property preferences and available flat details
2. **💾 In-Memory Storage**: All searches and properties are maintained in fast memory storage
3. **🔄 Cycle Detection**: Algorithm identifies potential swap chains (2-4 participants)
4. **✅ Match Generation**: Compatible cycles are proposed to all participants
5. **🚫 Rejection Handling**: Declined matches trigger 14-day blacklist periods
6. **🔄 Continuous Processing**: System continuously seeks new matching opportunities

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Deploy to Vercel
vercel --prod
```

### Backend Options

**Option 1: Vercel Serverless Functions**

```bash
# Deploy Go service as Vercel function
vercel --prod
```

**Option 2: Cloud Platform**

-  Google Cloud Run
-  AWS Lambda
-  Digital Ocean Apps

### Database (Supabase)

Replace in-memory storage with Supabase for production:

1. Create Supabase project
2. Configure database schema
3. Update connection strings
4. Deploy with environment variables

## 🛠️ Tech Stack

| Component      | Technology                 |
| -------------- | -------------------------- |
| **Frontend**   | Next.js, React, TypeScript |
| **Backend**    | Go, HTTP Server            |
| **Deployment** | Vercel                     |
| **Database**   | Supabase (Production)      |
| **Storage**    | In-Memory (Demo)           |

## 📁 Project Structure

```
FlatSwaps/
├── 📦 package.json           # Node.js dependencies
├── ⚙️ next.config.js         # Next.js configuration
├── 🎨 src/                   # Frontend application
│   ├── components/           # Reusable components
│   ├── pages/               # Route handlers
│   ├── styles/              # CSS and styling
│   └── utils/               # Helper functions
├── 🔧 matching-service/      # Go backend service
│   ├── cmd/                 # Server executable
│   ├── demo/                # Demo and sample data
│   ├── service/             # Core business logic
│   └── go.mod               # Go dependencies
└── 📚 README.md             # Project documentation
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

-  📧 **Email**: support@flatswaps.com
-  🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/flatswaps/issues)
-  💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/flatswaps/discussions)

---

<div align="center">

**Made with ❤️ for the flat swapping community**

[⭐ Star this repo](https://github.com/yourusername/flatswaps) • [🐛 Report Bug](https://github.com/yourusername/flatswaps/issues) • [✨ Request Feature](https://github.com/yourusername/flatswaps/issues)

</div>
