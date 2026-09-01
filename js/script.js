/* =========================================================
   SITE 8
   PART 4 - HEADER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const hamburgerButton =
        document.getElementById("hamburgerButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mobileDropdowns =
        document.querySelectorAll(
            ".mobile-menu .has-dropdown > .nav-link"
        );

    const themeButtons =
        document.querySelectorAll(".theme-toggle");

    const rtlButtons =
        document.querySelectorAll(".rtl-toggle");


    /* =====================================================
       HAMBURGER MENU
    ===================================================== */

    if (hamburgerButton && mobileMenu) {

        hamburgerButton.addEventListener("click", function (event) {

            event.stopPropagation();

            mobileMenu.classList.toggle("active");

            const isOpen =
                mobileMenu.classList.contains("active");

            hamburgerButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

    }


    /* =========================================================
   MOBILE DROPDOWNS
   HOME + SERVICES
========================================================= */

const mobileDropdownToggles = document.querySelectorAll(
    ".mobile-dropdown-toggle"
);

mobileDropdownToggles.forEach(function (toggle) {

    toggle.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        const parent = toggle.closest(
            ".mobile-has-dropdown"
        );

        if (!parent) return;

        const isOpen = parent.classList.contains("open");


        /* -----------------------------------------
           CLOSE OTHER DROPDOWNS
        ----------------------------------------- */

        document
            .querySelectorAll(".mobile-has-dropdown.open")
            .forEach(function (item) {

                if (item !== parent) {

                    item.classList.remove("open");

                    const otherToggle =
                        item.querySelector(
                            ".mobile-dropdown-toggle"
                        );

                    if (otherToggle) {

                        otherToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }

            });


        /* -----------------------------------------
           TOGGLE CURRENT DROPDOWN
        ----------------------------------------- */

        parent.classList.toggle(
            "open",
            !isOpen
        );


        toggle.setAttribute(
            "aria-expanded",
            !isOpen ? "true" : "false"
        );

    });

});
    /* =====================================================
       DARK MODE
    ===================================================== */

    function updateThemeIcons() {

        const darkMode =
            document.documentElement.classList.contains(
                "dark-mode"
            );


        themeButtons.forEach(function (button) {

            const icon =
                button.querySelector("i");

            const text =
                button.querySelector("span");


            if (darkMode) {

                if (icon) {

                    icon.className =
                        "fas fa-sun";

                }

                if (text) {

                    text.textContent =
                        "Light Mode";

                }

            } else {

                if (icon) {

                    icon.className =
                        "fas fa-moon";

                }

                if (text) {

                    text.textContent =
                        "Dark Mode";

                }

            }

        });

    }


    /* =====================================================
       THEME BUTTON CLICK
    ===================================================== */

    themeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                document.documentElement.classList.toggle(
                    "dark-mode"
                );


                /* -----------------------------------------
                   SAVE THEME
                ----------------------------------------- */

                const isDark =
                    document.documentElement.classList.contains(
                        "dark-mode"
                    );

                localStorage.setItem(
                    "siteTheme",
                    isDark ? "dark" : "light"
                );


                updateThemeIcons();

            }
        );

    });


    /* =====================================================
       LOAD SAVED THEME
    ===================================================== */

    const savedTheme =
        localStorage.getItem("siteTheme");


    if (savedTheme === "dark") {

        document.documentElement.classList.add(
            "dark-mode"
        );

    }


    updateThemeIcons();


    /* =====================================================
       RTL TOGGLE
    ===================================================== */

    rtlButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const currentDirection =
                    document.documentElement.getAttribute(
                        "dir"
                    );


                if (currentDirection === "rtl") {

                    document.documentElement.setAttribute(
                        "dir",
                        "ltr"
                    );

                    localStorage.setItem(
                        "siteDirection",
                        "ltr"
                    );

                } else {

                    document.documentElement.setAttribute(
                        "dir",
                        "rtl"
                    );

                    localStorage.setItem(
                        "siteDirection",
                        "rtl"
                    );

                }

            }
        );

    });


    /* =====================================================
       LOAD SAVED RTL
    ===================================================== */

    const savedDirection =
        localStorage.getItem("siteDirection");


    if (savedDirection) {

        document.documentElement.setAttribute(
            "dir",
            savedDirection
        );

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                mobileMenu &&
                hamburgerButton &&
                mobileMenu.classList.contains("active") &&
                !mobileMenu.contains(event.target) &&
                !hamburgerButton.contains(event.target)
            ) {

                mobileMenu.classList.remove(
                    "active"
                );


                hamburgerButton.setAttribute(
                    "aria-expanded",
                    "false"
                );


                /* Close dropdowns */

                document
                    .querySelectorAll(
                        ".mobile-menu .has-dropdown.open"
                    )
                    .forEach(function (item) {

                        item.classList.remove("open");

                    });

            }

        }
    );


    /* =====================================================
       CLOSE MENU AFTER NORMAL LINK CLICK
    ===================================================== */

    const normalMobileLinks =
        document.querySelectorAll(
            ".mobile-menu .nav-item:not(.has-dropdown) .nav-link"
        );


    normalMobileLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (mobileMenu) {

                    mobileMenu.classList.remove(
                        "active"
                    );

                }

            }
        );

    });


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (mobileMenu) {

                    mobileMenu.classList.remove(
                        "active"
                    );

                }


                document
                    .querySelectorAll(
                        ".mobile-menu .has-dropdown.open"
                    )
                    .forEach(function (item) {

                        item.classList.remove(
                            "open"
                        );

                    });

            }

        }
    );


    /* =====================================================
       RESET MOBILE MENU WHEN RETURNING TO DESKTOP
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 1024 &&
                mobileMenu
            ) {

                mobileMenu.classList.remove(
                    "active"
                );


                document
                    .querySelectorAll(
                        ".mobile-menu .has-dropdown.open"
                    )
                    .forEach(function (item) {

                        item.classList.remove(
                            "open"
                        );

                    });

            }

        }
    );

});


/****home1 -hero*****/

