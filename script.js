// ==========================================
// SKP OFFICIAL PORTFOLIO - JAVASCRIPT
// ==========================================


// ==========================================
// 1. LOADING SCREEN
// ==========================================

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 1000);
    }

});


// ==========================================
// 2. CURRENT YEAR
// ==========================================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ==========================================
// 3. MOBILE SIDEBAR
// ==========================================

const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const sidebarClose = document.getElementById("sidebarClose");

function openSidebar() {

    if (!sidebar || !overlay || !hamburger) return;

    sidebar.classList.add("open");
    overlay.classList.add("show");
    hamburger.classList.add("active");

    hamburger.setAttribute("aria-expanded", "true");

}

function closeSidebar() {

    if (!sidebar || !overlay || !hamburger) return;

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


// ==========================================
// 4. DARK MODE
// ==========================================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light");

        const icon = themeToggle.querySelector("i");

        if (icon) {

            if (document.body.classList.contains("light")) {
                icon.className = "bx bx-moon";
                localStorage.setItem("theme", "light");
            } else {
                icon.className = "bx bx-sun";
                localStorage.setItem("theme", "dark");
            }

        }

    });

}

if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light");

    if (themeToggle) {

        const icon = themeToggle.querySelector("i");

        if (icon) {
            icon.className = "bx bx-moon";
        }

    }

}


// ==========================================
// 5. COLOR PICKER
// ==========================================

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


// ==========================================
// 6. SKILLS DROPDOWN FILTER
// ==========================================

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


// ==========================================
// 7. NAVBAR ACTIVE LINKS
// ==========================================

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


// ==========================================
// 8. SCROLL REVEAL ANIMATION
// ==========================================

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


// ==========================================
// 9. SMOOTH SCROLL
// ==========================================

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


// ==========================================
// 10. CONTACT FORM - WEB3FORMS
// ==========================================

function initializeContactForm() {

    const contactForm = document.getElementById("contactForm");

    const submitBtn = document.getElementById("submitBtn");

    const formMessage = document.getElementById("formMessage");


    // Check HTML elements

    if (!contactForm || !submitBtn) {

        console.error("Contact Form elements not found!");

        return;

    }

    console.log("Contact Form Initialized Successfully!");


    contactForm.addEventListener("submit", async function (event) {

        // Stop page reload

        event.preventDefault();


        // Validate form

        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            return;

        }


        // Check SweetAlert2

        if (typeof Swal === "undefined") {

            alert("SweetAlert2 library is not loaded!");

            console.error("SweetAlert2 not found!");

            return;

        }


        // Get Access Key

        const accessKey = contactForm.querySelector(
            'input[name="access_key"]'
        );


        if (!accessKey || !accessKey.value.trim()) {

            Swal.fire({
                title: "Missing Access Key!",
                text: "Please configure your Web3Forms Access Key.",
                icon: "error"
            });

            return;

        }


        // Disable button

        submitBtn.disabled = true;

        submitBtn.innerHTML =
            'Sending... <i class="bx bx-loader-alt bx-spin"></i>';


        if (formMessage) {
            formMessage.style.display = "none";
        }


        try {

            // Collect form data

            const formData = new FormData(contactForm);


            // Send request to Web3Forms

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


            // Read API response

            const result = await response.json();

            console.log("Web3Forms Response:", result);


            // SUCCESS

            if (response.ok && result.success === true) {

                contactForm.reset();

                if (formMessage) {
                    formMessage.style.display = "none";
                }

                await Swal.fire({

                    title: "Good Job!",

                    text: "Your message has been sent successfully!",

                    icon: "success",

                    confirmButtonText: "Great!",

                    confirmButtonColor: "#6c63ff",

                    allowOutsideClick: false

                });

            }


            // API ERROR

            else {

                await Swal.fire({

                    title: "Message Failed!",

                    text: result.message || "Your message could not be sent.",

                    icon: "error",

                    confirmButtonText: "Try Again",

                    confirmButtonColor: "#d33"

                });

                console.error("Web3Forms API Error:", result);

            }

        }


        // NETWORK ERROR

        catch (error) {

            console.error("Contact Form Error:", error);

            await Swal.fire({

                title: "Network Error!",

                text: "Unable to connect to the server. Please check your internet connection.",

                icon: "error",

                confirmButtonText: "OK",

                confirmButtonColor: "#d33"

            });

        }


        // RESTORE BUTTON

        finally {

            submitBtn.disabled = false;

            submitBtn.innerHTML =
                'Submit Form <i class="bx bx-send"></i>';

        }

    });

}


// Initialize form after HTML loads

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeContactForm
    );

} else {

    initializeContactForm();

}


// ==========================================
// END OF JAVASCRIPT
// ==========================================
