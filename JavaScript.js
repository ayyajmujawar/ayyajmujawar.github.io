const hamburger = document.getElementById("hamburger");

const navMenu = document.getElementById("navMenu");

const themeToggle = document.getElementById("themeToggle");

const header = document.querySelector("header");

const dropdownToggle = document.querySelector(".dropdown-toggle");

const dropdown = document.querySelector(".dropdown");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
        if (link.classList.contains("dropdown-toggle")) return;
        if (window.innerWidth <= 1024) {
            navMenu.classList.remove("active");
        }
    });
});

const savedTheme = localStorage.getItem("theme");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

function initScrollReveal({selector: selector, className: className, threshold: threshold}) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: threshold
    });
    elements.forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal({
        selector: ".about-visual, .card, .custom-box, .project, .contact-box, .project-card, .portfolio-right, .ecommerce-card, .ecommerce-feature, .design-tab, .design-preview",
        className: "revealed",
        threshold: .25
    });
    initScrollReveal({
        selector: ".about-content, .Services_word, .Why_Custom_Web_Design_word, .portfolio-left, .portfolio_word, .ecommerce_word, .ecommerce-intro, .design_word, .design-intro, .contact-info, .design-card, .design-demo-title",
        className: "reveal",
        threshold: .4
    });
});

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
});

window.addEventListener("load", () => {
    const btn = document.querySelector(".hire_btn_highlight");
    if (!btn) return;
    requestAnimationFrame(() => {
        btn.classList.add("animate");
    });
});

const portfolioBtns = document.querySelectorAll(".portfolio-nav");

const portfolioShows = document.querySelectorAll(".portfolio-show");

portfolioBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        portfolioBtns.forEach(b => b.classList.remove("active"));
        portfolioShows.forEach(s => s.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.target).classList.add("active");
    });
});

document.querySelectorAll(".carousel").forEach(carousel => {
    const images = JSON.parse(carousel.dataset.images);
    const img = carousel.querySelector("img");
    let index = 0;
    let interval;
    let startX = 0;
    let paused = false;
    const dotsWrap = document.createElement("div");
    dotsWrap.className = "carousel-dots";
    images.forEach((_, i) => {
        const dot = document.createElement("span");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            index = i;
            update();
        });
        dotsWrap.appendChild(dot);
    });
    carousel.after(dotsWrap);
    const dots = dotsWrap.querySelectorAll("span");
    function update() {
        carousel.classList.add("transition");
        setTimeout(() => {
            img.src = images[index];
            dots.forEach(d => d.classList.remove("active"));
            dots[index].classList.add("active");
            carousel.classList.remove("transition");
        }, 350);
    }
    function next() {
        index = (index + 1) % images.length;
        update();
    }
    interval = setInterval(() => {
        if (!paused) next();
    }, 3500);
    carousel.addEventListener("mouseenter", () => paused = true);
    carousel.addEventListener("mouseleave", () => paused = false);
    carousel.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });
    carousel.addEventListener("touchend", e => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) next(); else {
                index = (index - 1 + images.length) % images.length;
                update();
            }
        }
    });
});

const scriptURL = "https://script.google.com/macros/s/AKfycbyCxD1hEQHaFtrSN4fP38Dh_THobIg3CdgMhvxDfDM9ruFBfe2PV7wXUk4tnz3jdrKA/exec";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const $ = id => document.getElementById(id);

const emailStep = $("emailStep");

const continueBtn = $("continueBtn");

const emailOnly = $("emailOnly");

const consentCheckbox = $("consentCheckbox");

const otpStep = $("otpStep");

const otpInput = $("otpInput");

const verifyOtpBtn = $("verifyOtpBtn");

const form = $("contactForm");

const submitBtn = $("submitBtn");

const topStatus = $("formStatus");

const formStatusEl = $("formStatusForm");

const nameInput = $("name");

const emailInput = $("email");

