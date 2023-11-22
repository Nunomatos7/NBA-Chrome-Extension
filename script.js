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
            'X-RapidAPI-Key': '...',
            'X-RapidAPI-Host': '...'
        }
    };


    const response = await fetch(finalUrl, options);
    const result = await response.json();
    console.log(result);

    const games = result.response; // Access the 'response' array containing the games

    // Extract home and away team names for each game
    const gameInfo = games.map(game => {
        const homeTeam = game.teams.home.name; // Extract home team name
        const awayTeam = game.teams.visitors.name; // Extract away team name
        const gameTime = new Date(game.date.start).toLocaleTimeString(); // Extract game time

        return { homeTeam, awayTeam, gameTime }; // Store in an object
    });

    const gamesElement = document.getElementById("games");
    gameInfo.forEach(game => {
        const gameDiv = document.createElement("li");
        gameDiv.textContent = `${game.homeTeam} vs ${game.awayTeam} - ${game.gameTime}`;
        gamesElement.appendChild(gameDiv);
    });
    
}

fetchData();
