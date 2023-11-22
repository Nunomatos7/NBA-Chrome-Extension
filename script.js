const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${year}-${month}-${day}`;

async function fetchData() {
    const url = 'https://api-nba-v1.p.rapidapi.com/games?date=';
    const urlDate = currentDate;
    const finalUrl = url + urlDate;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': ''
        }
    };


    const response = await fetch(finalUrl, options);
    const result = await response.json();
    console.log(result);

    const games = result.response; // Access the 'response' array containing the games

    const gameInfo = games.map(game => {
        const homeTeam = game.teams.home.name; // Extract home team name
        const awayTeam = game.teams.visitors.name; // Extract away team name
        const gameTime = new Date(game.date.start).toLocaleTimeString(); // Extract game time
        const homeScore = game.scores.home.points; // Extract home team score
        const awayScore = game.scores.visitors.points; // Extract away team score
        const gameStatus = game.status.long; // Extract game status (Finished/Ongoing/Scheduled)
        const homeLinescore = game.scores.home.linescore;
        const awayLinescore = game.scores.visitors.linescore;
        const arena = game.arena.name || ''; // Extract arena name or set default to empty string
        const city = game.arena.city || ''; // Extract city or set default to empty string
        const gameLocation = arena && city ? `${arena}, ${city}` : 'Location details not available'; // Format game location

        return { homeTeam, awayTeam, gameTime, homeScore, awayScore, gameStatus, homeLinescore, awayLinescore, gameLocation }; // Store in an object
    });
    
    // Now 'gameInfo' contains detailed information for each game
    console.log(gameInfo);
    
    // Display the additional details alongside team names and time
    const gamesElement = document.getElementById("games");
    gameInfo.forEach(game => {
        const gameDiv = document.createElement("div");
        gameDiv.classList.add("game-item");
        gameDiv.innerHTML = `
            <div class="game-details">
                <p>${game.gameTime}</p>
                <p>${game.homeTeam} <span class="score">${game.homeScore}</span> - <span class="score">${game.awayScore}</span> ${game.awayTeam} (<span class="status">${game.gameStatus}</span>)</p>
                <table class="linescore-table">
                <tr>${game.homeLinescore.map(score => `<td>${score}</td>`).join('')}</tr>
                <tr>${game.awayLinescore.map(score => `<td>${score}</td>`).join('')}</tr>
            </table>
                <p>${game.gameLocation}</p>
            </div>`;
        gamesElement.appendChild(gameDiv);
    });
    
    
}

fetchData();