const countrySelect = $("country");

const countryIsoInput = $("countryIso");

const mobileInput = $("mobile");

const companyInput = $("companyName");

const subjectInput = $("subject");

const messageInput = $("message");

const userIdInput = $("userId");

const isNewInput = $("isNewRequest");

const honeypot = $("company_honeypot");

const resetBtn = $("resetBtn");

if (continueBtn) {
    continueBtn.disabled = true;
}

consentCheckbox?.addEventListener("change", () => {
    continueBtn.disabled = !consentCheckbox.checked;
});

let userIp = "";

async function fetchClientIp() {
    try {
        const res = await fetch("https://api64.ipify.org?format=json");
        const data = await res.json();
        userIp = data.ip || "";
    } catch (err) {
        console.warn("IP fetch failed");
        userIp = "";
    }
}

let currentEmail = "";

let otpVerified = false;

let statusTarget = "otp";

let otpToken = "";

function setReadonly(el, state = true) {
    if (!el) return;
    el.readOnly = state;
    el.classList.toggle("locked", state);
}

function showSubmit(show = true) {
    if (!submitBtn) return;
    submitBtn.style.display = show ? "block" : "none";
}

function showStatus(msg = "", type = "") {
    if (topStatus) topStatus.style.display = "none";
    if (formStatusEl) formStatusEl.style.display = "none";
    if (!msg) return;
    const target = statusTarget === "form" && formStatusEl ? formStatusEl : topStatus;
    target.textContent = msg;
    target.className = `form-status ${type}`;
    target.style.display = "block";
}

async function checkEmail(email) {
    try {
        emailInput.value = email;
        const res = await fetch(scriptURL, {
            method: "POST",
            body: new URLSearchParams({
                mode: "checkEmail",
                email: email
            })
        });
        const data = await res.json();
        form.style.display = "block";
        if (resetBtn) resetBtn.style.display = "inline-block";
        statusTarget = "form";
        if (data.result === "exists") {
            nameInput.value = data.name || "";
            companyInput.value = data.companyName || "";
            userIdInput.value = data.userId || "";
            mobileInput.value = data.mobile || "";
            countryIsoInput.value = data.countryIso || "";
            const optionToSelect = Array.from(countrySelect.options).find(opt => opt.dataset.iso === data.countryIso);
            countrySelect.value = optionToSelect ? optionToSelect.value : "";
            setReadonly(nameInput, true);
            setReadonly(emailInput, true);
            setReadonly(companyInput, true);
            setReadonly(mobileInput, true);
            countrySelect.disabled = true;
            setReadonly(subjectInput, false);
            setReadonly(messageInput, false);
            showSubmit(true);
            isNewInput.value = "";
            showStatus("Existing email found. Only subject/message editable.", "info");
        } else {
            setReadonly(nameInput, false);
            setReadonly(emailInput, true);
            setReadonly(companyInput, false);
            setReadonly(mobileInput, false);
            countrySelect.disabled = false;
            setReadonly(subjectInput, false);
            setReadonly(messageInput, false);
            countryIsoInput.value = "";
            countrySelect.value = "";
            showSubmit(true);
            showStatus("New email. Fill all details.", "info");
        }
    } catch {
        showStatus("Connection error", "error");
    }
}

countrySelect.addEventListener("change", () => {
    const option = countrySelect.selectedOptions[0];
    if (!option) return;
    countryIsoInput.value = option.dataset.iso || "";
    mobileInput.classList.remove("error");
    showStatus("", "");
});

