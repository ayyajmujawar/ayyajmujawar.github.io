// Mobile Menu
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
menuToggle.addEventListener("click", () => navbar.classList.toggle("active"));

// Scroll Reveal
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Counter (Fixed)
const counters = document.querySelectorAll(".counter");
let started = false;

function animateCounter(counter, duration = 1500) {
    const target = +counter.dataset.target;
    const start = performance.now();

    function update(time) {
        const progress = Math.min((time - start) / duration, 1);
        counter.innerText = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(update);
        else counter.innerText = target;
    }
    requestAnimationFrame(update);
}

window.addEventListener("scroll", () => {
    const stats = document.getElementById("stats");
    if (stats.getBoundingClientRect().top < window.innerHeight - 100 && !started) {
        counters.forEach(c => animateCounter(c));
        started = true;
    }
});
