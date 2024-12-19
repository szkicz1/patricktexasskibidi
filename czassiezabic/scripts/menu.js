
document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav__toggle");
    const navList = document.querySelector(".nav__list");

    navToggle.addEventListener("click", () => {
        navList.classList.toggle("nav__list--visible");
    });
});