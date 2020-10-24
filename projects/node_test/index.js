const EventEmitter = require('events');

const time = new EventEmitter();

time.on("event_en", () => {
    console.log('Hello');
});

time.on("event_fr", () => {
    console.log("Bonjour");
});


time.emit("event_fr");