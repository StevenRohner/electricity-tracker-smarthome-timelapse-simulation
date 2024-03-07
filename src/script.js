document.addEventListener('DOMContentLoaded', function() {
    // Variablen
    const currentPrice = 31.13; // Ct./kWh
    const previousPrice = 29.18; // Ct./kWh
    const priceChangeElement = document.getElementById('priceChange');
    const currentPriceElement = document.getElementById('currentPrice');
    const timeElement = document.getElementById('time');
    const totalKWhElement = document.getElementById('totalKWh');
    const totalCostElement = document.getElementById('totalCost');
    const deviceTableBody = document.getElementById('deviceTable').querySelector('tbody');
    let totalKWh = 0;
    let totalCost = 0;

    // Preisänderung berechnen und anzeigen
    const priceChange = (((currentPrice - previousPrice) / previousPrice) * 100).toFixed(2);
    priceChangeElement.textContent = (priceChange >= 0 ? '+' : '') + priceChange + '%';
    currentPriceElement.textContent = currentPrice.toFixed(2) + ' Ct./kWh';

    // Gerätedaten
    const devices = [
        { time: '06:45', name: 'Kaffeemaschine', power: 1000, duration: 10 },
        { time: '07:00', name: 'Haartrockner', power: 1800, duration: 15 },
        { time: '7:15', name: 'Lichtschalter', power: 60, duration: 120 },
        { time: '12:00', name: 'Staubsaugerroboter', power: 50, duration: 60 },
        { time: '16:00', name: 'Waschmaschine', power: 500, duration: 90 },
        { time: '18:30', name: 'Musiklautsprecher', power: 60, duration: 120 },
        { time: '19:00', name: 'Backofen', power: 2000, duration: 60 },
        { time: '19:15', name: 'Lichtschalter', power: 60, duration: 300 },
        { time: '20:00', name: 'Fernseher', power: 150, duration: 150 },
        // Weitere Geräte hier hinzufügen
        { time: '08:00', name: 'Toaster', power: 850, duration: 5 },
        { time: '08:10', name: 'Spülmaschine', power: 1500, duration: 90 },
        { time: '08:30', name: 'Wasserkocher', power: 1200, duration: 7 },
        { time: '09:00', name: 'Mikrowelle', power: 800, duration: 15 },
        { time: '11:00', name: 'Laptop', power: 60, duration: 180 },
        { time: '15:00', name: 'Ladegeräte', power: 250, duration: 120 },
        { time: '17:00', name: 'Heizlüfter', power: 2000, duration: 60 },
        { time: '18:00', name: 'Elektrischer Grill', power: 2200, duration: 90 },
        { time: '21:00', name: 'PC', power: 450, duration: 60 },
        { time: '22:00', name: 'Leselampe', power: 40, duration: 60 }
    ];




function addDeviceRow(device, startTime) {
    const row = deviceTableBody.insertRow();
    const timeCell = row.insertCell(0);
    const nameCell = row.insertCell(1);
    const powerCell = row.insertCell(2);
    const durationCell = row.insertCell(3);
    const costCell = row.insertCell(4);

    const endTime = new Date(startTime.getTime() + device.duration * 60000); // Ende der Laufzeit

    timeCell.textContent = device.time;
  
    nameCell.textContent = device.name;
    powerCell.textContent = device.power + ' W';
    durationCell.textContent = '00:00:00';
    costCell.textContent = '0.00 €';

    const simulateDuration = 30000; // 30 Sekunden für die Simulation des ganzen Tages
    const dayDuration = 24 * 60 * 60 * 1000; // 24 Stunden in Millisekunden
    let elapsedSimulation = 0; // Verstrichene Zeit in der Simulation in Millisekunden
  
  

    const intervalId = setInterval(() => {
        elapsedSimulation += 1000 * dayDuration / simulateDuration; // Zeit in der simulierten Geschwindigkeit
        const elapsedSeconds = Math.floor(elapsedSimulation / 1000);
        const hours = Math.floor(elapsedSeconds / 3600);
        const minutes = Math.floor((elapsedSeconds - (hours * 3600)) / 60);
        const seconds = elapsedSeconds - (hours * 3600) - (minutes * 60);
        durationCell.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        const kWh = (device.power / 1000) * (elapsedSimulation / 3600000); // kWh
        const cost = kWh * currentPrice / 100; // €
        costCell.textContent = cost.toFixed(2) + ' €';

        if (elapsedSimulation >= device.duration * 60000 || new Date() >= endTime) {
            clearInterval(intervalId);
            durationCell.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            const finalCost = (device.power / 1000) * (device.duration / 60) * (currentPrice / 100); // Endkosten berechnen
            costCell.textContent = finalCost.toFixed(2) + ' €';

            // Gesamtkosten aktualisieren
            const totalCostElement = document.getElementById('totalCost');
            let currentTotalCost = parseFloat(totalCostElement.textContent.replace('Gesamtkosten heute: ', '').replace(' €', ''));
            currentTotalCost += finalCost;
            totalCostElement.textContent = `${currentTotalCost.toFixed(2)}`;

            // KWh Verbrauch aktualisieren
            const totalKWhElement = document.getElementById('totalKWh');
            let currentTotalKWh = parseFloat(totalKWhElement.textContent.replace('KWh Verbrauch heute: ', '').replace(' kWh', ''));
            const finalKWh = (device.power / 1000) * (device.duration / 60); // Endverbrauch in KWh berechnen
            currentTotalKWh += finalKWh;
            totalKWhElement.textContent = `${currentTotalKWh.toFixed(2)}`;
        }
    }, 1000 / (dayDuration / simulateDuration)); // Aktualisierung entsprechend der Geschwindigkeit der Simulation

    return intervalId; // ID des Intervalls zurückgeben, um es später stoppen zu können
}




    function formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = Math.floor(minutes % 60);
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }




function simulateDay() {
    const simulateDuration = 30000; // 30 Sekunden für die Simulation des ganzen Tages
    const dayDuration = 24 * 60 * 60 * 1000; // 24 Stunden in Millisekunden
    let startTime = new Date();

    let intervalIds = []; // Speichern der IDs von Intervallen für spätere Referenz

  const solarOutputElement = document.getElementById('solarOutput');
    let solarOutput = 0;
    solarOutputElement.textContent = solarOutput;

    // Animation der Solaranlagen-Produktion
    const solarProductionInterval = setInterval(() => {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        
        // Bestimmen der Solarproduktion basierend auf der Tageszeit
        if (hours >= 5 && hours < 20) { // Sonne scheint zwischen 5:00 und 19:59 Uhr
            const midday = 14; // Mitte des Tages, wenn die Sonne am höchsten ist
            const productionFactor = Math.max(0.1, Math.cos((hours - midday) / (midday - 5) * Math.PI)); // Cosinus-Welle für die Solarproduktion
            solarOutput = Math.round(productionFactor * 300 * Math.random()); // Zufällige Schwankungen zwischen 0 und 300, mit Höchstwert um die Mittagszeit
        } else { // Keine Sonne (Nacht)
            solarOutput = 0;
        }
        solarOutputElement.textContent = solarOutput;
    }, 3000); // Aktualisierung alle 3 Sekunden

    // Geräte hinzufügen
    devices.forEach(device => {
        const deviceTime = new Date(startTime);
        const [hours, minutes] = device.time.split(':');
        deviceTime.setHours(parseInt(hours));
        deviceTime.setMinutes(parseInt(minutes));
        deviceTime.setSeconds(0);

        const timeout = deviceTime.getTime() - startTime.getTime();
        if (timeout >= 0) {
            setTimeout(() => {
                const intervalId = addDeviceRow(device, deviceTime);
                intervalIds.push(intervalId); // Interval-ID speichern
            }, timeout / dayDuration * simulateDuration); // Skalierung der tatsächlichen Zeit auf Simulationszeit
        }
    });

 // Uhrzeit Animation
const timeIntervalId = setInterval(() => {
        const now = new Date();
        const elapsed = now.getTime() - startTime.getTime(); // Verstrichene Zeit in Millisekunden
        const simulatedTime = new Date(startTime.getTime() + (dayDuration * elapsed / simulateDuration));

        // Berechnung der simulierten Uhrzeit
        let hours = simulatedTime.getHours().toString().padStart(2, '0');
        let minutes = simulatedTime.getMinutes().toString().padStart(2, '0');
        let seconds = simulatedTime.getSeconds().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;

        // Stoppen der Uhrzeitanimation bei 23:59:59
        if (hours === '23' && minutes === '59' && seconds === '59') {
            clearInterval(timeIntervalId); // Stoppen der Uhrzeitanimation
            intervalIds.forEach(intervalId => clearInterval(intervalId)); // Stoppen aller Geräte-Intervalle
        } else if (elapsed >= simulateDuration) { // Wenn die simulierte Zeit abgelaufen ist
            timeElement.textContent = '23:59:59'; // Sicherstellen, dass die Zeit auf 23:59:59 gesetzt wird
            clearInterval(timeIntervalId); // Stoppen der Uhrzeitanimation
            intervalIds.forEach(intervalId => clearInterval(intervalId)); // Stoppen aller Geräte-Intervalle
        }
    }, 1000 / (dayDuration / simulateDuration)); // Aktualisierung entsprechend der Geschwindigkeit der Simulation
}


    // Start der Simulation
    simulateDay();
});

