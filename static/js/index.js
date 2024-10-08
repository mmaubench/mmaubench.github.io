// Function to generate table rows
function generateTable(leaderboardData) {
    const tbody = document.querySelector('#leaderboard tbody');
    
    // Clear existing rows
    tbody.innerHTML = '';

    // Store scores for comparison
    let scores = [];

    // Populate the table and collect scores excluding certain entries
    leaderboardData.leaderboardData.forEach(entry => {
        const row = document.createElement('tr');
        
        // Name with optional link
        let nameCell = `<td style="text-align: center; vertical-align: middle; padding: 10px;">${entry.info.link ? `<a href="${entry.info.link}">${entry.info.name}</a>` : entry.info.name}</td>`;
        
        // Size
        let sizeCell = `<td style="text-align: center; vertical-align: middle; padding: 10px;">${entry.info.size}</td>`;
        
        // Sound, Music, Speech, Avg (Test-mini and Test)
        let soundMini = `<td style="text-align: center; vertical-align: middle; padding: 10px;">${entry.Sound["Test-mini"] || '-'}</td>`;
        let soundTest = `<td style="text-align: center; vertical-align: middle; padding: 10px;">${entry.Sound["Test"] || '-'}</td>`;
        let musicMini = `<td style="text-align: center; vertical-align: middle; padding: 10px;">${entry.Music["Test-mini"] || '-'}</td>`;
        let musicTest = `<td style="text-align: center; vertical-align: middle; padding: 10px;">${entry.Music["Test"] || '-'}</td>`;
        let speechMini = `<td style="text-align: center; vertical-align: middle; padding: 10px;">${entry.Speech["Test-mini"] || '-'}</td>`;
        let speechTest = `<td style="text-align: center; vertical-align: middle; padding: 10px;">${entry.Speech["Test"] || '-'}</td>`;
        let avgMini = `<td style="text-align: center; vertical-align: middle; padding: 10px;">${entry.Avg["Test-mini"] || '-'}</td>`;
        let avgTest = `<td style="text-align: center; vertical-align: middle; padding: 10px;">${entry.Avg["Test"] || '-'}</td>`;

        // Append all cells into the row
        row.innerHTML = `${nameCell}${sizeCell}${soundMini}${soundTest}${musicMini}${musicTest}${speechMini}${speechTest}${avgMini}${avgTest}`;
        
        // Append row to tbody
        tbody.appendChild(row);
        
        // Collect scores for comparison, excluding specific entries
        if (!["Random Guess", "Most Frequent Choice", "Human (test-mini)"].includes(entry.info.name)) {
            // Assuming the scores are in `Sound.Test`, `Music.Test`, etc.
            scores.push({
                name: entry.info.name,
                soundTest: entry.Sound["Test"] || 0,
                musicTest: entry.Music["Test"] || 0,
                speechTest: entry.Speech["Test"] || 0,
                avgTest: entry.Avg["Test"] || 0,
            });
        }
    });

    // Compare the values and determine the largest and second largest scores
    compareScores(scores);
}

// Function to compare scores and find the largest and second largest
function compareScores(scores) {
    if (scores.length === 0) return; // No scores to compare

    // Sort scores based on the primary criterion (e.g., avgTest) and find the top scores
    scores.sort((a, b) => b.avgTest - a.avgTest);
    
    const largest = scores[0];
    const secondLargest = scores[1];

    // You can now highlight these in your table or display the results elsewhere
    console.log('Largest:', largest);
    console.log('Second Largest:', secondLargest);
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

//     // Collect the values from each column for comparison
//     let soundMiniValues = [], soundTestValues = [];
//     let musicMiniValues = [], musicTestValues = [];
//     let speechMiniValues = [], speechTestValues = [];
//     let avgMiniValues = [], avgTestValues = [];

//     leaderboardData.leaderboardData.forEach(entry => {
//         soundMiniValues.push(parseFloat(entry.Sound["Test-mini"]));  // Parse as float for accurate comparison
//         soundTestValues.push(parseFloat(entry.Sound["Test"]));
//         musicMiniValues.push(parseFloat(entry.Music["Test-mini"]));
//         musicTestValues.push(parseFloat(entry.Music["Test"]));
//         speechMiniValues.push(parseFloat(entry.Speech["Test-mini"]));
//         speechTestValues.push(parseFloat(entry.Speech["Test"]));
//         avgMiniValues.push(parseFloat(entry.Avg["Test-mini"]));
//         avgTestValues.push(parseFloat(entry.Avg["Test"]));
//     });

//     // Function to get the highest and second highest values
//     function getTopTwoValues(values) {
//         let sorted = [...values].filter(v => !isNaN(v)).sort((a, b) => b - a);
//         return [sorted[0], sorted[1]];  // Highest and second-highest
//     }

//     // Get top two values for each column
//     const [soundMiniTop, soundMiniSecond] = getTopTwoValues(soundMiniValues);
//     const [soundTestTop, soundTestSecond] = getTopTwoValues(soundTestValues);
//     const [musicMiniTop, musicMiniSecond] = getTopTwoValues(musicMiniValues);
//     const [musicTestTop, musicTestSecond] = getTopTwoValues(musicTestValues);
//     const [speechMiniTop, speechMiniSecond] = getTopTwoValues(speechMiniValues);
//     const [speechTestTop, speechTestSecond] = getTopTwoValues(speechTestValues);
//     const [avgMiniTop, avgMiniSecond] = getTopTwoValues(avgMiniValues);
//     const [avgTestTop, avgTestSecond] = getTopTwoValues(avgTestValues);

//     leaderboardData.leaderboardData.forEach(entry => {
//         const row = document.createElement('tr');
        
//         // Name with optional link
//         let nameCell = `<td>${entry.info.link ? `<a href="${entry.info.link}">${entry.info.name}</a>` : entry.info.name}</td>`;
        
//         // Size
//         let sizeCell = `<td>${entry.info.size}</td>`;

//         // Helper function to format the values
//         function formatValue(value, top, secondTop) {
//             if (value === top) return `<b>${value}</b>`;
//             if (value === secondTop) return `<u>${value}</u>`;
//             return value || '-';
//         }

//         // Sound, Music, Speech, Avg (Test-mini and Test)
//         let soundMini = `<td>${formatValue(parseFloat(entry.Sound["Test-mini"]), soundMiniTop, soundMiniSecond)}</td>`;
//         let soundTest = `<td>${formatValue(parseFloat(entry.Sound["Test"]), soundTestTop, soundTestSecond)}</td>`;
//         let musicMini = `<td>${formatValue(parseFloat(entry.Music["Test-mini"]), musicMiniTop, musicMiniSecond)}</td>`;
//         let musicTest = `<td>${formatValue(parseFloat(entry.Music["Test"]), musicTestTop, musicTestSecond)}</td>`;
//         let speechMini = `<td>${formatValue(parseFloat(entry.Speech["Test-mini"]), speechMiniTop, speechMiniSecond)}</td>`;
//         let speechTest = `<td>${formatValue(parseFloat(entry.Speech["Test"]), speechTestTop, speechTestSecond)}</td>`;
//         let avgMini = `<td>${formatValue(parseFloat(entry.Avg["Test-mini"]), avgMiniTop, avgMiniSecond)}</td>`;
//         let avgTest = `<td>${formatValue(parseFloat(entry.Avg["Test"]), avgTestTop, avgTestSecond)}</td>`;

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
