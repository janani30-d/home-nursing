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
   GLOBAL THEME + RTL SYNC
   Keeps header, login, register and Get Care Now controls matched.
========================================================= */

(function () {

    const html = document.documentElement;

    const themeKeys = [
        "siteTheme",
        "theme"
    ];

    const directionKeys = [
        "siteDirection",
        "direction"
    ];

    const oldDarkModeKey = "darkMode";
    const oldRtlModeKey = "rtlMode";

    const themeSelector =
        ".theme-toggle, #authDarkModeBtn, #careDarkModeBtn";

    const rtlSelector =
        ".rtl-toggle, #authRtlBtn, #careRtlBtn";


    function getSavedTheme() {

        const siteTheme =
            localStorage.getItem("siteTheme");

        const authTheme =
            localStorage.getItem("theme");

        const oldDarkMode =
            localStorage.getItem(oldDarkModeKey);

        if (siteTheme === "dark" || siteTheme === "light") {
            return siteTheme;
        }

        if (authTheme === "dark" || authTheme === "light") {
            return authTheme;
        }

        if (oldDarkMode === "true") {
            return "dark";
        }

        if (oldDarkMode === "false") {
            return "light";
        }

        return html.classList.contains("dark-mode")
            ? "dark"
            : "light";
    }


    function getSavedDirection() {

        const siteDirection =
            localStorage.getItem("siteDirection");

        const authDirection =
            localStorage.getItem("direction");

        const oldRtlMode =
            localStorage.getItem(oldRtlModeKey);

        if (siteDirection === "rtl" || siteDirection === "ltr") {
            return siteDirection;
        }

        if (authDirection === "rtl" || authDirection === "ltr") {
            return authDirection;
        }

        if (oldRtlMode === "true") {
            return "rtl";
        }

        if (oldRtlMode === "false") {
            return "ltr";
        }

        return html.getAttribute("dir") === "rtl"
            ? "rtl"
            : "ltr";
    }


    function saveTheme(theme) {

        themeKeys.forEach(function (key) {
            localStorage.setItem(key, theme);
        });

        localStorage.setItem(
            oldDarkModeKey,
            theme === "dark" ? "true" : "false"
        );
    }


    function saveDirection(direction) {

        directionKeys.forEach(function (key) {
            localStorage.setItem(key, direction);
        });

        localStorage.setItem(
            oldRtlModeKey,
            direction === "rtl" ? "true" : "false"
        );
    }


    function updateThemeButtons(isDark) {

        document
            .querySelectorAll(themeSelector)
            .forEach(function (button) {

                const icon = button.querySelector("i");
                const text = button.querySelector("span");

                button.classList.toggle("active", isDark);

                button.setAttribute(
                    "aria-label",
                    isDark
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                );

                button.setAttribute(
                    "title",
                    isDark ? "Light mode" : "Dark mode"
                );

                if (icon) {
                    icon.className = isDark
                        ? "fas fa-sun"
                        : "fas fa-moon";
                }

                if (text) {
                    text.textContent = isDark
                        ? "Light Mode"
                        : "Dark Mode";
                }
            });
    }


    function updateRtlButtons(isRtl) {

        document
            .querySelectorAll(rtlSelector)
            .forEach(function (button) {

                const icon = button.querySelector("i");

                button.classList.toggle("active", isRtl);

                button.setAttribute(
                    "aria-label",
                    isRtl
                        ? "Switch to LTR mode"
                        : "Switch to RTL mode"
                );

                button.setAttribute(
                    "title",
                    isRtl ? "LTR mode" : "RTL mode"
                );

                if (icon) {
                    icon.className = isRtl
                        ? "fas fa-align-left"
                        : "fas fa-align-right";
                }
            });
    }


    function applyTheme(theme) {

        const isDark = theme === "dark";

        html.classList.toggle("dark-mode", isDark);
        saveTheme(theme);
        updateThemeButtons(isDark);
    }


    function applyDirection(direction) {

        const isRtl = direction === "rtl";

        html.setAttribute("dir", isRtl ? "rtl" : "ltr");
        saveDirection(isRtl ? "rtl" : "ltr");
        updateRtlButtons(isRtl);
    }


    function syncSavedControls() {

        applyTheme(getSavedTheme());
        applyDirection(getSavedDirection());
    }


    function handleSyncedControlClick(event) {

        const clickedElement =
            event.target;

        if (!clickedElement || !clickedElement.closest) return;

        const themeButton =
            clickedElement.closest(themeSelector);

        const rtlButton =
            clickedElement.closest(rtlSelector);

        if (!themeButton && !rtlButton) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        if (themeButton) {

            applyTheme(
                html.classList.contains("dark-mode")
                    ? "light"
                    : "dark"
            );

            return;
        }

        applyDirection(
            html.getAttribute("dir") === "rtl"
                ? "ltr"
                : "rtl"
        );
    }


    document.addEventListener(
        "click",
        handleSyncedControlClick,
        true
    );

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            syncSavedControls
        );

    } else {

        syncSavedControls();
    }

})();




/* =========================================================
   SCROLL TO TOP BUTTON
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const scrollTopBtn = document.getElementById("scrollTop");

    if (!scrollTopBtn) {
        return;
    }


    /* =====================================================
       SHOW / HIDE BUTTON
    ===================================================== */

    function toggleScrollTop() {

        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }

    }


    /* =====================================================
       SCROLL EVENT
    ===================================================== */

    window.addEventListener("scroll", toggleScrollTop);


    /* =====================================================
       INITIAL CHECK
    ===================================================== */

    toggleScrollTop();


    /* =====================================================
       SCROLL TO TOP
    ===================================================== */

    scrollTopBtn.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});