function updateCharts(hour, kWh, cost) {
    const kWhBarsContainer = document.querySelector('#kWhChart .chart-bars');
    const costBarsContainer = document.querySelector('#costChart .chart-bars');

    // Berechnen des Indexes für den aktuellen Balken basierend auf der Stunde
    const barIndex = hour; // 0 für 00:00-00:59, 1 für 01:00-01:59, ..., 23 für 23:00-23:59

    // Aktualisieren oder Hinzufügen des KWh-Balkens
    let kWhBar = kWhBarsContainer.children[barIndex];
    if (!kWhBar) {
        kWhBar = document.createElement('div');
        kWhBar.className = 'chart-bar';
        kWhBarsContainer.appendChild(kWhBar);
    }
    kWhBar.style.width = `${kWh * 10}px`; // Skalierungsfaktor für die Balkenbreite
    kWhBar.textContent = `${kWh.toFixed(2)} kWh`;

    // Aktualisieren oder Hinzufügen des Kosten-Balkens
    let costBar = costBarsContainer.children[barIndex];
    if (!costBar) {
        costBar = document.createElement('div');
        costBar.className = 'chart-bar';
        costBarsContainer.appendChild(costBar);
    }
    costBar.style.width = `${cost * 100}px`; // Skalierungsfaktor für die Balkenbreite
    costBar.textContent = `${cost.toFixed(2)} €`;
}
