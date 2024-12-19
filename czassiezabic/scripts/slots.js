
document.addEventListener("DOMContentLoaded", () => {
    const spinButton = document.getElementById("slots-spin");
    const resultDisplay = document.getElementById("slots-result");

    spinButton.addEventListener("click", () => {
        const bet = 100; 
        if (!adjustBalance(-bet)) return;

        const symbols = ["🍒", "🍋", "🔔", "💎"];
        const slot1 = symbols[Math.floor(Math.random() * symbols.length)];
        const slot2 = symbols[Math.floor(Math.random() * symbols.length)];
        const slot3 = symbols[Math.floor(Math.random() * symbols.length)];

        resultDisplay.textContent = `${slot1} | ${slot2} | ${slot3}`;

        if (slot1 === slot2 && slot2 === slot3) {
            const winnings = bet * 10;
            adjustBalance(winnings);

        } else {

        }
    });
});