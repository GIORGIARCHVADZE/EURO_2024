document.addEventListener('DOMContentLoaded', (event) => {
    createTables(6);
    loadData();
    addEventListeners();
});

function createTables(numberOfGroups) {
    const container = document.getElementById('tables-container');
    const flags = ["ავსტრია.jpg", "ალბანეთი.jpg", "ბელგია.jpg", "გერმანია.jpg", "დანია.jpg", "ესპანეთი.jpg", "თურქეთი.jpg", "ინგლისი.jpg", "იტალია.jpg", "ნიდერლანდი.jpg", "პოლონეთი.jpg", "პორტუგალია.jpg", "რუმინეთი.jpg", "საფრანგეთი.jpg", "საქართველო.jpg", "სერბეთი.jpg", "სლოვაკეთი.jpg", "სლოვენია.jpg", "უკრაინა.jpg", "უნგრეთი.jpg", "შვეიცარია.jpg", "შოტლანდია.jpg", "ჩეხეთი.jpg", "ხორვატია.jpg"];  // Add more flags as needed

    for (let i = 0; i < numberOfGroups; i++) {
        const table = document.createElement('table');
        const caption = document.createElement('caption');
        caption.textContent = `ჯგუფი ${String.fromCharCode(65 + i)}`;
        caption.className = "Groups-Name"
        table.appendChild(caption);

        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');
        const headers = ['გუნდები', 'თამაში', 'მოგება', 'ფრე', 'წაგება', 'გატანილი ბ', 'მიღებული ბ', 'ბურთების სხვაობა', 'ქულა', 'შედეგები'];
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

            // Creating an image element for flag
            const img = document.createElement('img');
            img.className = "flag";
            img.alt = 'flag';

            // Creating a dropdown for flag selection
            const selectFlag = document.createElement('select');
            selectFlag.className = "flag-select";
            selectFlag.name = `team${j}G${i+1}Flag`;
            flags.forEach(flag => {
                const option = document.createElement('option');
                option.value = flag;
                option.textContent = flag.split('.')[0];  // Display the flag name without extension
                selectFlag.appendChild(option);
            });

            selectFlag.addEventListener('change', function() {
                img.src = this.value;
            });

            tdTeam.appendChild(img);
            tdTeam.appendChild(selectFlag);
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

          
            // Adding match result input
            const tdResult = document.createElement('td');
            const inputResult = document.createElement('input');
            inputResult.className = "match-result";
            inputResult.type = 'text';
            inputResult.name = `team${j}G${i+1}MatchResult`;
            tdResult.appendChild(inputResult);
            tr.appendChild(tdResult);

            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        container.appendChild(table);
    }
}

function saveData() {
    const data = {};
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        data[input.name] = input.value;
    });
    localStorage.setItem('footballData', JSON.stringify(data));
    alert('მონაცემები შენახულია!');
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('footballData'));
    if (data) {
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (data[input.name] !== undefined) {
                input.value = data[input.name];
                if (input.className === 'flag-select') {
                    const img = input.previousSibling;  // Assuming img is right before the select element
                    img.src = input.value;
                }
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
