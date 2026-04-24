import events from "events";

const evtEmit = new events.EventEmitter();

// Event mit on() registrieren
// on(event, callback)
// standard oder auch eigene Events
evtEmit.on("myEvent", (firstName, lastName) => {
    console.log(`Ein neuer User ${firstName} ${lastName}`);
});
evtEmit.on("myEvent", (firstName) => {
    console.log(`Moin ${firstName}`);
});
evtEmit.once("outEvt", (firstName) => {
    console.log(`${firstName} goes out`);
});


// Event auslösen mit emit()

evtEmit.emit("myEvent", "Jana", "Huth");
evtEmit.emit("myEvent", "Heiko", "Helmchen");
evtEmit.emit("outEvt", "Mafalda");
evtEmit.emit("outEvt", "Yanthippe");

/* 
// alternativ .addListener
const callbackNewUser = (firstName, lastName) => {
    console.log(`Ein neuer User ${firstName} ${lastName}`);
};
evtEmit.on("myEvent", callbackNewUser);
evtEmit.emit(callbackNewUser, "Jana", "Huth");
 */
