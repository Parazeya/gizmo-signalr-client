'use strict';

const signalR = require('@microsoft/signalr');

//Gizmo SignalR support only one method
const EVENT = "Event";

//Change this
const HOST = "localhost:8080";
const OPERATOR = { login: "admin", password: "admin" }
////////////////////////////////


(async () => {

    const connection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Debug)
        .withUrl(`http://${OPERATOR.login}:${OPERATOR.password}@${HOST}/api/events`, {
            skipNegotiation: true, //Set "true" if you have negotiation troubles
            transport: signalR.HttpTransportType.WebSockets,
        })
        .build();
    try {
        await connection.start();
        //Only "Event" is supported
        connection.on(EVENT, onmessage);
    } catch (err) {
        console.log(err);
    }

    function onmessage(msg) {
        // console.log(msg);
        console.log(new Date(), "EventType:", msg.Event.EventType == 0 ? "Create" : msg.Event.EventType == 1 ? "Delete" : "Modify", "|", "Table:" + msg.Event.EntityType, "|", msg.Event.EntityType + "Id:" + msg.Event.EntityId)
    }
})();
