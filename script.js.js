const stations = {
    "Red Line": ["Miyapur", "JNTU", "Kukatpally", "Erragadda", "ESI Hospital", "Ameerpet", "Punjagutta", "Nampally", "Osmania Medical College", "MG Bus Station", "Dilsukhnagar", "LB Nagar"],
    "Blue Line": ["Raidurg", "Hitech City", "Madhapur", "Jubilee Hills", "Ameerpet", "Begumpet", "Paradise", "Uppal", "Nagole"],
    "Green Line": ["Paradise", "RTC X Roads", "Narayanguda", "Sulthan Bazaar", "MG Bus Station"]
};

const interchangeStations = {
    "Ameerpet": ["Red Line", "Blue Line"],
    "Paradise": ["Blue Line", "Green Line"],
    "MG Bus Station": ["Red Line", "Green Line"]
};

const farePerKm = 10;

window.onload = () => {
    const startSelect = document.getElementById("start");
    const endSelect = document.getElementById("end");

    Object.values(stations).flat().forEach(station => {
        const option1 = document.createElement("option");
        option1.value = station;
        option1.textContent = station;

        const option2 = option1.cloneNode(true);

        startSelect.appendChild(option1);
        endSelect.appendChild(option2);
    });
};

function calculateFare() {
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    const output = document.getElementById("output");

    if (start === end) {
        output.innerHTML = "<p>Please select different start and end stations.</p>";
        return;
    }

    const lineStart = Object.keys(stations).find(line => stations[line].includes(start));
    const lineEnd = Object.keys(stations).find(line => stations[line].includes(end));

    let fare = Math.abs(Object.values(stations).flat().indexOf(end) - Object.values(stations).flat().indexOf(start)) * farePerKm;
    let interchangeInfo = "";
    let travelLinesInfo = `<li><strong>Travel Lines:</strong> ${lineStart} to ${lineEnd}</li>`;

    if (lineStart !== lineEnd) {
        const interchanges = Object.keys(interchangeStations).filter(station =>
            stations[lineStart].includes(station) && stations[lineEnd].includes(station)
        );
        if (interchanges.length > 0) {
            interchangeInfo = `<li><strong>Interchange Station:</strong> ${interchanges.join(", ")}</li>`;
        } else {
            interchangeInfo = "<li>No Interchange Required</li>";
        }
    } else {
        interchangeInfo = "<li>No Interchange Required</li>";
    }

    output.innerHTML = `
        <div class="ticket-card">
            <h3>Your Ticket</h3>
            <ul>
                <li><strong>Start Station:</strong> ${start}</li>
                <li><strong>End Station:</strong> ${end}</li>
                ${travelLinesInfo}
                ${interchangeInfo}
                <li class="fare-amount"><strong>Total Fare:</strong> ₹${fare}</li>
            </ul>
            <p>Thank you for using Hyderabad Metro!</p>
        </div>
    `;
}
