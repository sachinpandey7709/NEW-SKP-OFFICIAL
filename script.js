// ==============================
// LOADING SCREEN
// ==============================

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 1000);
    }

});


// ==============================
// CURRENT YEAR
// ==============================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ==============================
// MOBILE SIDEBAR
// ==============================

const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const sidebarClose = document.getElementById("sidebarClose");

function openSidebar() {

    sidebar.classList.add("open");
    overlay.classList.add("show");
    hamburger.classList.add("active");

    hamburger.setAttribute("aria-expanded", "true");

}

function closeSidebar() {

    sidebar.classList.remove("open");
    overlay.classList.remove("show");
    hamburger.classList.remove("active");

    hamburger.setAttribute("aria-expanded", "false");

}

if (hamburger && sidebar && overlay && sidebarClose) {

    hamburger.addEventListener("click", openSidebar);
    sidebarClose.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);

    document.querySelectorAll(".sidebar a").forEach(link => {
        link.addEventListener("click", closeSidebar);
    });

}


// ==============================
// DARK MODE TOGGLE
// ==============================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light");

        const icon = themeToggle.querySelector("i");

        if (document.body.classList.contains("light")) {

            icon.className = "bx bx-moon";
            localStorage.setItem("theme", "light");

        } else {

            icon.className = "bx bx-sun";
            localStorage.setItem("theme", "dark");

        }

    });

}


// LOAD SAVED THEME

if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light");

    if (themeToggle) {
        themeToggle.querySelector("i").className = "bx bx-moon";
    }

}


// ==============================
// COLOR PICKER
// ==============================

const colorPicker = document.getElementById("colorPicker");

if (colorPicker) {

    colorPicker.addEventListener("input", function () {

        document.documentElement.style.setProperty(
            "--accent",
            colorPicker.value
        );

        localStorage.setItem("accentColor", colorPicker.value);

    });

}


// LOAD SAVED COLOR

const savedColor = localStorage.getItem("accentColor");

if (savedColor) {

    document.documentElement.style.setProperty(
        "--accent",
        savedColor
    );

    if (colorPicker) {
        colorPicker.value = savedColor;
    }

}


// ==============================
// SKILLS DROPDOWN FILTER
// ==============================

const skillFilter = document.getElementById("skillFilter");

const skillCards = document.querySelectorAll(".skill-card");

if (skillFilter) {

    skillFilter.addEventListener("change", function () {

        const selected = skillFilter.value;

        skillCards.forEach(card => {

            const category = card.dataset.category;

            if (selected === "all" || selected === category) {

                card.classList.remove("hide");

            } else {

                card.classList.add("hide");

            }

        });

    });

}


// ==============================
// NAVBAR ACTIVE LINKS
// ==============================

const sections = document.querySelectorAll("main section");

const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveLink() {

    let current = "home";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveLink);


// ==============================
// SCROLL REVEAL ANIMATION
// ==============================

const revealElements = document.querySelectorAll(
    ".section, .info-card, .skill-card, .service-card, .project-card"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {

        element.classList.add("reveal");
        observer.observe(element);

    });

}


// ==============================
// SMOOTH SCROLL
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const href = this.getAttribute("href");

        if (href === "#") return;

        const target = document.querySelector(href);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ======================================
// CONTACT FORM - WEB3FORMS
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    const submitBtn = document.getElementById("submitBtn");

    if (!contactForm || !formMessage || !submitBtn) {
        console.error("Contact form elements not found!");
        return;
    }

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML =
            'Sending... <i class="bx bx-loader-alt bx-spin"></i>';

        formMessage.style.display = "block";
        formMessage.className = "form-message";
        formMessage.textContent = "Sending your message...";

        try {

            const formData = new FormData(contactForm);

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            const result = await response.json();

            console.log("Web3Forms Response:", result);

            if (response.ok && result.success) {

                formMessage.className = "form-message success";

                formMessage.innerHTML = `
                    <i class="bx bx-check-circle"></i>
                    Message Sent Successfully!
                    Thank you for contacting me.
                `;

                contactForm.reset();

            } else {

                formMessage.className = "form-message error";

                formMessage.textContent =
                    result.message || "Message sending failed.";

                console.error("Web3Forms Error:", result);

            }

        } catch (error) {

            formMessage.className = "form-message error";

            formMessage.textContent =
                "Network error! Please check your internet connection and try again.";

            console.error("Contact Form Error:", error);

        } finally {

            submitBtn.disabled = false;

            submitBtn.innerHTML =
                'Submit Form <i class="bx bx-send"></i>';

        }

    });

});
