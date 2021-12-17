# Honeycomb OpenTelemetry Node.js Express Application Example

This is a simple NodeJS express web app that uses OpenTelemetry to generate trace data and send to Honeycomb using the OTLP exporter.

## Requirements

## 1. Run the Application

### Using NPM

Then run the web app.

```bash
cd server
npm install
HONEYCOMB_API_KEY=XXXXXX HONEYCOMB_DATASET_NAME=XXXXXXX npm start
```
### Using Docker

`HONEYCOMB_API_KEY=XXXXXX HONEYCOMB_DATASET_NAME=XXXXXXX docker-compose -d`

### Using Tilt

Run `HONEYCOMB_API_KEY=XXXXXX HONEYCOMB_DATASET_NAME=XXXXXXX tilt up`

## 2. Accessing the Endpoint

Using the following options to send data to Honeycomb as an example:

```bash
# Hitting the Endpoint 80 Times
for n in {1..80}; do curl localhost:8080; done

```

```bash
# Hitting the Endpoint 200 Times and forcing an error
while true; do for n in {1..200}; do curl localhost:8080; done; curl -f localhost:8080/c; sleep 5; done
```
