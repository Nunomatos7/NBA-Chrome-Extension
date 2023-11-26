export function name(teamName) {
    switch(teamName){
        case "Boston Celtics":
            return { abbreviation: "BOS", badgeURL: "./Logos/Celtics.png" };
            break;
        case "Brooklyn Nets":
            return { abbreviation: "BRO", badgeURL: "./Logos/Nets.png" };
            break;  
        case "New York Knicks":
            return { abbreviation: "NYK", badgeURL: "./Logos/Knicks.png" };
            break;
        case "Philadelphia 76ers":
            return { abbreviation: "PHI", badgeURL: "./Logos/Phila.png" };
            break;
        case "Toronto Raptors":
            return { abbreviation: "TOR", badgeURL: "./Logos/Raptors.png" };
            break;
        case "Chicago Bulls":
            return { abbreviation: "CHI", badgeURL: "./Logos/Bulls.png" };
            break;
        case "Cleveland Cavaliers":
            return { abbreviation: "CLE", badgeURL: "./Logos/Cavs.png" };
            break;
        case "Detroit Pistons":
            return { abbreviation: "DET", badgeURL: "./Logos/Pistons.png" };
            break;
        case "Indiana Pacers":
            return { abbreviation: "IND", badgeURL: "./Logos/Pacers.png" };
            break;
        case "Milwaukee Bucks":
            return { abbreviation: "MIL", badgeURL: "./Logos/Bucks.png" };
            break;
        case "Atlanta Hawks":
            return { abbreviation: "ATL", badgeURL: "./Logos/Hawks.png" };
            break;
        case "Charlotte Hornets":
            return { abbreviation: "CHA", badgeURL: "./Logos/Hornets.png" };
            break;
        case "Miami Heat":
            return { abbreviation: "MIA", badgeURL: "./Logos/Heat.png" };
            break;
        case "Orlando Magic":
            return { abbreviation: "ORL", badgeURL: "./Logos/Magic.png" };
            break;
        case "Washington Wizards":
            return { abbreviation: "WAS", badgeURL: "./Logos/Wizards.png" };
            break;
        case "Dallas Mavericks":
            return { abbreviation: "DAL", badgeURL: "./Logos/Mavs.png" };
            break;
        case "Houston Rockets":
            return { abbreviation: "HOU", badgeURL: "./Logos/Rockets.png" };
            break;
        case "Memphis Grizzlies":
            return { abbreviation: "MEM", badgeURL: "./Logos/Grizzlies.png" };
            break;
        case "New Orleans Pelicans":
            return { abbreviation: "NOP", badgeURL: "./Logos/Pels.png" };
            break;
        case "San Antonio Spurs":
            return { abbreviation: "SAS", badgeURL: "./Logos/Spurs.png" };
            break;
        case "Denver Nuggets":
            return { abbreviation: "DEN", badgeURL: "./Logos/Nuggets.png" };
            break;
        case "Minnesota Timberwolves":
            return { abbreviation: "MIN", badgeURL: "./Logos/Wolves.png" };
            break;
        case "Oklahoma City Thunder":
            return { abbreviation: "OKC", badgeURL: "./Logos/Okc.png" };
            break;
        case "Portland Trail Blazers":
            return { abbreviation: "POR", badgeURL: "./Logos/Blazers.png" };
            break;
        case "Utah Jazz":
            return { abbreviation: "UTA", badgeURL: "./Logos/Jazz.png" };
            break;
        case "Golden State Warriors":
            return { abbreviation: "GSW", badgeURL: "./Logos/Warriors.png" };
            break;
        case "LA Clippers":
            return { abbreviation: "LAC", badgeURL: "./Logos/Clippers.png" };
            break;
        case "Los Angeles Lakers":
            return { abbreviation: "LAL", badgeURL: "./Logos/Lakers.png" };
            break;
        case "Phoenix Suns":
            return { abbreviation: "PHX", badgeURL: "./Logos/Suns.png" };
            break;
        case "Sacramento Kings":
            return { abbreviation: "SAC", badgeURL: "./Logos/Kings.png" };
            break;
        default:
            return "Team not found";
            break;
    }
}