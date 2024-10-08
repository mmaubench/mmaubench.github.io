// Function to generate table rows
function generateTable(leaderboardData) {
    const tbody = document.querySelector('#leaderboard tbody');

    // Collect the values from each column for comparison
    let soundMiniValues = [], soundTestValues = [];
    let musicMiniValues = [], musicTestValues = [];
    let speechMiniValues = [], speechTestValues = [];
    let avgMiniValues = [], avgTestValues = [];

    leaderboardData.leaderboardData.forEach(entry => {
        soundMiniValues.push(entry.Sound["Test-mini"]);
        soundTestValues.push(entry.Sound["Test"]);
        musicMiniValues.push(entry.Music["Test-mini"]);
        musicTestValues.push(entry.Music["Test"]);
        speechMiniValues.push(entry.Speech["Test-mini"]);
        speechTestValues.push(entry.Speech["Test"]);
        avgMiniValues.push(entry.Avg["Test-mini"]);
        avgTestValues.push(entry.Avg["Test"]);
    });

    // Function to get the highest and second highest values
    function getTopTwoValues(values) {
        let sorted = [...values].sort((a, b) => b - a);
        return [sorted[0], sorted[1]];  // Highest and second-highest
    }

    // Get top two values for each column
    const [soundMiniTop, soundMiniSecond] = getTopTwoValues(soundMiniValues);
    const [soundTestTop, soundTestSecond] = getTopTwoValues(soundTestValues);
    const [musicMiniTop, musicMiniSecond] = getTopTwoValues(musicMiniValues);
    const [musicTestTop, musicTestSecond] = getTopTwoValues(musicTestValues);
    const [speechMiniTop, speechMiniSecond] = getTopTwoValues(speechMiniValues);
    const [speechTestTop, speechTestSecond] = getTopTwoValues(speechTestValues);
    const [avgMiniTop, avgMiniSecond] = getTopTwoValues(avgMiniValues);
    const [avgTestTop, avgTestSecond] = getTopTwoValues(avgTestValues);

    leaderboardData.leaderboardData.forEach(entry => {
        const row = document.createElement('tr');
        
        // Name with optional link
        let nameCell = `<td>${entry.info.link ? `<a href="${entry.info.link}">${entry.info.name}</a>` : entry.info.name}</td>`;
        
        // Size
        let sizeCell = `<td>${entry.info.size}</td>`;

        // Helper function to format the values
        function formatValue(value, top, secondTop) {
            if (value === top) return `<b>${value}</b>`;
            if (value === secondTop) return `<u>${value}</u>`;
            return value || '-';
        }

        // Sound, Music, Speech, Avg (Test-mini and Test)
        let soundMini = `<td>${formatValue(entry.Sound["Test-mini"], soundMiniTop, soundMiniSecond)}</td>`;
        let soundTest = `<td>${formatValue(entry.Sound["Test"], soundTestTop, soundTestSecond)}</td>`;
        let musicMini = `<td>${formatValue(entry.Music["Test-mini"], musicMiniTop, musicMiniSecond)}</td>`;
        let musicTest = `<td>${formatValue(entry.Music["Test"], musicTestTop, musicTestSecond)}</td>`;
        let speechMini = `<td>${formatValue(entry.Speech["Test-mini"], speechMiniTop, speechMiniSecond)}</td>`;
        let speechTest = `<td>${formatValue(entry.Speech["Test"], speechTestTop, speechTestSecond)}</td>`;
        let avgMini = `<td>${formatValue(entry.Avg["Test-mini"], avgMiniTop, avgMiniSecond)}</td>`;
        let avgTest = `<td>${formatValue(entry.Avg["Test"], avgTestTop, avgTestSecond)}</td>`;

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




// // Function to generate table rows
// function generateTable(leaderboardData) {
//     const tbody = document.querySelector('#leaderboard tbody');
//     leaderboardData.leaderboardData.forEach(entry => {
//         const row = document.createElement('tr');
        
//         // Name with optional link
//         let nameCell = `<td>${entry.info.link ? `<a href="${entry.info.link}">${entry.info.name}</a>` : entry.info.name}</td>`;
        
//         // Size
//         let sizeCell = `<td>${entry.info.size}</td>`;
        
//         // Sound, Music, Speech, Avg (Test-mini and Test)
//         let soundMini = `<td>${entry.Sound["Test-mini"] || '-'}</td>`;
//         let soundTest = `<td>${entry.Sound["Test"] || '-'}</td>`;
//         let musicMini = `<td>${entry.Music["Test-mini"] || '-'}</td>`;
//         let musicTest = `<td>${entry.Music["Test"] || '-'}</td>`;
//         let speechMini = `<td>${entry.Speech["Test-mini"] || '-'}</td>`;
//         let speechTest = `<td>${entry.Speech["Test"] || '-'}</td>`;
//         let avgMini = `<td>${entry.Avg["Test-mini"] || '-'}</td>`;
//         let avgTest = `<td>${entry.Avg["Test"] || '-'}</td>`;

//         // Append all cells into the row
//         row.innerHTML = `${nameCell}${sizeCell}${soundMini}${soundTest}${musicMini}${musicTest}${speechMini}${speechTest}${avgMini}${avgTest}`;
        
//         tbody.appendChild(row);
//     });
// }

// // Function to load JSON and then generate the table
// function loadJSONAndGenerateTable() {
//     fetch('./leaderboard_data.json')  // Replace this with the path to your JSON file
//         .then(response => response.json())
//         .then(data => generateTable(data))
//         .catch(error => console.error('Error loading the JSON data:', error));
// }

// // Call the function on page load
// document.addEventListener('DOMContentLoaded', loadJSONAndGenerateTable);
