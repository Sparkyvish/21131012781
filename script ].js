const apiUrl = 'http://localhost:9876/numbers/';
const windowSize = 10;
let numbers = [];

document.getElementById('number-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const numberId = document.getElementById('number-id').value.trim();
    if (numberId && ['p', 'f', 'e', 'r'].includes(numberId)) {
        fetch(apiUrl + numberId)
          .then(response => response.json())
          .then(data => {
                const windowPrevState = [...numbers];
                const newNumbers = data.numbers.filter(num =>!numbers.includes(num));
                numbers = [...new Set([...numbers,...newNumbers])].slice(-windowSize);
                const windowCurrState = [...numbers];
                const avg = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
                const response = {
                    windowPrevState,
                    windowCurrState,
                    numbers: data.numbers,
                    avg: avg.toFixed(2)
                };
                displayResponse(response);
            })
          .catch(error => console.error(error));
    } else {
        alert('Invalid number ID. Please enter p, f, e, or r.');
    }
});

function displayResponse(response) {
    const responseContainer = document.getElementById('response-container');
    responseContainer.innerHTML = `
        <h2>Response:</h2>
        <p>Window Previous State: ${response.windowPrevState.join(', ')}</p>
        <p>Window Current State: ${response.windowCurrState.join(', ')}</p>
        <p>Numbers: ${response.numbers.join(', ')}</p>
        <p>Average: ${response.avg}</p>
    `;
}