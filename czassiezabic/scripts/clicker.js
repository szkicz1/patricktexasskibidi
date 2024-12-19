document.addEventListener('DOMContentLoaded', () => {
    const clickerImage = document.getElementById('clicker-image');
    const clickerScoreElement = document.getElementById('clicker-score');
    let currentScore = 0;

    let clickerBonus = parseInt(localStorage.getItem('clickerBonus')) || 1;


    function updateClickerBonus(bonus) {
        clickerBonus += bonus;
        localStorage.setItem('clickerBonus', clickerBonus);
    }


    clickerImage.addEventListener('click', () => {
        currentScore += clickerBonus; 
        clickerScoreElement.textContent = currentScore;

        adjustBalance(clickerBonus);
    });

    window.updateClickerBonus = updateClickerBonus;
});
