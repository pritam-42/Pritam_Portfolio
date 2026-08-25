// ============================================================
// PRITAM DEBNATH PORTFOLIO
// Main JavaScript
// ============================================================

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* ========================================================
       HELPERS
    ======================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    /* ========================================================
       PAGE LOADER
    ======================================================== */

    const pageLoader = $("#page-loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            pageLoader?.classList.add("loaded");

        }, 500);

    });


    /* ========================================================
       CURRENT YEAR
    ======================================================== */

    const currentYear = $("#current-year");

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* ========================================================
       HEADER SCROLL EFFECT
    ======================================================== */

    const header = $("#site-header");

    const updateHeader = () => {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );

    };

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* ========================================================
       MOBILE MENU
    ======================================================== */

    const menuToggle = $("#menu-toggle");
    const navigation = $("#main-navigation");

    const closeMobileMenu = () => {

        if (!menuToggle || !navigation) return;

        menuToggle.classList.remove("active");

        navigation.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");
    };

    menuToggle?.addEventListener("click", () => {

        const isOpen =
            navigation.classList.toggle("open");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });

    $$(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            closeMobileMenu();

        });

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {
            closeMobileMenu();
        }

    });


    /* ========================================================
       SMOOTH SCROLL
    ======================================================== */

    $$("[data-scroll-target]").forEach(button => {

        button.addEventListener("click", event => {

            const targetId =
                button.dataset.scrollTarget;

            const target =
                document.getElementById(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth",
                block: "start"
            });

        });

    });

    $$(".nav-link").forEach(link => {

        link.addEventListener("click", event => {

            const href =
                link.getAttribute("href");

            if (!href?.startsWith("#")) return;

            const target =
                document.querySelector(href);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth"
            });

        });

    });


    /* ========================================================
       ACTIVE NAVIGATION
    ======================================================== */

    const sections = $$(
        "main section[data-section-id]"
    );

    const navLinks =
        $$(".nav-link[data-section]");

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentSection =
                        entry.target.dataset.sectionId;

                    navLinks.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.dataset.section ===
                                currentSection
                        );

                    });

                });

            },
            {
                threshold: 0.35,
                rootMargin: "-20% 0px -55% 0px"
            }
        );

    sections.forEach(section => {

        sectionObserver.observe(section);

    });


    /* ========================================================
       DYNAMIC GREETING
    ======================================================== */

    const greeting = $("#dynamic-greeting");

    if (greeting) {

        const hour =
            new Date().getHours();

        let message = "Hello, I'm";

        if (hour >= 5 && hour < 12) {
            message = "Good morning, I'm";
        } else if (hour >= 12 && hour < 17) {
            message = "Good afternoon, I'm";
        } else if (hour >= 17 && hour < 22) {
            message = "Good evening, I'm";
        } else {
            message = "Hello, I'm";
        }

        greeting.innerHTML = `
            <span class="status-dot"></span>
            ${message}
        `;

    }


    /* ========================================================
       TYPING EFFECT
    ======================================================== */

    const typingElement =
        $("#typing-role");

    if (typingElement && !prefersReducedMotion) {

        let roles = [];

        try {

            roles =
                JSON.parse(
                    typingElement.dataset.roles || "[]"
                );

        } catch (error) {

            roles = [
                "Developer",
                "Programmer",
                "Problem Solver"
            ];

        }

        if (!roles.length) {
            roles = ["Developer"];
        }

        let roleIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        const typingSpeed = 90;
        const deletingSpeed = 45;
        const pauseAfterTyping = 1500;
        const pauseAfterDeleting = 450;

        const typeRole = () => {

            const currentRole =
                roles[roleIndex];

            if (!deleting) {

                characterIndex++;

                typingElement.textContent =
                    currentRole.slice(
                        0,
                        characterIndex
                    );

                if (
                    characterIndex ===
                    currentRole.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeRole,
                        pauseAfterTyping
                    );

                    return;
                }

                setTimeout(
                    typeRole,
                    typingSpeed
                );

            } else {

                characterIndex--;

                typingElement.textContent =
                    currentRole.slice(
                        0,
                        characterIndex
                    );

                if (characterIndex === 0) {

                    deleting = false;

                    roleIndex =
                        (roleIndex + 1) %
                        roles.length;

                    setTimeout(
                        typeRole,
                        pauseAfterDeleting
                    );

                    return;
                }

                setTimeout(
                    typeRole,
                    deletingSpeed
                );

            }

        };

        typingElement.textContent = "";

        typeRole();

    }


    /* ========================================================
       CURSOR GLOW
    ======================================================== */
    

    /* ========================================================
   INTERACTIVE CURSOR
======================================================== */

