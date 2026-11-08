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


// Close sidebar using Escape key

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeSidebar();
    }

});


// ==========================================
// 4. DARK MODE / LIGHT MODE
// ==========================================

const themeToggle = document.getElementById("themeToggle");


function updateThemeIcon() {

    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");

    if (!icon) return;

    if (document.body.classList.contains("light")) {

        icon.className = "bx bx-moon";

    } else {

        icon.className = "bx bx-sun";

    }

}


if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light");

        const currentTheme =
            document.body.classList.contains("light")
                ? "light"
                : "dark";

        localStorage.setItem("theme", currentTheme);

        updateThemeIcon();

    });

}


// LOAD SAVED THEME

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

} else {

    document.body.classList.remove("light");

}

updateThemeIcon();


// ==========================================
// 5. COLOR PICKER
// ==========================================

const colorPicker = document.getElementById("colorPicker");


if (colorPicker) {

    colorPicker.addEventListener("input", function () {

        const selectedColor = colorPicker.value;

        document.documentElement.style.setProperty(
            "--accent",
            selectedColor
        );

        localStorage.setItem("accentColor", selectedColor);

    });

}


// LOAD SAVED COLOR

const savedColor = localStorage.getItem("accentColor");

if (savedColor && /^#[0-9A-Fa-f]{6}$/.test(savedColor)) {

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

window.addEventListener("load", updateActiveLink);


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

} else {

    revealElements.forEach(element => {

        element.classList.add("visible");

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

                behavior: "smooth",

                block: "start"

            });

        }

    });

});


// ==========================================
// 10. HTML ESCAPE SECURITY
// ==========================================

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function (character) {

        const entities = {

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"

        };

        return entities[character];

    });

}


// ==========================================
// 11. CONTACT FORM - WEB3FORMS
// ==========================================

function initializeContactForm() {

    const contactForm = document.getElementById("contactForm");

    const submitBtn = document.getElementById("submitBtn");

    const formMessage = document.getElementById("formMessage");


    // CHECK FORM ELEMENTS

    if (!contactForm || !submitBtn) {

        console.error("Contact Form HTML elements not found!");

        return;

    }


    console.log("Contact Form Initialized Successfully!");


    let isSubmitting = false;


    // FORM SUBMISSION

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        event.stopPropagation();


        // PREVENT DOUBLE SUBMISSION

        if (isSubmitting) return;


        // FORM VALIDATION

        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            return;

        }


        // CHECK SWEETALERT2

        if (typeof Swal === "undefined") {

            alert("SweetAlert2 is not loaded. Please check your HTML.");

            console.error("SweetAlert2 library not found!");

            return;

        }


        // CHECK ACCESS KEY

        const accessKey = contactForm.querySelector(
            'input[name="access_key"]'
        );


        if (!accessKey || !accessKey.value.trim()) {

            Swal.fire({

                title: "Access Key Missing!",

                text: "Please configure your Web3Forms Access Key.",

                icon: "error"

            });

            return;

        }


        // GET VISITOR NAME

        const nameInput = contactForm.querySelector(
            '[name="name"]'
        );

        const visitorName = nameInput
            ? nameInput.value.trim()
            : "";


        if (!visitorName) {

            Swal.fire({

                title: "Name Required!",

                text: "Please enter your name.",

                icon: "warning"

            });

            return;

        }


        // START LOADING

        isSubmitting = true;

        submitBtn.disabled = true;

        submitBtn.innerHTML =
            'Sending... <i class="bx bx-loader-alt bx-spin"></i>';


        if (formMessage) {

            formMessage.style.display = "none";

        }


        try {

            // GET FORM DATA

            const formData = new FormData(contactForm);


            // WEB3FORMS API REQUEST

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


            // READ API RESPONSE

            const result = await response.json();


            console.log("Web3Forms Status:", response.status);

            console.log("Web3Forms Response:", result);


            // ==================================
            // SUCCESS RESPONSE
            // ==================================

            if (response.ok && result.success === true) {

                // RESET FORM

                contactForm.reset();


                // SUCCESS POPUP WITH DYNAMIC NAME

                await Swal.fire({

                    title: "Message Sent Successfully!",

                    html: `
                        <p>Thank you, <strong>${escapeHTML(visitorName)}</strong>!</p>
                        <p>Your message has been sent successfully.</p>
                        <p>I'll get back to you soon.</p>
                    `,

                    icon: "success",

                    confirmButtonText: "Great!",

                    confirmButtonColor: "#6c63ff",

                    allowOutsideClick: false,

                    allowEscapeKey: true

                });

            }


            // ==================================
            // API ERROR
            // ==================================

            else {

                console.error("Web3Forms Error:", result);

                await Swal.fire({

                    title: "Message Failed!",

                    text: result.message ||
                        "Your message could not be sent. Please try again.",

                    icon: "error",

                    confirmButtonText: "Try Again",

                    confirmButtonColor: "#d33"

                });

            }

        }


        // ==================================
        // NETWORK ERROR
        // ==================================

        catch (error) {

            console.error("Contact Form Error:", error);

            await Swal.fire({

                title: "Oops!",

                text: "Network error! Please check your internet connection and try again.",

                icon: "error",

                confirmButtonText: "OK",

                confirmButtonColor: "#d33"

            });

        }


        // ==================================
        // RESTORE SUBMIT BUTTON
        // ==================================

        finally {

            isSubmitting = false;

            submitBtn.disabled = false;

            submitBtn.innerHTML =
                'Submit Form <i class="bx bx-send"></i>';

        }

    });

}


// ==========================================
// 12. INITIALIZE CONTACT FORM
// ==========================================

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeContactForm
    );

} else {

    initializeContactForm();

}

// ==========================================
// MESSAGE CHARACTER COUNTER
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const messageInput = document.getElementById("message");

    const charCount = document.getElementById("charCount");

    if (!messageInput || !charCount) {

        console.error("Message or Character Counter not found!");

        return;

    }

    function updateCharacterCount() {

        const currentLength = messageInput.value.length;

        charCount.textContent = `${currentLength} / 1000`;

    }

    // Count while typing and deleting

    messageInput.addEventListener("input", updateCharacterCount);

    // Initial count

    updateCharacterCount();

});



// ==========================================
// END OF SKP OFFICIAL PORTFOLIO JAVASCRIPT
// ==========================================
