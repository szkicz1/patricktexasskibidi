document.addEventListener("DOMContentLoaded", () => {
    const drawButton = document.getElementById("poker-draw");
    const resultDisplay = document.getElementById("poker-result");
    const betInput = document.getElementById("poker-bet");
    const handDisplay = document.getElementById("poker-hand");

    const suits = ["♠", "♥", "♦", "♣"];
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    function drawHand() {
        const deck = [];
        for (let suit of suits) {
            for (let rank of ranks) {
                deck.push(`${rank}${suit}`);
            }
        }

        const hand = [];
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * deck.length);
            hand.push(deck.splice(randomIndex, 1)[0]);
        }
        return hand;
    }

    function evaluateHand(hand) {
        const rankCounts = {};
        const suitCounts = {};
        let isStraight = true;
        let isFlush = false;


        hand.forEach(card => {
            const rank = card.slice(0, -1);
            const suit = card.slice(-1);

            rankCounts[rank] = (rankCounts[rank] || 0) + 1;
            suitCounts[suit] = (suitCounts[suit] || 0) + 1;
        });

        const rankValues = Object.keys(rankCounts)
            .map(rank => ranks.indexOf(rank))
            .sort((a, b) => a - b);


        for (let i = 1; i < rankValues.length; i++) {
            if (rankValues[i] !== rankValues[i - 1] + 1) {
                isStraight = false;
                break;
            }
        }

        isFlush = Object.keys(suitCounts).length === 1;


        if (isStraight && isFlush) return "Poker Królewski";
        if (isStraight) return "Strit";
        if (isFlush) return "Kolor";

        const counts = Object.values(rankCounts);
        if (counts.includes(4)) return "Kareta";
        if (counts.includes(3) && counts.includes(2)) return "Full";
        if (counts.includes(3)) return "Trójka";
        if (counts.filter(count => count === 2).length === 2) return "Dwie Pary";
        if (counts.includes(2)) return "Para";

        return "High Card";
    }

    drawButton.addEventListener("click", () => {
        const bet = parseInt(betInput.value, 10);
        if (isNaN(bet) || bet <= 0) {
            resultDisplay.textContent = "something aint adding up here gimmie ur money";
            return;
        }

        if (!adjustBalance(-bet)) return;

        const hand = drawHand();
        handDisplay.textContent = hand.join(", ");
        const handResult = evaluateHand(hand);

        let winnings = 0;

        switch (handResult) {
            case "Poker Królewski":
                winnings = bet * 50;
                break;
            case "Strit":
                winnings = bet * 5;
                break;
            case "Kolor":
                winnings = bet * 7;
                break;
            case "Kareta":
                winnings = bet * 25;
                break;
            case "Full":
                winnings = bet * 10;
                break;
            case "Trójka":
                winnings = bet * 3;
                break;
            case "Dwie Pary":
                winnings = bet * 2;
                break;
            case "Para":
                winnings = bet * 1.5;
                break;
            default:
                winnings = 0; 
                break;
        }

        if (winnings > 0) {
            adjustBalance(winnings);
            resultDisplay.textContent = `U won ${handResult}. thats ${winnings} congrats.`;
        } else {
            resultDisplay.textContent = `U lost L bozo ${handResult}.`;
        }
    });
});

