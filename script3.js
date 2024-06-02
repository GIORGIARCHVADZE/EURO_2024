document.addEventListener('DOMContentLoaded', (event) => {
    loadGames();
    document.getElementById('add-game').addEventListener('click', addGameRow);
});

const teams = ["ავსტრია", "ალბანეთი", "ბელგია", "გერმანია", "დანია", "ესპანეთი", "თურქეთი", "ინგლისი", "იტალია", "ნიდერლანდები", "პოლონეთი", "პორტუგალია", " რუმინეთი", "საფრანგეთი", "საქართველო", "სერბეთი", "სლოვაკია", "სლოვენია", "უკრაინა", "უნგრეთი", "შვეიცარია", "შოტლანდია", "ჩეხეთი", "ხორვატია"];
const matchNames = ["A", "B", "C", "D", "E", "F"];

function addGameRow() {
    const tableBody = document.getElementById('games-table-body');
    const row = document.createElement('tr');

    // Date field
    const dateTd = document.createElement('td');
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'date';
    dateTd.appendChild(dateInput);
    row.appendChild(dateTd);

    // Time field
    const timeTd = document.createElement('td');
    const timeInput = document.createElement('input');
    timeInput.type = 'time';
    timeInput.name = 'time';
    timeTd.appendChild(timeInput);
    row.appendChild(timeTd);

    // Match name dropdown
    const matchNameTd = document.createElement('td');
    const matchNameSelect = document.createElement('select');
    matchNameSelect.name = 'match-name';
    matchNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        matchNameSelect.appendChild(option);
    });
    matchNameTd.appendChild(matchNameSelect);
    row.appendChild(matchNameTd);

    // Team 1 dropdown
    const team1Td = document.createElement('td');
    const team1Select = document.createElement('select');
    team1Select.name = 'team1';
    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team;
        option.textContent = team;
        team1Select.appendChild(option);
    });
    team1Td.appendChild(team1Select);
    row.appendChild(team1Td);

    // Team 2 dropdown
    const team2Td = document.createElement('td');
    const team2Select = document.createElement('select');
    team2Select.name = 'team2';
    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team;
        option.textContent = team;
        team2Select.appendChild(option);
    });
    team2Td.appendChild(team2Select);
    row.appendChild(team2Td);

    // Goals Team 1 field
    const goalsTeam1Td = document.createElement('td');
    const goalsTeam1Input = document.createElement('input');
    goalsTeam1Input.className = "goals-team11"
    goalsTeam1Input.type = 'number';
    goalsTeam1Input.name = 'goals-team1';
    goalsTeam1Td.appendChild(goalsTeam1Input);
    row.appendChild(goalsTeam1Td);

    // Goals Team 2 field
    const goalsTeam2Td = document.createElement('td');
    const goalsTeam2Input = document.createElement('input');
    goalsTeam2Input.type = 'number';
    goalsTeam2Input.name = 'goals-team2';
    goalsTeam2Td.appendChild(goalsTeam2Input);
    row.appendChild(goalsTeam2Td);

    tableBody.appendChild(row);
}

function saveGames() {
    const games = [];
    const rows = document.querySelectorAll('#games-table-body tr');
    rows.forEach(row => {
        const game = {};
        row.querySelectorAll('input, select').forEach(input => {
            game[input.name] = input.value;
        });
        games.push(game);
    });
    localStorage.setItem('europeanChampionshipGames', JSON.stringify(games));
    alert('მონაცემები შენახულია!');
}

function loadGames() {
    const games = JSON.parse(localStorage.getItem('europeanChampionshipGames')) || [];
    games.forEach(game => {
        addGameRow();
        const lastRow = document.querySelector('#games-table-body tr:last-child');
        lastRow.querySelectorAll('input, select').forEach(input => {
            input.value = game[input.name];
        });
    });
}

document.getElementById('add-game').addEventListener('click', addGameRow);
