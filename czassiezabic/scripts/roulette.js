
document.addEventListener("DOMContentLoaded", () => {
    const betInput = document.getElementById("roulette-bet");
    const choiceSelect = document.getElementById("roulette-choice");
    const spinButton = document.getElementById("roulette-spin");
    const resultDisplay = document.getElementById("roulette-result");

    spinButton.addEventListener("click", () => {
        const bet = parseInt(betInput.value);
        const choice = choiceSelect.value;

        if (!adjustBalance(-bet)) return;

        const outcomes = ["red", "black", "green"]; 
        const weights = [18, 18, 1]; 

        const result = weightedRandom(outcomes, weights);

        if (choice === result) {
            let multiplier = result === "green" ? 100 : 2;
            const winnings = bet * multiplier;
            adjustBalance(winnings);
            resultDisplay.textContent = `U won ${winnings}. Colour: ${result}`;
        } else {
            let loss = result === "green" ? bet : Math.floor(bet / 2);
            adjustBalance(-loss);
            resultDisplay.textContent = `U lost L ez ez spammer ${loss}. Colour: ${result}`;
        }
    });

    function weightedRandom(items, weights) {
        const cumulativeWeights = weights.map(
            (sum => value => sum += value)(0) 
        );
        const random = Math.random() * cumulativeWeights[cumulativeWeights.length - 1];
        return items[cumulativeWeights.findIndex(weight => random < weight)];
    }
});