/* =========================================================
   HOME 1 - HERO SLIDER
   2 SLIDES | AUTO SLIDE | NO PREV / NEXT BUTTONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const heroSlides = document.querySelectorAll(".hero-slide");
    const heroIndicators = document.querySelectorAll(".hero-indicator");

    if (!heroSlides.length) return;

    let currentSlide = 0;
    let heroTimer;


    /* =====================================================
       SHOW SLIDE
    ===================================================== */

    function showHeroSlide(index) {

        heroSlides.forEach(function (slide, i) {

            slide.classList.toggle(
                "active",
                i === index
            );

        });


        heroIndicators.forEach(function (indicator, i) {

            indicator.classList.toggle(
                "active",
                i === index
            );

        });


        currentSlide = index;
    }


    /* =====================================================
       NEXT SLIDE
    ===================================================== */

    function nextHeroSlide() {

        const nextSlide =
            (currentSlide + 1) % heroSlides.length;

        showHeroSlide(nextSlide);
    }


    /* =====================================================
       START AUTO SLIDE
    ===================================================== */

    function startHeroSlider() {

        clearInterval(heroTimer);

        heroTimer = setInterval(
            nextHeroSlide,
            5000
        );
    }


    /* =====================================================
       INDICATOR CLICK
    ===================================================== */

    heroIndicators.forEach(function (indicator, index) {

        indicator.addEventListener(
            "click",
            function () {

                showHeroSlide(index);

                startHeroSlider();

            }
        );

    });


    /* =====================================================
       INITIAL SLIDE
    ===================================================== */

    showHeroSlide(0);

    startHeroSlider();


    /* =====================================================
       PAUSE WHEN TAB IS NOT VISIBLE
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (document.hidden) {

                clearInterval(heroTimer);

            } else {

                startHeroSlider();

            }

        }
    );

});




/****HOME2 ********/

/* =========================================================
   HOME 2 - FAQ ACCORDION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(
        ".home2-faq-item"
    );

    faqItems.forEach(function (item) {

        const question = item.querySelector(
            ".home2-faq-question"
        );

        question.addEventListener("click", function () {

            const isActive = item.classList.contains("active");


            /* Close all other FAQ items */

            faqItems.forEach(function (otherItem) {

                otherItem.classList.remove("active");

                const otherQuestion =
                    otherItem.querySelector(
                        ".home2-faq-question"
                    );

                otherQuestion.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });


            /* Open selected item */

            if (!isActive) {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });

});

/* =========================================================
   GLOBAL THEME CONTROLLER
   DARK MODE + RTL
   Shared across ALL pages
========================================================= */

