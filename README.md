# Honeycomb OpenTelemetry Node.js Express Application Example

The following is an example a `Nodejs` application using `Express` that has a "Hello World" endpoint that sends tracing data to Honeycomb.

It includes the following:

- A `Dataset` named `otel-quickstart`
- A `Service Name` named `nodejs-greeting-app`

## Requirements

To utilize the example, you'll need the following:

- [Nodejs](https://nodejs.org/en/) or [Docker](https://www.docker.com/products/docker-desktop), or [Tilt+Docker](https://docs.tilt.dev/install.html) Installed
- A Free [Honeycomb account](https://ui.honeycomb.io/signup)
- A Honeycomb API Key (find this at `https://ui.honeycomb.io/teams/TEAM_NAME`)

## Instructions

### 1. Run the Application using **one** of the following options:

- NPM

```bash
cd server
npm install
HONEYCOMB_API_KEY=XXXXXX npm start
```

<br/> **OR** <br/>

- Docker

```bash
HONEYCOMB_API_KEY=XXXXXX docker-compose -d
```

<br/> **OR** <br/>

- Using Tilt

```bash
HONEYCOMB_API_KEY=XXXXXX tilt up
```

<br/>


### 2. Hit the endpoint using one of these commands

- Terminal: `curl localhost:8080`
- Web: `http://localhost:8080`

**Looking to add multiple events or error messages? Use one of following examples.**


- Hitting the Endpoint 1000 times and forcing an error in a continuous loop

```bash
while true; do for n in {1..1000}; do curl localhost:8080; done; curl -f localhost:8080/c; sleep 5; done
```

- Hitting the Endpoint 1000 Times with a forced error

```bash
for n in {1..1000}; do curl localhost:8080; done; curl -f localhost:8080/c;

```

### 3. Adding High Cardinality Data

Add high cardinality data to the `server/app.js` file by uncommenting two lines.

```js
// Uncomment lines 20-21
span.setAttribute("message", message)
console.log(`Added the message variable: ${message}`);
```

Using the message attribute allows you to see the message that is sent at the endpoint.

### 4. Exploring Your Data

You’ve now sent data from this application. Continue the quickstart by `exploring your data` section of the quickstart guide.