continueBtn?.addEventListener("click", async () => {
    const email = emailOnly.value.trim();
    if (!emailRegex.test(email)) return alert("Enter a valid email");
    if (!userIp) {
        await fetchClientIp();
    }
    continueBtn.disabled = true;
    continueBtn.textContent = "Sending OTP...";
    try {
        const res = await fetch(scriptURL, {
            method: "POST",
            body: new URLSearchParams({
                mode: "sendOtp",
                email: email,
                userIp: userIp,
                consent: consentCheckbox.checked ? "true" : "false"
            })
        });
        const data = await res.json();
        if (data.result === "sent") {
            currentEmail = email;
            $("otpEmailDisplay").textContent = email;
            emailStep.style.display = "none";
            otpStep.style.display = "block";
            otpInput.value = "";
            otpInput.focus();
            showStatus("OTP sent to your email.", "info");
        } else {
            showStatus(data.message || "Failed to send OTP", "error");
        }
    } catch {
        showStatus("Connection error", "error");
    } finally {
        continueBtn.disabled = false;
        continueBtn.textContent = "Continue";
    }
});

verifyOtpBtn?.addEventListener("click", async () => {
    const otp = otpInput.value.trim();
    if (!otp) return showStatus("Enter the OTP", "error");
    verifyOtpBtn.disabled = true;
    verifyOtpBtn.textContent = "Verifying...";
    try {
        const res = await fetch(scriptURL, {
            method: "POST",
            body: new URLSearchParams({
                mode: "verifyOtp",
                email: currentEmail,
                otp: otp,
                userIp: userIp
            })
        });
        const data = await res.json();
        if (data.result === "ok") {
            otpVerified = true;
            otpToken = data.token;
            otpStep.style.display = "none";
            statusTarget = "otp";
            showStatus("OTP verified. Loading form...", "info");
            await checkEmail(currentEmail);
        } else {
            showStatus("Invalid OTP", "error");
        }
    } catch {
        showStatus("Connection error", "error");
    } finally {
        verifyOtpBtn.disabled = false;
        verifyOtpBtn.textContent = "Verify OTP";
    }
});

form?.addEventListener("submit", async e => {
    e.preventDefault();
    if (!otpVerified) return showStatus("OTP verification required", "error");
    if (honeypot.value) return showStatus("Bot detected", "error");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    showStatus("Sending...", "info");
    try {
        const data = Object.fromEntries(new FormData(form));
        data.consent = consentCheckbox.checked ? "true" : "false";
        data.otpToken = otpToken;
        data.userIp = userIp;
        const res = await fetch(scriptURL, {
            method: "POST",
            body: new URLSearchParams(data)
        });
        const result = await res.json();
        if (result.result === "new") {
            showStatus(`✅ Success. ID: ${result.reqId}`, "success");
            resetAll();
        } else {
            showStatus(result.message || "Error", "error");
        }
    } catch {
        showStatus("Connection error", "error");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
    }
});

function resetAll() {
    if (resetBtn) resetBtn.style.display = "none";
    form.reset();
    form.style.display = "none";
    emailStep.style.display = "block";
    otpStep.style.display = "none";
    otpVerified = false;
    currentEmail = "";
    statusTarget = "otp";
    otpToken = "";
    countryIsoInput.value = "";
    countrySelect.value = "";
    showStatus("", "");
    if (consentCheckbox) consentCheckbox.checked = false;
    if (continueBtn) continueBtn.disabled = true;
}

if (resetBtn) {
    resetBtn.addEventListener("click", resetAll);
}

const stages = document.querySelectorAll(".stage");

const codeStage = document.querySelector(".stage-dev");

codeStage.innerHTML = `\n    <pre>\nconst buildApp = () => {\n  design();\n  develop();\n  test();\n  deploy();\n  optimize();\n}\n    </pre>\n  `;

let index = 0;

setInterval(() => {
    stages.forEach(stage => stage.classList.remove("active"));
    stages[index].classList.add("active");
    index = (index + 1) % stages.length;
}, 2e3);

const toggleBtn = document.getElementById("toggleBtn");

const hiddenContent = document.getElementById("hiddenContent");

const toggleIcon = document.getElementById("toggleIcon");

