document.addEventListener('DOMContentLoaded', (event) => {
    createTables(6);
    loadData();
    addEventListeners();
});

function createTables(numberOfGroups) {
    const container = document.getElementById('tables-container');
    const flags = ["georgia.jpg", "italy.jpg", "germany.jpg", "france.jpg"];
    
    for (let i = 0; i < numberOfGroups; i++) {
        const table = document.createElement('table');
        const caption = document.createElement('caption');
        caption.textContent = `Group ${String.fromCharCode(65 + i)}`;
        table.appendChild(caption);

        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');
        const headers = ['Team', 'Played', 'Won', 'Drawn', 'Lost', 'Goals For', 'Goals Against', 'Goal Difference', 'Points'];
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            trHead.appendChild(th);
        });
        thead.appendChild(trHead);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        for (let j = 1; j <= 4; j++) {
            const tr = document.createElement('tr');
            const tdTeam = document.createElement('td');
            tdTeam.className = "team-info team-name";
            const img = document.createElement('img');
            img.className = "flag";
            img.src = flags[j - 1];
            const inputTeam = document.createElement('input');
            inputTeam.className = "team-name-input"
            inputTeam.type = 'text';
            inputTeam.placeholder = `Enter Team ${j}`;
            inputTeam.name = `team${j}G${i+1}`;
            tdTeam.appendChild(img);
            tdTeam.appendChild(inputTeam);
            tr.appendChild(tdTeam);

            ['played', 'Won', 'Drawn', 'Lost', 'GoalsFor', 'GoalsAgainst', 'GoalDifference', 'Points'].forEach(field => {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.className = field.toLowerCase();
                input.type = 'text';
                input.name = `team${j}G${i+1}${field}`;
                if (['GoalDifference', 'Points'].includes(field)) {
                    input.disabled = true;
                }
                td.appendChild(input);
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        container.appendChild(table);
    }
}

function saveData() {
    const data = {};
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        data[input.name] = input.value;
    });
    localStorage.setItem('footballData', JSON.stringify(data));
    alert('Data saved successfully!');
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('footballData'));
    if (data) {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            if (data[input.name] !== undefined) {
                input.value = data[input.name];
            }
        });
    }
}

function addEventListeners() {
    const wonInputs = document.querySelectorAll('input.won');
    const drawnInputs = document.querySelectorAll('input.drawn');
    const goalsForInputs = document.querySelectorAll('input.goalsfor');
    const goalsAgainstInputs = document.querySelectorAll('input.goalsagainst');

    wonInputs.forEach(input => {
        input.addEventListener('input', (event) => {
            updatePoints(event.target);
        });
    });

    drawnInputs.forEach(input => {
        input.addEventListener('input', (event) => {
            updatePoints(event.target);
        });
    });

    goalsForInputs.forEach(input => {
        input.addEventListener('input', (event) => {
            updateGoalDifference(event.target);
        });
    });

    goalsAgainstInputs.forEach(input => {
        input.addEventListener('input', (event) => {
            updateGoalDifference(event.target);
        });
    });
}

function updatePoints(target) {
    const row = target.closest('tr');
    const won = parseInt(row.querySelector('input.won').value) || 0;
    const drawn = parseInt(row.querySelector('input.drawn').value) || 0;
    const points = (won * 3) + drawn;
    row.querySelector('input.points').value = points;
}

function updateGoalDifference(target) {
    const row = target.closest('tr');
    const goalsFor = parseInt(row.querySelector('input.goalsfor').value) || 0;
    const goalsAgainst = parseInt(row.querySelector('input.goalsagainst').value) || 0;
    const goalDifference = goalsFor - goalsAgainst;
    row.querySelector('input.goaldifference').value = goalDifference;
}
