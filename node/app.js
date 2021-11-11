'use strict';

const signalR = require('@microsoft/signalr');

//Gizmo SignalR support only one method
const EVENT = "EntityEvent";

//Change this
const HOST = "localhost:80";

(async () => {
    const connection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Debug)
        .withUrl("http://" + HOST + "/api/events", {
            skipNegotiation: true, //Set "true" if you have negotiation troubles
            transport: signalR.HttpTransportType.WebSockets,
        })
        .build();

    await connection.start();

    //Only "EntityEvent" is supported
    connection.on(EVENT, (e) => console.log(e));
})();
