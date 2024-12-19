// Metro system represented as a graph
const metroGraph = {
    "Miyapur": { "JNTU": 1 },
    "JNTU": { "Miyapur": 1, "Kukatpally": 1 },
    "Kukatpally": { "JNTU": 1, "Erragadda": 1 },
    "Erragadda": { "Kukatpally": 1, "ESI Hospital": 1 },
    "ESI Hospital": { "Erragadda": 1, "Ameerpet": 1 },
    "Ameerpet": { "ESI Hospital": 1, "Punjagutta": 1, "Begumpet": 1, "Jubilee Hills": 1 },
    "Punjagutta": { "Ameerpet": 1, "Nampally": 1 },
    "Nampally": { "Punjagutta": 1, "Osmania Medical College": 1 },
    "Osmania Medical College": { "Nampally": 1, "MG Bus Station": 1 },
    "MG Bus Station": { "Osmania Medical College": 1, "Dilsukhnagar": 1, "Sulthan Bazaar": 1 },
    "Dilsukhnagar": { "MG Bus Station": 1, "LB Nagar": 1 },
    "LB Nagar": { "Dilsukhnagar": 1 },
    "Raidurg": { "Hitech City": 1 },
    "Hitech City": { "Raidurg": 1, "Madhapur": 1 },
    "Madhapur": { "Hitech City": 1, "Jubilee Hills": 1 },
    "Jubilee Hills": { "Madhapur": 1, "Ameerpet": 1 },
    "Begumpet": { "Ameerpet": 1, "Paradise": 1 },
    "Paradise": { "Begumpet": 1, "RTC X Roads": 1 },
    "RTC X Roads": { "Paradise": 1, "Narayanguda": 1 },
    "Narayanguda": { "RTC X Roads": 1, "Sulthan Bazaar": 1 },
    "Sulthan Bazaar": { "Narayanguda": 1, "MG Bus Station": 1 },
    "Uppal": { "Nagole": 1 },
    "Nagole": { "Uppal": 1 },
};

const farePerKm = 10;

// Dijkstra's Algorithm
function dijkstra(graph, start, end) {
    const distances = {};
    const prev = {};
    const visited = new Set();
    const priorityQueue = [];

    // Initialize distances to Infinity, except start node
    for (const node in graph) {
        distances[node] = Infinity;
        prev[node] = null;
    }
    distances[start] = 0;

    // Push start node into the priority queue
    priorityQueue.push({ node: start, distance: 0 });

    while (priorityQueue.length > 0) {
        // Sort queue by distance and dequeue the nearest node
        priorityQueue.sort((a, b) => a.distance - b.distance);
        const { node: currentNode } = priorityQueue.shift();

        if (visited.has(currentNode)) continue;
        visited.add(currentNode);

        // If we reach the destination, stop
        if (currentNode === end) break;

        // Update distances for neighboring nodes
        for (const neighbor in graph[currentNode]) {
            const newDist = distances[currentNode] + graph[currentNode][neighbor];
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                prev[neighbor] = currentNode;
                priorityQueue.push({ node: neighbor, distance: newDist });
            }
        }
    }

    // Backtrack to find the path
    const path = [];
    let curr = end;
    while (curr) {
        path.unshift(curr);
        curr = prev[curr];
    }

    return { distance: distances[end], path };
}

// Populate dropdowns
window.onload = () => {
    const startSelect = document.getElementById("start");
    const endSelect = document.getElementById("end");

    for (const station in metroGraph) {
        const option1 = document.createElement("option");
        option1.value = station;
        option1.textContent = station;

        const option2 = option1.cloneNode(true);

        startSelect.appendChild(option1);
        endSelect.appendChild(option2);
    }
};

function calculateFare() {
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    const output = document.getElementById("output");

    if (start === end) {
        output.innerHTML = "<p>Please select different start and end stations.</p>";
        return;
    }

    const { distance, path } = dijkstra(metroGraph, start, end);

    if (distance === Infinity) {
        output.innerHTML = "<p>No path found between the selected stations.</p>";
        return;
    }

    const fare = distance * farePerKm;

    output.innerHTML = `
        <div class="ticket-card">
            <h3>Your Ticket</h3>
            <ul>
                <li><strong>Start Station:</strong> ${start}</li>
                <li><strong>End Station:</strong> ${end}</li>
                <li><strong>Path:</strong> ${path.join(" → ")}</li>
                <li class="fare-amount"><strong>Total Fare:</strong> ₹${fare}</li>
            </ul>
            <p>Thank you for using Hyderabad Metro!</p>
        </div>
    `;
}

