// document.addEventListener('DOMContentLoaded', () => {
//     const teams = ["Austria", "Albania", "Belgium", "Germany", "Denmark", "Spain", "Turkey", "England", "Italy", "Netherlands", "Poland", "Portugal", "Romania", "France", "Georgia", "Serbia", "Slovakia", "Slovenia", "Ukraine", "Hungary", "Switzerland", "Scotland", "Czech Republic", "Croatia"];
//     const teamSelects = document.querySelectorAll('.team-select');

//     teamSelects.forEach(select => {
//         teams.forEach(team => {
//             const option = document.createElement('option');
//             option.value = team;
//             option.textContent = team;
//             select.appendChild(option);
//         });
//     });

//     document.getElementById('saveButton').addEventListener('click', saveData);
//     document.getElementById('loadButton').addEventListener('click', loadData);

//     function saveData() {
//         const matches = document.querySelectorAll('.match');
//         const data = Array.from(matches).map(match => {
//             const teamSelects = match.querySelectorAll('.team-select');
//             const scoreInputs = match.querySelectorAll('.score-input');
//             const dateInput = match.querySelector('.match-date');

//             return {
//                 team1: teamSelects[0].value,
//                 team2: teamSelects[1].value,
//                 score1: scoreInputs[0].value,
//                 score2: scoreInputs[1].value,
//                 date: dateInput.value
//             };
//         });

//         localStorage.setItem('bracketData', JSON.stringify(data));
//     }

//     function loadData() {
//         const data = JSON.parse(localStorage.getItem('bracketData'));
//         if (!data) return;

//         const matches = document.querySelectorAll('.match');

//         data.forEach((matchData, index) => {
//             const match = matches[index];
//             const teamSelects = match.querySelectorAll('.team-select');
//             const scoreInputs = match.querySelectorAll('.score-input');
//             const dateInput = match.querySelector('.match-date');

//             teamSelects[0].value = matchData.team1;
//             teamSelects[1].value = matchData.team2;
//             scoreInputs[0].value = matchData.score1;
//             scoreInputs[1].value = matchData.score2;
//             dateInput.value = matchData.date;
//         });
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    const teamOptions = [
        { label: 'A1', value: 'A1' },
        { label: 'A2', value: 'A2' },
        { label: 'A3', value: 'A3' },
        { label: 'A4', value: 'A4' },
        { label: 'B1', value: 'B1' },
        { label: 'B2', value: 'B2' },
        { label: 'B3', value: 'B3' },
        { label: 'B4', value: 'B4' },
        { label: 'C1', value: 'C1' },
        { label: 'C2', value: 'C2' },
        { label: 'C3', value: 'C3' },
        { label: 'C4', value: 'C4' }
    ];

    document.querySelectorAll('.team-select').forEach(select => {
        teamOptions.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.label;
            select.appendChild(opt);
        });
    });

    const saveButton = document.getElementById('saveButton');

    saveButton.addEventListener('click', () => {
        const data = [];
        document.querySelectorAll('.match').forEach(match => {
            const matchData = {
                date: match.querySelector('.match-date').value,
                team1: match.querySelectorAll('.team-select')[0].value,
                team1Score: match.querySelectorAll('.score-input')[0].value,
                team2: match.querySelectorAll('.team-select')[1].value,
                team2Score: match.querySelectorAll('.score-input')[1].value
            };
            data.push(matchData);
        });
        localStorage.setItem('tournamentData', JSON.stringify(data));
    });

    const savedData = JSON.parse(localStorage.getItem('tournamentData'));
    if (savedData) {
        document.querySelectorAll('.match').forEach((match, index) => {
            if (savedData[index]) {
                match.querySelector('.match-date').value = savedData[index].date;
                match.querySelectorAll('.team-select')[0].value = savedData[index].team1;
                match.querySelectorAll('.score-input')[0].value = savedData[index].team1Score;
                match.querySelectorAll('.team-select')[1].value = savedData[index].team2;
                match.querySelectorAll('.score-input')[1].value = savedData[index].team2Score;
            }
        });
    }
});
