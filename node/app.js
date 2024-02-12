'use strict';

const signalR = require('@microsoft/signalr');
//Gizmo SignalR support only one method - Event
const EVENT = "Event";

//Change this
const HOST = "localhost:80";
const OPERATOR = { login: "admin", password: "admin" };
let accessToken = null;
////////////////////////////////


(async () => {

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
                })).catch(e => console.log("ERR", e))
                return accessToken;
            }
        })
        .withAutomaticReconnect([1000, 3000, 6000, 12000, 16000])
        .build();
    try {
        await connection.start();
        connection.on(EVENT, onmessage);
    } catch (err) {
        console.log(err);
    }

    function onmessage(msg) {
        // console.log(msg);
        console.log(new Date(), "EventType:", msg.Event.EventType == 0 ? "Create" : msg.Event.EventType == 1 ? "Delete" : "Modify", "|", "Table:" + msg.Event.EntityType, "|", msg.Event.EntityType + "Id:" + msg.Event.EntityId)
    }
})();
