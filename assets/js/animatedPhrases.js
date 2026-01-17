gsap.registerPlugin(ScrollTrigger);

gsap.matchMedia().add("(min-width: 1361px)", () => {
    gsap.to(".phrase-one", {
        scale: 0.5,
        ease: "linear", scrollTrigger: {
            trigger: ".phrasesDiv",
            start: "top center",
            end: "bottom center",
            scrub: 1,
        }
    });

    gsap.to(".phrase-two", {
        scale: 2,
        ease: "liear",
        scrollTrigger: {
            trigger: ".phrasesDiv",
            start: "top center",
            end: "bottom center",
            scrub: 1,
        }
    });
});

gsap.matchMedia().add("(min-width: 901px) and (max-width: 1360px)", () => {
    // Impostazioni per schermi stretti (mobile)
    gsap.to(".phrase-one", {
        scale: 0.5,
        ease: "linear",
        scrollTrigger: {
            trigger: ".phrasesDiv",
            start: "top center",
            end: "bottom center",
            scrub: 1,
        }
    });

    gsap.to(".phrase-two", {
        scale: 2,
        ease: "liear",
        scrollTrigger: {
            trigger: ".phrasesDiv",
            start: "top center",
            end: "bottom center",
            scrub: 1,
        }
    });
});

gsap.matchMedia().add("(min-width: 493px) and (max-width: 900px)", () => {
    // Impostazioni per schermi stretti (mobile)
    gsap.to(".phrase-one", {
        scale: 0.5,
        ease: "linear",
        scrollTrigger: {
            trigger: ".phrasesDiv",
            start: "top center",
            end: "bottom center",
            scrub: 1,
        }
    });

    gsap.to(".phrase-two", {
        scale: 2,
        ease: "liear",
        scrollTrigger: {
            trigger: ".phrasesDiv",
            start: "top center",
            end: "bottom center",
            scrub: 1,
        }
    });
});

gsap.matchMedia().add("(max-width: 492px)", () => {
    gsap.to(".phrase-one", {
        scale: 0.5,
        ease: "linear",
        scrollTrigger: {
            trigger: ".phrasesDiv",
            start: "top center",
            end: "bottom center",
            scrub: 1,
        }
    });

    gsap.to(".phrase-two", {
        scale: 2,
        ease: "liear",
        scrollTrigger: {
            trigger: ".phrasesDiv",
            start: "top center",
            end: "bottom center",
            scrub: 1,
        }
    });
});