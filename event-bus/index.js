const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);

  // List of services to notify
  const services = [
    "http://localhost:5000/events", // Post Service
    "http://localhost:5001/events", // Comment Service
    "http://localhost:5002/events", // Query Service
    "http://localhost:5003/events", // Moderation Service
  ];

  // Notify all services about the event
  await Promise.all(
    services.map((serviceUrl) => {
      return axios.post(serviceUrl, event).catch((err) => {
        console.error(`Error notifying ${serviceUrl}:`, err.message);
      });
    })
  );

  res.send({ status: "Event dispatched" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

const PORT = 5005;
app.listen(PORT, () => {
  console.log(`Event Bus listening on port ${PORT}`);
});

/**
 * Event Bus Service
 *
 * This service receives events and forwards them to other services.
 *
 * Endpoints:
 * POST /events - Receives an event and forwards it to other services.
 * In Every Service, we will have a POST /events endpoint to receive events from the Event Bus.
 *
 * Services to Notify:
 * - Post Service: http://localhost:5000/events
 * - Comment Service: http://localhost:5001/events
 * - Query Service: http://localhost:5002/events
 *
 * Usage:
 * Start this service and ensure other services are running.
 * Send events to this service, and it will forward them accordingly.
 */
