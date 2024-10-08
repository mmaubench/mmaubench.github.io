// Function to generate table rows
function generateTable(leaderboardData) {
    const tbody = document.querySelector('#leaderboard tbody');
    leaderboardData.leaderboardData.forEach(entry => {
        const row = document.createElement('tr');
        
        // Name with optional link
        let nameCell = `<td>${entry.info.link ? `<a href="${entry.info.link}">${entry.info.name}</a>` : entry.info.name}</td>`;
        
        // Size
        let sizeCell = `<td>${entry.info.size}</td>`;
        
        // Sound, Music, Speech, Avg (Test-mini and Test)
        let soundMini = `<td>${entry.Sound["Test-mini"] || '-'}</td>`;
        let soundTest = `<td>${entry.Sound["Test"] || '-'}</td>`;
        let musicMini = `<td>${entry.Music["Test-mini"] || '-'}</td>`;
        let musicTest = `<td>${entry.Music["Test"] || '-'}</td>`;
        let speechMini = `<td>${entry.Speech["Test-mini"] || '-'}</td>`;
        let speechTest = `<td>${entry.Speech["Test"] || '-'}</td>`;
        let avgMini = `<td>${entry.Avg["Test-mini"] || '-'}</td>`;
        let avgTest = `<td>${entry.Avg["Test"] || '-'}</td>`;

        // Append all cells into the row
        row.innerHTML = `${nameCell}${sizeCell}${soundMini}${soundTest}${musicMini}${musicTest}${speechMini}${speechTest}${avgMini}${avgTest}`;
        
        tbody.appendChild(row);
    });
}

// Function to load JSON and then generate the table
function loadJSONAndGenerateTable() {
    fetch('./leaderboard_data.json')  // Replace this with the path to your JSON file
        .then(response => response.json())
        .then(data => generateTable(data))
        .catch(error => console.error('Error loading the JSON data:', error));
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', loadJSONAndGenerateTable);
