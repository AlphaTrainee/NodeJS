let inactivityTime = 30000;  //120000; // 120 Sekunden
let timer;

function startInactivityTimer() {
    // Wenn wir bereits auf der Timeout-Seite oder der Startseite sind, keinen Timer starten
    if (window.location.pathname === '/timeout' || window.location.pathname === '/') return;

    clearTimeout(timer);
    timer = setTimeout(() => {
        window.location.href = "/timeout";
    }, inactivityTime);
}

// Events, die den Timer zurücksetzen
const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
activityEvents.forEach(eventName => {
    document.addEventListener(eventName, startInactivityTimer, true);
});

startInactivityTimer();