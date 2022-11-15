# Onboarding Live Sessions Playbook

This is your guide to running the onboarding sessions.

## Requirements

- Docker
- Tilt: If you want to make your life easier
- Honeycomb Account: We have one already :)
- Github Example
- Google Slides Deck

## Before Presenting

## Environment Prep

1. Set Demo Key. `export HONEYCOMB_LIVE_DEMO_KEY=fWxcjfFB3SzfPBsALuvbJM`

2. Load environment (in the root of the repo)
   - Using Docker
     - `docker compose -d`
   - Tilt
     - `tilt up`

Land on the [Honeycomb UI Homepage](https://ui.honeycomb.io/onboarding-eng/environments/live-onboarding-session/datasets)

Be sure that there are not any datasets there. If so, delete.

## During the Presentation

### 1. Google Slides

1. Present the google slides all the way to the `example` section, then move to UI.

### 2. Honeycomb UI

2. In the UI, at the [Honeycomb UI Homepage](https://ui.honeycomb.io/onboarding-eng/environments/live-onboarding-session/datasets), click "Send Data". If there is no, then it would be "Add your data"

3. Select "Start with Traces". There is a blue button to the right. You will land on the UI Guide. Discuss the Guide for JavaScript.
  
   - 1. Install Packages
     - `@opentelemetry/sdk-node` : Core Node Package
     - `@opentelemetry/exporter-trace-otlp-proto` : Package the uses OTLP to send data to honeycomb
     - `@opentelemetry/auto-instrumentations-node` : Bundled Package that includes express, dns, etc. It is a helper to instrument various libraries and frameworks. If they do not want to use the bundle, they can use individual packages.

   - 2. Initialize (Talk about the Tracing file)
     - How instrumentation starts. Has to be loaded first, no matter the language
     - `const traceExporter = new OTLPTraceExporter();` is used to tell the tracer I want to export the data to the place with some information (in this case, Honeycomb). It is intently left blank because we will use semantic conventions to leverage env variables to provide it with Honeycomb information.

     - The code below using the node sdk to instrument, gathering core node apm context where it says "hey im nodejs, I need to send it to Honeycomb. Please auto-instrument using these instrumentation packages

        ```js
           const sdk = new NodeSDK({
           traceExporter,
           instrumentations: [getNodeAutoInstrumentations()]
       });
        ```

   - 3. Configure
     - OTEL needs to know where to go, in this case, `OTEL_EXPORTER_OTLP_ENDPOINT="https://api.honeycomb.io"` sends you to Honeycomb.
     - Honeycomb uses the `x-honeycomb-team` as an API which has the permissions to go into the correct environment. Using `OTEL_EXPORTER_OTLP_HEADERS`, you will tell your code to have the right authentication to talk to Honeycomb.
     - We leverage the service name to automatically create the dataset for you `OTEL_SERVICE_NAME="your-service-name"`

   - 4. Run
     - Do not forget to initialize. In the case of JS, during runtime, we require the tracing file

### 3. VsCode

4. Using `VSCode`, pull up the code.

5. `cd distributed-tracing-js`

6. Discuss what this example is
   1. This is a Javascript example with 4 services. We will be instrumenting all 4 services to show how multiple services interact within a trace.
   2. `Frontend service` is the main endpoint
      1. It will call out the `message service` to get a random message
      2. `year service` provides a random year that corresponds with a mapped `name` from the `name service`

7. Every service is is ready to go but the frontend service. You will instrument that.
   1. open `frontend/package.json` and replace the `start` with `node -r ./tracing.js main.js`
2. hit the endpoint `curl localhost:7001/greeting` a few times
3. force a few errors `curl localhost:7001/greeting1`
  _Note:_ In `tilt`, there is a script to force errors and successfully hit an endpoint

### 4. Honeycomb UI

8. Going back to the Honeycomb UI, verify that the data is now in.

9. Analyze the data
    1. Discuss APM Home
    2. Go to the query builder and show `Raw Data` tab
    3. Query for errors leveraging `where` and `group by`
    4. Show new BubbleUp
    5. Open a trace
       1. Show them that this is great but we are missing things
          1. Does this show the unit of work?
          2. Do I need more readable span names?
          3. Custom attributes can tell us more information to give greater high cardinality. (user id, user name, payment types, etc)

### 5. VSCode

10. Pull up fontend/main.js
    1. `Line 5`, Add Core package to retrieve Tracer: `const opentelemetry = require('@opentelemetry/api');`
    2. `Line 31`, Call out the default tracer: `const tracer = opentelemetry.trace.getTracer('default');`
    3. `Line 38` Set Active Span

        ```js
        tracer.startActiveSpan('💣 Preparing The Greeting 💣', async greetingSpan => {
        greetingSpan.end()
        })   
        ```

    4. `Line 43`, Set Span name: `const nameSpan = tracer.startSpan('🍝 Calling /name 🍝 ');`
    5. `Line 47` Set Span Attributes:

    ```js
        nameSpan.setAttribute("app.user", name);
        nameSpan.setAttribute("test", "test");
    ```

    6. `Line 41`, Flush Span `nameSpan.end();`

11. Update configuration
12. Hit Endpoint to produce new data

### Honeycomb UI

1. Now, query using high cardinality data. Show trace. show the benefits.
2. You can all set :)
