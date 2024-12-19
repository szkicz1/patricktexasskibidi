document.addEventListener("DOMContentLoaded", () => {
    const balanceDisplay = document.getElementById("global-balance");

    function loadBalance() {
        const storedBalance = localStorage.getItem("casino-balance");
        if (storedBalance !== null) {
            return parseInt(storedBalance, 10);
        } else {

            const initialBalance = 1000;
            localStorage.setItem("casino-balance", initialBalance);
            return initialBalance;
        }
    }


    function saveBalance(newBalance) {
        localStorage.setItem("casino-balance", newBalance);
    }

    function adjustBalance(amount) {
        const currentBalance = loadBalance();
        const newBalance = currentBalance + amount;

        if (newBalance < 0) {
            alert("Nie masz wystarczających środków!");
            return false;
        }

        saveBalance(newBalance);
        balanceDisplay.textContent = newBalance;
        return true;
    }


    balanceDisplay.textContent = loadBalance();


    window.adjustBalance = adjustBalance;
});


document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-button");
    const menuPopup = document.getElementById("menu-popup");
    const menuClose = document.getElementById("menu-close");


    menuButton.addEventListener("click", () => {
        menuPopup.classList.add("menu-popup--visible");
    });

    menuClose.addEventListener("click", () => {
        menuPopup.classList.remove("menu-popup--visible");
    });

    menuPopup.addEventListener("click", (e) => {
        if (e.target === menuPopup) {
            menuPopup.classList.remove("menu-popup--visible");
        }
    });
});