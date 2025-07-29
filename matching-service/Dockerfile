FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY . ./
RUN go build -o matching-service ./cmd

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/matching-service ./matching-service
EXPOSE 8080
CMD ["./matching-service"]