toggleBtn.addEventListener("click", () => {
    if (hiddenContent.classList.contains("show")) {
        hiddenContent.style.maxHeight = "0px";
        hiddenContent.classList.remove("show");
        toggleIcon.textContent = "➕";
    } else {
        hiddenContent.classList.add("show");
        hiddenContent.style.maxHeight = hiddenContent.scrollHeight + "px";
        toggleIcon.textContent = "➖";
    }
});

dropdownToggle.addEventListener("click", e => {
    if (window.innerWidth <= 1280) {
        e.preventDefault();
        dropdown.classList.toggle("active");
    }
});

document.addEventListener("click", e => {
    if (!e.target.closest(".dropdown")) {
        dropdown.classList.remove("active");
    }
});

document.querySelectorAll(".dropdown-menu a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".dropdown")?.classList.remove("active");
        document.getElementById("navMenu")?.classList.remove("active");
    });
});

let lastMode = window.innerWidth > 1280 ? "desktop" : "mobile";

window.addEventListener("resize", () => {
    const currentMode = window.innerWidth > 1280 ? "desktop" : "mobile";
    if (currentMode !== lastMode) {
        document.querySelector(".dropdown")?.classList.remove("active");
        document.getElementById("navMenu")?.classList.remove("active");
        lastMode = currentMode;
    }
});

const designTabs = document.querySelectorAll(".design-tab");

const designImage = document.getElementById("designPreviewImage");

const designImages = {
    flyersposters: "assets/images/design-flyer.png",
    story: "assets/images/design-poststory.png",
    logo: "assets/images/design-logo.png",
    thumb: "assets/images/design-thumbnail.png"
};

const tabKeys = Object.keys(designImages);

let currentIndex = 0;

let autoSwitchInterval;

function setActiveTab(key) {
    const newTab = document.querySelector(`.design-tab[data-target="${key}"]`);
    if (!newTab) return;
    document.querySelectorAll(".design-tab").forEach(tab => {
        tab.classList.remove("active");
    });
    newTab.classList.add("active");
    if (designImages[key]) {
        designImage.src = designImages[key];
    }
    currentIndex = tabKeys.indexOf(key);
}

designTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-target");
        if (!target) return;
        setActiveTab(target);
        restartAutoSwitch();
    });
});

function startAutoSwitch() {
    autoSwitchInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % tabKeys.length;
        setActiveTab(tabKeys[currentIndex]);
    }, 3e3);
}

function restartAutoSwitch() {
    clearInterval(autoSwitchInterval);
    startAutoSwitch();
}

if (designTabs.length > 0 && designImage) {
    const activeTab = document.querySelector(".design-tab.active");
    if (activeTab) {
        const key = activeTab.getAttribute("data-target");
        if (key) setActiveTab(key);
    } else {
        setActiveTab(tabKeys[0]);
    }
    startAutoSwitch();
}

async function updateCurrency() {
    try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await res.json();
        const rate = data.rates.INR;
        document.querySelectorAll(".usd").forEach(el => {
            const usd = parseFloat(el.dataset.usd);
            const inr = Math.round(usd * rate);
            const inrEl = el.parentElement.querySelector(".inr");
            if (inrEl) {
                inrEl.textContent = "₹" + inr.toLocaleString("en-IN");
            }
        });
    } catch (err) {
        console.log("Currency update failed", err);
    }
}

updateCurrency();




document.addEventListener("DOMContentLoaded", function () {
  const tooltip = document.getElementById("waTooltip");
  const button = document.getElementById("waButton");

  // Show tooltip after delay
  setTimeout(() => {
    tooltip.classList.add("show");
  }, 1500);

  // Hide tooltip after some time
  setTimeout(() => {
    tooltip.classList.remove("show");
  }, 6000);

  // Re-show tooltip on hover
  button.addEventListener("mouseenter", () => {
    tooltip.classList.add("show");
  });

  button.addEventListener("mouseleave", () => {
    tooltip.classList.remove("show");
  });
});
