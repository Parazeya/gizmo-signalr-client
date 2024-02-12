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

Before connecting, make sure you have Web enabled. To connect, you need the Web port that you set in the `Gizmo Manager > Configuration > Web`

```javascript
//Modify this
const HOST = "localhost:81"
const OPERATOR = { login: encodeURIComponent("admin"), password: encodeURIComponent("admin") }
let accessToken = null;

const connection = new signalR.HubConnectionBuilder()
.configureLogging(signalR.LogLevel.Debug)
.withUrl(`http://${HOST}/api/events`, {
    skipNegotiation: true, //Set "true" if you have negotiation troubles
    transport: signalR.HttpTransportType.WebSockets,
    accessTokenFactory: async () => { // getting access token
        if (accessToken !== null) {
            return accessToken;
        }
        await fetch(`http://${HOST}/auth/token?username=${OPERATOR.login}&password=${OPERATOR.password}`).then(e => e.json().then(v => {
            accessToken = v.token
        })).catch(e => console.log(e))
        return accessToken;
    }
})
.build();
```

- EntityId - Row ID
- EntityType - Table Name
- EventType

  - 0 - Create
  - 1 - Delete
  - 2 - Modify
