FROM golang:alpine as builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd/server

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/server .

ENV PORT=8080
ENV ML_SERVICE_URL=http://ml-service:8000
ENV ML_TIMEOUT_SECONDS=30

EXPOSE 8080

CMD ["./server"]