const cursorDot = $("#cursor-dot");
const cursorRing = $("#cursor-ring");
const cursorGlow = $("#cursor-glow");
const cursorTrail = $("#cursor-trail");

const finePointer =
    window.matchMedia("(pointer: fine)").matches;

if (
    finePointer &&
    !prefersReducedMotion &&
    cursorDot &&
    cursorRing
) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let dotX = mouseX;
    let dotY = mouseY;

    let ringX = mouseX;
    let ringY = mouseY;

    let glowX = mouseX;
    let glowY = mouseY;

    let trailX = mouseX;
    let trailY = mouseY;


    /* Mouse position */
    window.addEventListener(
        "pointermove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            if (cursorTrail) {
                cursorTrail.style.opacity = "1";
            }

        },
        { passive: true }
    );


    /* Animation */
    const animateCursor = () => {

        /* Dot follows quickly */
        dotX +=
            (mouseX - dotX) * 0.35;

        dotY +=
            (mouseY - dotY) * 0.35;


        /* Ring follows smoothly */
        ringX +=
            (mouseX - ringX) * 0.16;

        ringY +=
            (mouseY - ringY) * 0.16;


        /* Large glow follows slower */
        glowX +=
            (mouseX - glowX) * 0.08;

        glowY +=
            (mouseY - glowY) * 0.08;


        /* Trail */
        trailX +=
            (mouseX - trailX) * 0.06;

        trailY +=
            (mouseY - trailY) * 0.06;


        cursorDot.style.left =
            `${dotX}px`;

        cursorDot.style.top =
            `${dotY}px`;


        cursorRing.style.left =
            `${ringX}px`;

        cursorRing.style.top =
            `${ringY}px`;


        if (cursorGlow) {

            cursorGlow.style.left =
                `${glowX}px`;

            cursorGlow.style.top =
                `${glowY}px`;

        }


        if (cursorTrail) {

            cursorTrail.style.left =
                `${trailX}px`;

            cursorTrail.style.top =
                `${trailY}px`;

        }


        requestAnimationFrame(
            animateCursor
        );

    };


    animateCursor();


    /* =====================================================
       HOVER EFFECT
    ====================================================== */

    const interactiveElements =
        $$(
            "a, button, input, " +
            ".project-card, " +
            ".skill-card, " +
            ".about-card, " +
            ".timeline-content, " +
            ".profile-card"
        );


    interactiveElements.forEach(
        element => {

            element.addEventListener(
                "pointerenter",
                () => {

                    document.body.classList.add(
                        "cursor-hover"
                    );

                }
            );


            element.addEventListener(
                "pointerleave",
                () => {

                    document.body.classList.remove(
                        "cursor-hover"
                    );

                }
            );

        }
    );


    /* =====================================================
       CLICK EFFECT
    ====================================================== */

    window.addEventListener(
        "pointerdown",
        () => {

            document.body.classList.add(
                "cursor-click"
            );

        }
    );


    window.addEventListener(
        "pointerup",
        () => {

            document.body.classList.remove(
                "cursor-click"
            );

        }
    );


    /* =====================================================
       LEAVE SCREEN
    ====================================================== */

    document.addEventListener(
        "mouseleave",
        () => {

            if (cursorDot) {
                cursorDot.style.opacity = "0";
            }

            if (cursorRing) {
                cursorRing.style.opacity = "0";
            }

            if (cursorGlow) {
                cursorGlow.style.opacity = "0";
            }

            if (cursorTrail) {
                cursorTrail.style.opacity = "0";
            }

        }
    );


    document.addEventListener(
        "mouseenter",
        () => {

            if (cursorDot) {
                cursorDot.style.opacity = "1";
            }

            if (cursorRing) {
                cursorRing.style.opacity = "1";
            }

            if (cursorGlow) {
                cursorGlow.style.opacity = "1";
            }

        }
    );

}

    /* ========================================================
       SCROLL REVEAL
    ======================================================== */

    const revealElements =
        $$("[data-reveal]");

    if (prefersReducedMotion) {

        revealElements.forEach(element => {

            element.classList.add("revealed");

        });

    } else {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "revealed"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );

        revealElements.forEach((element, index) => {

            element.style.transitionDelay =
                `${Math.min(index * 0.06, 0.35)}s`;

            revealObserver.observe(element);

        });

    }


    /* ========================================================
       3D PROFILE TILT
    ======================================================== */

    const tiltElements =
        $$("[data-tilt]");

    if (
        !prefersReducedMotion &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        tiltElements.forEach(element => {

            element.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        element.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const rotateX =
                        ((y / rect.height) - 0.5) * -8;

                    const rotateY =
                        ((x / rect.width) - 0.5) * 10;

                    element.style.transform =
                        `
                        perspective(1000px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-5px)
                        `;
                }
            );

            element.addEventListener(
                "pointerleave",
                () => {

                    element.style.transform = "";

                }
            );

        });

    }


    /* ========================================================
       MAGNETIC BUTTONS
    ======================================================== */

    const magneticElements =
        $$(".magnetic");

    if (
        !prefersReducedMotion &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        magneticElements.forEach(element => {

            element.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        element.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    element.style.transform =
                        `
                        translate(
                            ${x * 0.12}px,
                            ${y * 0.12}px
                        )
                        translateY(-4px)
                        `;
                }
            );

            element.addEventListener(
                "pointerleave",
                () => {

                    element.style.transform = "";

                }
            );

        });

    }


    /* ========================================================
       PROJECT FILTER
    ======================================================== */

    const filterButtons =
        $$(".filter-button");

    const projectCards =
        $$(".project-card[data-project-card]");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter;

            filterButtons.forEach(item => {

                item.classList.toggle(
                    "active",
                    item === button
                );

            });

            projectCards.forEach(card => {

                const category =
                    card.dataset.category;

                const shouldShow =
                    filter === "all" ||
                    category === filter;

                if (shouldShow) {

                    card.classList.remove("hidden");

                    requestAnimationFrame(() => {

                        card.animate(
                            [
                                {
                                    opacity: 0,
                                    transform:
                                        "translateY(15px)"
                                },
                                {
                                    opacity: 1,
                                    transform:
                                        "translateY(0)"
                                }
                            ],
                            {
                                duration: 350,
                                easing:
                                    "cubic-bezier(.22,1,.36,1)"
                            }
                        );

                    });

                } else {

                    card.classList.add("hidden");

                }

            });

        });

    });


    /* ========================================================
       ADD PROJECT BUTTON
    ======================================================== */

    const addProjectButton =
        $("#add-project");

    const projectsGrid =
        $("#projects-grid");

    let projectCount =
        projectCards.length;

    addProjectButton?.addEventListener(
        "click",
        () => {

            projectCount++;

            const project =
                document.createElement("article");

            project.className =
                "project-card glass-panel";

            project.dataset.projectCard =
                "true";

            project.dataset.category =
                "web";

            project.dataset.projectId =
                `project-${String(projectCount).padStart(2, "0")}`;

            project.innerHTML = `
                <div class="project-image">

                    <div class="project-placeholder">
                        <i class="fa-solid fa-folder-plus"></i>
                    </div>

                    <div class="project-number">
                        ${String(projectCount).padStart(2, "0")}
                    </div>

                    <span class="project-status">
                        New Project
                    </span>

                </div>

                <div class="project-content">

                    <div class="project-tags">

                        <span class="project-tag">
                            Web Dev
                        </span>

                        <span class="project-tag">
                            HTML/CSS
                        </span>

                    </div>

                    <h3 class="project-title">
                        New Project
                    </h3>

                    <p class="project-description">
                        Replace this text with your project's
                        description.
                    </p>

                    <div class="project-actions">

                        <a
                            href="#"
                            class="project-link primary-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>Live Demo</span>
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>

                        <a
                            href="#"
                            class="project-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i class="fa-brands fa-github"></i>
                            <span>Source Code</span>
                        </a>

                    </div>

                </div>
            `;

            projectsGrid?.appendChild(project);

            project.animate(
                [
                    {
                        opacity: 0,
                        transform:
                            "translateY(30px) scale(.97)"
                    },
                    {
                        opacity: 1,
                        transform:
                            "translateY(0) scale(1)"
                    }
                ],
                {
                    duration: 500,
                    easing:
                        "cubic-bezier(.22,1,.36,1)"
                }
            );

            project.scrollIntoView({
                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth",
                block: "nearest"
            });

        }
    );


    /* ========================================================
       PROJECT MODAL
    ======================================================== */

    const projectModal =
        $("#project-modal");

    const projectModalTitle =
        $("#project-modal-title");

    const projectModalBody =
        $("#project-modal-body");

    const closeProjectModal =
        $("#close-project-modal");

    const openProjectModal = project => {

        if (!projectModal) return;

        const title =
            $(".project-title", project)
                ?.textContent
                .trim() || "Project";

        const description =
            $(".project-description", project)
                ?.textContent
                .trim() || "";

        const tags =
            $$(".project-tag", project)
                .map(tag =>
                    tag.textContent.trim()
                );

        if (projectModalTitle) {
            projectModalTitle.textContent =
                title;
        }

        if (projectModalBody) {

            projectModalBody.innerHTML = `
                <p>
                    ${escapeHTML(description)}
                </p>

                <div
                    style="
                        display:flex;
                        flex-wrap:wrap;
                        gap:8px;
                        margin-top:20px;
                    "
                >
                    ${tags.map(tag => `
                        <span class="tag">
                            ${escapeHTML(tag)}
                        </span>
                    `).join("")}
                </div>
            `;

        }

        projectModal.hidden = false;

        document.body.classList.add(
            "menu-open"
        );

    };

    const closeModal = () => {

        if (!projectModal) return;

        projectModal.hidden = true;

        document.body.classList.remove(
            "menu-open"
        );

    };

    $$(".project-card").forEach(card => {

        card.addEventListener(
            "dblclick",
            event => {

                const clickedLink =
                    event.target.closest("a");

                if (clickedLink) return;

                openProjectModal(card);

            }
        );

    });

    closeProjectModal?.addEventListener(
        "click",
        closeModal
    );

    $(".modal-backdrop")?.addEventListener(
        "click",
        closeModal
    );


    /* ========================================================
       ESCAPE KEY
    ======================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMobileMenu();

                closeModal();

            }

        }
    );


    /* ========================================================
       MUSIC PLAYER
    ======================================================== */

    const audioPlayer =
        $("#audio-player");

    const playButton =
        $("#play-button");

    const playIcon =
        $("#play-icon");

    const previousButton =
        $("#previous-button");

    const nextButton =
        $("#next-button");

    const shuffleButton =
        $("#shuffle-button");

    const repeatButton =
        $("#repeat-button");

    const progressBar =
        $("#progress-bar");

    const volumeSlider =
        $("#volume-slider");

    const currentTimeElement =
        $("#current-time");

    const durationElement =
        $("#duration");

    const trackTitleElement =
        $("#track-title");

    const trackArtistElement =
        $("#track-artist");

    const currentTrackNumber =
        $("#current-track-number");

    const totalTrackNumber =
        $("#total-track-number");

    const playerStatus =
        $("#player-status");

    const musicPlayer =
        $("#music-player");

    const playlistItems =
        $$(".playlist-item");

    let currentTrackIndex = 0;
    let isShuffle = false;
    let isRepeat = false;

    const playlist = playlistItems.map(
        item => ({
            title:
                $(
                    ".playlist-details strong",
                    item
                )?.textContent.trim() ||
                "Unknown Track",

            artist:
                $(
                    ".playlist-details small",
                    item
                )?.textContent.trim() ||
                "Unknown Artist",

            src:
                item.dataset.audioUrl || "",

            element: item
        })
    );

    if (totalTrackNumber) {
        totalTrackNumber.textContent =
            String(
                playlist.length
            ).padStart(2, "0");
    }

    const formatTime = seconds => {

        if (!Number.isFinite(seconds)) {
            return "00:00";
        }

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            Math.floor(seconds % 60);

        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

    };


    const updateProgressBackground = () => {

        if (!progressBar || !audioPlayer) return;

        const percentage =
            audioPlayer.duration
                ? (
                    audioPlayer.currentTime /
                    audioPlayer.duration
                ) * 100
                : 0;

        progressBar.style.background =
            `linear-gradient(
                90deg,
                var(--neon-purple) 0%,
                var(--neon-pink) ${percentage}%,
                rgba(255,255,255,.1) ${percentage}%,
                rgba(255,255,255,.1) 100%
            )`;

    };


    const updatePlaylistUI = () => {

        playlist.forEach(
            (track, index) => {

                track.element.classList.toggle(
                    "active",
                    index === currentTrackIndex
                );

            }
        );

    };


    const loadTrack = (
        index,
        autoplay = false
    ) => {

        if (!audioPlayer || !playlist.length) {
            return;
        }

        currentTrackIndex =
            (index + playlist.length) %
            playlist.length;

        const track =
            playlist[currentTrackIndex];

        audioPlayer.src =
            track.src;

        audioPlayer.load();

        if (trackTitleElement) {
            trackTitleElement.textContent =
                track.title;
        }

        if (trackArtistElement) {
            trackArtistElement.textContent =
                track.artist;
        }

        if (currentTrackNumber) {
            currentTrackNumber.textContent =
                String(
                    currentTrackIndex + 1
                ).padStart(2, "0");
        }

        updatePlaylistUI();

        if (currentTimeElement) {
            currentTimeElement.textContent =
                "00:00";
        }

        if (durationElement) {
            durationElement.textContent =
                "00:00";
        }

        if (progressBar) {
            progressBar.value = 0;
            updateProgressBackground();
        }

        if (playerStatus) {
            playerStatus.textContent =
                autoplay
                    ? "Playing"
                    : "Ready to play";
        }

        if (autoplay) {

            const playPromise =
                audioPlayer.play();

            if (playPromise) {

                playPromise.catch(() => {

                    if (playerStatus) {
                        playerStatus.textContent =
                            "Press play to start";
                    }

                });

            }

        }

    };


    const updatePlayButton = () => {

        if (!audioPlayer || !playIcon) {
            return;
        }

        const playing =
            !audioPlayer.paused;

        playIcon.className =
            playing
                ? "fa-solid fa-pause"
                : "fa-solid fa-play";

        playButton?.setAttribute(
            "aria-label",
            playing
                ? "Pause music"
                : "Play music"
        );

        musicPlayer?.classList.toggle(
            "playing",
            playing
        );

        if (playerStatus) {
            playerStatus.textContent =
                playing
                    ? "Playing"
                    : "Paused";
        }

    };


    const togglePlay = () => {

        if (!audioPlayer) return;

        if (audioPlayer.paused) {

            const promise =
                audioPlayer.play();

            promise?.catch(() => {

                if (playerStatus) {
                    playerStatus.textContent =
                        "Unable to play track";
                }

            });

        } else {

            audioPlayer.pause();

        }

    };


    const nextTrack = (
        autoplay = true
    ) => {

        let nextIndex;

        if (isShuffle && playlist.length > 1) {

            do {

                nextIndex =
                    Math.floor(
                        Math.random() *
                        playlist.length
                    );

            } while (
                nextIndex ===
                currentTrackIndex
            );

        } else {

            nextIndex =
                currentTrackIndex + 1;

        }

        loadTrack(
            nextIndex,
            autoplay
        );

    };


    const previousTrack = () => {

        if (
            audioPlayer &&
            audioPlayer.currentTime > 3
        ) {

            audioPlayer.currentTime = 0;

            return;

        }

        loadTrack(
            currentTrackIndex - 1,
            !audioPlayer?.paused
        );

    };


    playButton?.addEventListener(
        "click",
        togglePlay
    );

    nextButton?.addEventListener(
        "click",
        () => nextTrack(true)
    );

    previousButton?.addEventListener(
        "click",
        previousTrack
    );


    shuffleButton?.addEventListener(
        "click",
        () => {

            isShuffle =
                !isShuffle;

            shuffleButton.classList.toggle(
                "active",
                isShuffle
            );

        }
    );


    repeatButton?.addEventListener(
        "click",
        () => {

            isRepeat =
                !isRepeat;

            repeatButton.classList.toggle(
                "active",
                isRepeat
            );

        }
    );


    playlist.forEach(
        (track, index) => {

            track.element.addEventListener(
                "click",
                () => {

                    const shouldPlay =
                        !audioPlayer.paused;

                    loadTrack(
                        index,
                        shouldPlay
                    );

                }
            );

        }
    );


    audioPlayer?.addEventListener(
        "loadedmetadata",
        () => {

            if (durationElement) {
                durationElement.textContent =
                    formatTime(
                        audioPlayer.duration
                    );
            }

            updateProgressBackground();

        }
    );


    audioPlayer?.addEventListener(
        "timeupdate",
        () => {

            if (!audioPlayer.duration) {
                return;
            }

            const percentage =
                (
                    audioPlayer.currentTime /
                    audioPlayer.duration
                ) * 100;

            if (progressBar) {
                progressBar.value =
                    percentage;
            }

            if (currentTimeElement) {
                currentTimeElement.textContent =
                    formatTime(
                        audioPlayer.currentTime
                    );
            }

            updateProgressBackground();

        }
    );


    progressBar?.addEventListener(
        "input",
        () => {

            if (!audioPlayer?.duration) {
                return;
            }

            audioPlayer.currentTime =
                (
                    progressBar.value / 100
                ) *
                audioPlayer.duration;

            updateProgressBackground();

        }
    );


    volumeSlider?.addEventListener(
        "input",
        () => {

            if (!audioPlayer) return;

            audioPlayer.volume =
                Number(
                    volumeSlider.value
                );

        }
    );


    audioPlayer?.addEventListener(
        "play",
        updatePlayButton
    );

    audioPlayer?.addEventListener(
        "pause",
        updatePlayButton
    );


    audioPlayer?.addEventListener(
        "ended",
        () => {

            if (isRepeat) {

                audioPlayer.currentTime = 0;

                audioPlayer.play();

                return;

            }

            nextTrack(true);

        }
    );


    audioPlayer?.addEventListener(
        "error",
        () => {

            if (playerStatus) {

                playerStatus.textContent =
                    "Audio file not found";

            }

        }
    );


