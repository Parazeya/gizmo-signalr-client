# Gizmo SignalR

Example of using SignalR in Gizmo

## Installation

### JavaScript

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/3.1.7/signalr.min.js"></script>
```

### NodeJS

```bash
npm install @microsoft/signalr
```

## Base Usage

Before connecting, make sure you have Web enabled.
To connect, you need the Web port that you set in the `Gizmo Manager > Configuration > Web`

```js
const connection = new signalR.HubConnectionBuilder()
  .configureLogging(signalR.LogLevel.Debug)
  .withUrl("http://localhost:80/api/events", {
    skipNegotiation: true, //Set "true" if you have negotiation troubles
    transport: signalR.HttpTransportType.WebSockets,
  })
  .build();

//Only "EntityEvent" is supported
connection.on("EntityEvent", e => console.log(e))
```
```
EntityId - Row ID
EntityType - Table Name
EventType
    0 - Create
    1 - Delete
    2 - Change
```
