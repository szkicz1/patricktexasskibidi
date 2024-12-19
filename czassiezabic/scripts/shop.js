document.addEventListener('DOMContentLoaded', () => {
    const shopItems = document.querySelectorAll('.shop__buy');

    shopItems.forEach((item) => {
        const itemId = item.dataset.id; 
        const isPurchased = localStorage.getItem(`shopItem-${itemId}`); 

        
        if (isPurchased) {
            item.disabled = true;
            item.textContent = 'Kupiono';
        }

        
        item.addEventListener('click', () => {
            const cost = parseInt(item.dataset.price); 
            const bonus = parseInt(item.dataset.bonus); 

            if (adjustBalance(-cost)) { 
                alert('Zakupiono przedmiot!');
                updateClickerBonus(bonus); 
                localStorage.setItem(`shopItem-${itemId}`, true); 
                item.disabled = true;
                item.textContent = 'Kupiono';
            } else {
                alert('Nie masz wystarczających środków!');
            }
        });
    });
});