(function () {

    /* =====================================================
       GET SAVED SETTINGS
    ===================================================== */

    const savedDarkMode =
        localStorage.getItem("darkMode") === "true";

    const savedRTL =
        localStorage.getItem("rtlMode") === "true";


    /* =====================================================
       APPLY DARK MODE IMMEDIATELY
    ===================================================== */

    if (savedDarkMode) {
        document.documentElement.classList.add("dark-mode");
    } else {
        document.documentElement.classList.remove("dark-mode");
    }


    /* =====================================================
       APPLY RTL IMMEDIATELY
    ===================================================== */

    document.documentElement.setAttribute(
        "dir",
        savedRTL ? "rtl" : "ltr"
    );


    /* =====================================================
       WAIT FOR PAGE
    ===================================================== */

    document.addEventListener("DOMContentLoaded", function () {

        /* -------------------------------------------------
           FIND DARK MODE BUTTONS
           Works with your different pages
        ------------------------------------------------- */

        const darkButtons = document.querySelectorAll(
            "#careDarkModeBtn, #darkModeBtn, .dark-mode-btn"
        );


        /* -------------------------------------------------
           FIND RTL BUTTONS
        ------------------------------------------------- */

        const rtlButtons = document.querySelectorAll(
            "#careRtlBtn, #rtlBtn, .rtl-btn"
        );


        /* =================================================
           UPDATE DARK MODE BUTTON
        ================================================= */

        function updateDarkButtons() {

            const isDark =
                document.documentElement.classList.contains(
                    "dark-mode"
                );

            darkButtons.forEach(function (button) {

                button.classList.toggle(
                    "active",
                    isDark
                );

                const icon =
                    button.querySelector("i");

                if (icon) {

                    icon.className = isDark
                        ? "fas fa-sun"
                        : "fas fa-moon";
                }

            });
        }


        /* =================================================
           UPDATE RTL BUTTON
        ================================================= */

        function updateRTLButtons() {

            const isRTL =
                document.documentElement.getAttribute(
                    "dir"
                ) === "rtl";

            rtlButtons.forEach(function (button) {

                button.classList.toggle(
                    "active",
                    isRTL
                );

                const icon =
                    button.querySelector("i");

                if (icon) {

                    icon.className = isRTL
                        ? "fas fa-align-left"
                        : "fas fa-align-right";
                }

            });
        }


        /* =================================================
           APPLY INITIAL BUTTON STATE
        ================================================= */

        updateDarkButtons();
        updateRTLButtons();


        /* =================================================
           DARK MODE BUTTON
        ================================================= */

        darkButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const isDark =
                        !document.documentElement.classList.contains(
                            "dark-mode"
                        );


                    /* Apply */

                    document.documentElement.classList.toggle(
                        "dark-mode",
                        isDark
                    );


                    /* Save globally */

                    localStorage.setItem(
                        "darkMode",
                        isDark
                    );


                    /* Update button */

                    updateDarkButtons();

                }
            );

        });


        /* =================================================
           RTL BUTTON
        ================================================= */

        rtlButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const isRTL =
                        document.documentElement.getAttribute(
                            "dir"
                        ) !== "rtl";


                    /* Apply */

                    document.documentElement.setAttribute(
                        "dir",
                        isRTL ? "rtl" : "ltr"
                    );


                    /* Save globally */

                    localStorage.setItem(
                        "rtlMode",
                        isRTL
                    );


                    /* Update button */

                    updateRTLButtons();

                }
            );

        });

    });

})();


/* =========================================================
   SCROLL TO TOP
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const scrollTop = document.getElementById("scrollTop");

    if (!scrollTop) return;


    /* =====================================================
       SHOW / HIDE BUTTON
    ===================================================== */

    function toggleScrollTop() {

        if (window.scrollY > 300) {
            scrollTop.classList.add("show");
        } else {
            scrollTop.classList.remove("show");
        }

    }


    /* =====================================================
       SCROLL EVENT
    ===================================================== */

    window.addEventListener(
        "scroll",
        toggleScrollTop,
        { passive: true }
    );


    /* =====================================================
       CLICK → SCROLL TO TOP
    ===================================================== */

    scrollTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       INITIAL CHECK
    ===================================================== */

    toggleScrollTop();

});