if (audioPlayer) {

    audioPlayer.volume =
        Number(
            volumeSlider?.value || 0.7
        );

    // Start with Song 4
    loadTrack(
        4,
        true
    );

}


    /* ========================================================
       SPACEBAR MUSIC CONTROL
    ======================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const target =
                event.target;

            if (
                target instanceof HTMLInputElement ||
                target instanceof HTMLTextAreaElement
            ) {
                return;
            }

            if (
                event.code === "Space" &&
                audioPlayer
            ) {

                event.preventDefault();

                togglePlay();

            }

        }
    );


    /* ========================================================
       THEME TOGGLE
    ======================================================== */

    const themeToggle =
        $("#theme-toggle");

    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );

    if (savedTheme) {

        document.body.dataset.theme =
            savedTheme;

    }

    const updateThemeIcon = () => {

        if (!themeToggle) return;

        const icon =
            $("i", themeToggle);

        if (!icon) return;

        const isLight =
            document.body.dataset.theme ===
            "light";

        icon.className =
            isLight
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";

        themeToggle.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark theme"
                : "Switch to light theme"
        );

    };

    updateThemeIcon();

    themeToggle?.addEventListener(
        "click",
        () => {

            const current =
                document.body.dataset.theme;

            const next =
                current === "light"
                    ? "dark"
                    : "light";

            document.body.dataset.theme =
                next;

            localStorage.setItem(
                "portfolio-theme",
                next
            );

            updateThemeIcon();

        }
    );


    /* ========================================================
       BACK TO TOP
    ======================================================== */

    const floatingTopButton =
        $("#floating-top-button");

    const backToTopButtons =
        $$("[data-action='back-to-top']");

    const updateBackToTop =
        () => {

            floatingTopButton?.classList.toggle(
                "visible",
                window.scrollY > 700
            );

        };

    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );

    updateBackToTop();

    backToTopButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    window.scrollTo({
                        top: 0,
                        behavior:
                            prefersReducedMotion
                                ? "auto"
                                : "smooth"
                    });

                }
            );

        }
    );


    /* ========================================================
       PARALLAX EFFECT
    ======================================================== */

    if (
        !prefersReducedMotion &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        const parallaxElements = [
            {
                element: $(".hero-orbit.orbit-one"),
                speed: 0.02
            },
            {
                element: $(".hero-orbit.orbit-two"),
                speed: -0.025
            },
            {
                element: $(".hero-orbit.orbit-three"),
                speed: 0.015
            }
        ];

        window.addEventListener(
            "scroll",
            () => {

                const scrollY =
                    window.scrollY;

                parallaxElements.forEach(
                    item => {

                        if (!item.element) return;

                        item.element.style.transform =
                            `translateY(${scrollY * item.speed}px)`;

                    }
                );

            },
            { passive: true }
        );

    }


    /* ========================================================
       HERO MOUSE PARALLAX
    ======================================================== */

    if (
        !prefersReducedMotion &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        const heroSection =
            $(".hero-section");

        const heroVisual =
            $(".profile-scene");

        heroSection?.addEventListener(
            "pointermove",
            event => {

                if (!heroVisual) return;

                const rect =
                    heroSection.getBoundingClientRect();

                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    0.5;

                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    0.5;

                heroVisual.style.transform =
                    `
                    translate(
                        ${x * 8}px,
                        ${y * 8}px
                    )
                    `;

            }
        );

        heroSection?.addEventListener(
            "pointerleave",
            () => {

                if (heroVisual) {
                    heroVisual.style.transform = "";
                }

            }
        );

    }


    /* ========================================================
       CARD HOVER GLOW
    ======================================================== */

    if (
        !prefersReducedMotion &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        const cards = $$(
            ".skill-card, .project-card, .about-card, .timeline-content"
        );

        cards.forEach(card => {

            card.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    card.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );

                    card.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );

                }
            );

        });

    }


    /* ========================================================
       IMAGE FALLBACK
    ======================================================== */

    const profileImage =
        $(".profile-image");

    profileImage?.addEventListener(
        "error",
        () => {

            profileImage.style.display =
                "none";

            const wrapper =
                $(".profile-image-wrapper");

            if (wrapper) {

                wrapper.style.background =
                    `
                    radial-gradient(
                        circle at 50% 30%,
                        rgba(155,92,255,.35),
                        transparent 35%
                    ),
                    linear-gradient(
                        135deg,
                        #181824,
                        #08080d
                    )
                    `;

            }

        }
    );


    /* ========================================================
       LINK SAFETY
    ======================================================== */

    $$("a[href='#']").forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

            }
        );

    });


    /* ========================================================
       ESCAPE HTML
    ======================================================== */

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    /* ========================================================
       INITIALIZE
    ======================================================== */

    document.body.classList.add(
        "js-enabled"
    );

});