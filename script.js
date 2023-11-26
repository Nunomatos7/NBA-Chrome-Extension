import { name } from './names.js';

async function fetchPlayerStatistics(gameId) {
    const url = `https://api-nba-v1.p.rapidapi.com/players/statistics?game=${gameId}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b11c7d60bbmsh6027f68419566eap177772jsn6d61a497f998',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Get the date-picker input element
const datePicker = document.getElementById('date-picker');
const viewSwitch = document.getElementById('view-switch');
const gamesElement = document.getElementById("games");

// Add event listeners to the filter buttons
const filterLiveBtn = document.getElementById('filter-live');
const filterFinishedBtn = document.getElementById('filter-finished');
const filterScheduledBtn = document.getElementById('filter-scheduled');
const filterAllBtn = document.getElementById('filter-all');

filterLiveBtn.addEventListener('click', () => filterGames('In Play'));
filterFinishedBtn.addEventListener('click', () => filterGames('Finished'));
filterScheduledBtn.addEventListener('click', () => filterGames('Scheduled'));
filterAllBtn.addEventListener('click', () => filterGames('All'));

// Function to filter games based on status
function filterGames(status) {
    const gameItems = document.querySelectorAll('.game-item, .game-item-minimalist');
    gameItems.forEach((item) => {
        const gameStatus = item.getAttribute('data-status');
        if (status === 'All' || gameStatus === status) {
            item.style.display = 'block'; // Show the game
        } else {
            item.style.display = 'none'; // Hide the game
        }
    });
}



viewSwitch.addEventListener('change', async () => {
    const selectedDate = datePicker.value;
    clearGames();
    await fetchData(selectedDate);
});
async function fetchData(selectedDate) {


    const url = 'https://api-nba-v1.p.rapidapi.com/games?date=';
    const finalUrl = url + selectedDate;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b11c7d60bbmsh6027f68419566eap177772jsn6d61a497f998',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(finalUrl, options);
        const result = await response.json();
        const games = result.response;

        const gamesElement = document.getElementById("games");
        for (const game of games) {
            const homeLinescore = game.scores.home.linescore;
            const awayLinescore = game.scores.visitors.linescore;

            

            // Check the switch state to determine the view
            const minimalistView = viewSwitch.checked;
            const minimalistHomeName = name(game.teams.home.name);
            const minimalistAwayName = name(game.teams.visitors.name);
            //console.log(game.status.long);

            const gameDiv = document.createElement("div")
            if(minimalistView){
                gameDiv.classList.add("game-item-minimalist");
            }else{
                gameDiv.classList.add("game-item");
            }

            // Filter the games by status
            if (game.status.long === 'Finished') {
                gameDiv.setAttribute('data-status', 'Finished');
            } else if (game.status.long === 'In Play') {
                gameDiv.setAttribute('data-status', 'In Play');
            } else if (game.status.long === 'Scheduled') {
                gameDiv.setAttribute('data-status', 'Scheduled');
            }
            
            if(game.status.long === "Finished"){
                if (minimalistView) {
                    //console.log(game.teams.home.name);
                    // Display minimalist view for finished games
                    gameDiv.innerHTML = `
                        <div class="game-details-minimalist">
                            <p><img src="${minimalistHomeName.badgeURL}" alt="${minimalistHomeName.abbreviation} Logo" class="team-logo"> ${minimalistHomeName.abbreviation} <span class="score-minimalist">${game.scores.home.points}</span> - <span class="score-minimalist">${game.scores.visitors.points}</span> ${minimalistAwayName.abbreviation} <img src="${minimalistAwayName.badgeURL}" alt="${minimalistAwayName.abbreviation} Logo" class="team-logo"> <p class="status">${game.status.long}</p></p>
                        </div>`;

                    gamesElement.appendChild(gameDiv);
                }else{
                    gameDiv.innerHTML = `
                    <div class="game-details">
                        <p>${new Date(game.date.start).toLocaleTimeString()}</p>
                        <p>${game.teams.home.name} <span class="score">${game.scores.home.points}</span> - <span class="score">${game.scores.visitors.points}</span> ${game.teams.visitors.name} (<span class="status">${game.status.long}</span>)</p>
                        <p>${game.arena.name ? `${game.arena.name}, ${game.arena.city}` : 'Location details not available'}</p>
                        <table class="linescore-table">
                            <tr>${homeLinescore.map((score) => `<td>${score}</td>`).join('')}</tr>
                            <tr>${awayLinescore.map((score) => `<td>${score}</td>`).join('')}</tr>
                        </table>
                    </div>`;
                    gamesElement.appendChild(gameDiv);

                    const playerStats = await fetchPlayerStatistics(game.id);

                    if (playerStats) {
                        const playerWithMostPoints = playerStats.reduce((maxPlayer, player) => {
                            return player.points > maxPlayer.points ? player : maxPlayer;
                        }, { points: -Infinity });
                    
                        const playerName = `${playerWithMostPoints.player.firstname} ${playerWithMostPoints.player.lastname}`;
                    
                        const playerTable = document.createElement("table");
                        playerTable.classList.add("player-details");
                    
                        const firstRow = document.createElement("tr");
                    
                        const playerNameCell = document.createElement("td");
                        playerNameCell.textContent = playerName;
                        playerNameCell.rowSpan = 2;
                        playerNameCell.classList.add("player-name");
                    
                        const pointsLabelCell = createTableCell("Points");
                        const reboundsLabelCell = createTableCell("Rebounds");
                        const assistsLabelCell = createTableCell("Assists");
                    
                        firstRow.appendChild(playerNameCell);
                        firstRow.appendChild(pointsLabelCell);
                        firstRow.appendChild(reboundsLabelCell);
                        firstRow.appendChild(assistsLabelCell);
                    
                        const secondRow = document.createElement("tr");
                    
                        const pointsValueCell = createTableCell(playerWithMostPoints.points);
                        const reboundsValueCell = createTableCell(playerWithMostPoints.totReb);
                        const assistsValueCell = createTableCell(playerWithMostPoints.assists);
                    
                        secondRow.appendChild(pointsValueCell);
                        secondRow.appendChild(reboundsValueCell);
                        secondRow.appendChild(assistsValueCell);
                    
                        playerTable.appendChild(firstRow);
                        playerTable.appendChild(secondRow);
                    
                        const bestPlayerText = document.createElement("strong");
                        bestPlayerText.textContent = 'Top Performer';

                        const hrElement = document.createElement("hr"); // Create the horizontal line
                        hrElement.classList.add("separator");
                        
                        const playerDetails = document.createElement("div");
                        playerDetails.classList.add("player-info");
                        playerDetails.appendChild(hrElement);
                        playerDetails.appendChild(bestPlayerText);
                        playerDetails.appendChild(playerTable);
                    
                        gameDiv.querySelector('.game-details').appendChild(playerDetails);
                    }
                    function createTableCell(text) {
                        const cell = document.createElement("td");
                        cell.textContent = text;
                        return cell;
                    }
                }

                
            }else if(game.status.long === "Scheduled"){
                if(minimalistView) {
                    // Display minimalist view for scheduled games
                    gameDiv.innerHTML = `
                        <div class="game-details-minimalist">
                            <p><img src="${minimalistHomeName.badgeURL}" alt="${minimalistHomeName.abbreviation} Logo" class="team-logo"> ${minimalistHomeName.abbreviation} vs  ${minimalistAwayName.abbreviation}<img src="${minimalistAwayName.badgeURL}" alt="${minimalistAwayName.abbreviation} Logo" class="team-logo"></p>
                            <p class="status">${game.status.long} ${new Date(game.date.start).toLocaleTimeString()}</p>
                        </div>`;
                    gamesElement.appendChild(gameDiv);
                }else{
                    gameDiv.innerHTML = `
                    <div class="game-details">
                        <p>${new Date(game.date.start).toLocaleTimeString()}</p>
                        <p>${game.teams.home.name} vs ${game.teams.visitors.name} (<span class="status">${game.status.long}</span>)</p>
                        <p>${game.arena.name ? `${game.arena.name}, ${game.arena.city}` : 'Location details not available'}</p>
                    </div>`;
                    gamesElement.appendChild(gameDiv);
                }
            }else if(game.status.long === "In Play"){
                if(minimalistView){
                    // Display minimalist view for games in play
                    gameDiv.innerHTML = `
                        <div class="game-details-minimalist">
                        <p><img src="${minimalistHomeName.badgeURL}" alt="${minimalistHomeName.abbreviation} Logo" class="team-logo"> ${minimalistHomeName.abbreviation} <span class="score-minimalist">${game.scores.home.points}</span> - <span class="score-minimalist">${game.scores.visitors.points}</span> ${minimalistAwayName.abbreviation}<img src="${minimalistAwayName.badgeURL}" alt="${minimalistAwayName.abbreviation} Logo" class="team-logo"><p class="status> Q${game.periods.current} - ${game.status.clock} </p></p>
                        </div>`;
                    gamesElement.appendChild(gameDiv);
                }else{
                    gameDiv.innerHTML = `
                    <div class="game-details">
                        <p>${new Date(game.date.start).toLocaleTimeString()}</p>
                        <p>${game.teams.home.name} <span class="score">${game.scores.home.points}</span> - <span class="score">${game.scores.visitors.points}</span> ${game.teams.visitors.name} (Q${game.periods.current} - ${game.status.clock} </span>)</p>
                        <p>${game.arena.name ? `${game.arena.name}, ${game.arena.city}` : 'Location details not available'}</p>
                    </div>`;
                    gamesElement.appendChild(gameDiv);
                    const playerStats = await fetchPlayerStatistics(game.id);

                    if (playerStats) {
                        const playerWithMostPoints = playerStats.reduce((maxPlayer, player) => {
                            return player.points > maxPlayer.points ? player : maxPlayer;
                        }, { points: -Infinity });
                    
                        const playerName = `${playerWithMostPoints.player.firstname} ${playerWithMostPoints.player.lastname}`;
                    
                        const playerTable = document.createElement("table");
                        playerTable.classList.add("player-details");
                    
                        const firstRow = document.createElement("tr");
                    
                        const playerNameCell = document.createElement("td");
                        playerNameCell.textContent = playerName;
                        playerNameCell.rowSpan = 2;
                        playerNameCell.classList.add("player-name");
                    
                        const pointsLabelCell = createTableCell("Points");
                        const reboundsLabelCell = createTableCell("Rebounds");
                        const assistsLabelCell = createTableCell("Assists");
                    
                        firstRow.appendChild(playerNameCell);
                        firstRow.appendChild(pointsLabelCell);
                        firstRow.appendChild(reboundsLabelCell);
                        firstRow.appendChild(assistsLabelCell);
                    
                        const secondRow = document.createElement("tr");
                    
                        const pointsValueCell = createTableCell(playerWithMostPoints.points);
                        const reboundsValueCell = createTableCell(playerWithMostPoints.totReb);
                        const assistsValueCell = createTableCell(playerWithMostPoints.assists);
                    
                        secondRow.appendChild(pointsValueCell);
                        secondRow.appendChild(reboundsValueCell);
                        secondRow.appendChild(assistsValueCell);
                    
                        playerTable.appendChild(firstRow);
                        playerTable.appendChild(secondRow);
                    
                        const bestPlayerText = document.createElement("strong");
                        bestPlayerText.textContent = 'Top Performer';

                        const hrElement = document.createElement("hr"); // Create the horizontal line
                        hrElement.classList.add("separator");
                        
                        const playerDetails = document.createElement("div");
                        playerDetails.classList.add("player-info");
                        playerDetails.appendChild(hrElement);
                        playerDetails.appendChild(bestPlayerText);
                        playerDetails.appendChild(playerTable);
                    
                        gameDiv.querySelector('.game-details').appendChild(playerDetails);
                    }
                    function createTableCell(text) {
                        const cell = document.createElement("td");
                        cell.textContent = text;
                        return cell;
                    }
                }
                
            }
        }
    } catch (error) {
        console.error(error);
    }
}

// Get today's date
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

// Set the default value of the date-picker input to today's date
datePicker.value = formattedDate;

// Fetch data initially for today's date
fetchData(formattedDate);

// Add an event listener to the date-picker input
datePicker.addEventListener('change', async () => {
    const selectedDate = datePicker.value;
    clearGames();
    // Fetch data based on the selected date
    await fetchData(selectedDate);
    fetchData(selectedDate);
});





function clearGames() {
    gamesElement.innerHTML = ""; // Clear the existing games
}

