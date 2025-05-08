import gsap from "gsap";

export default {
  mounted() {
    if (this.colorMode === "dark") {
      document.querySelectorAll("#planet *").forEach((element) => {
        element.setAttribute("stroke", "#ffffff");
      });
      document
        .querySelectorAll("#stars > #starsBig line, #stars > #starsSmall line, #stars > #circlesBig circle")
        .forEach((element) => {
          element.setAttribute("stroke", "#ffffff");
        });
      document.querySelectorAll("#stars > #circlesSmall circle").forEach((element) => {
        element.setAttribute("fill", "#ffffff");
      });
      document.querySelectorAll("#spaceman #cord, #spaceman #antenna").forEach((element) => {
        element.setAttribute("stroke", "#ffffff");
      });
    } else {
      document.querySelectorAll("#planet *").forEach((element) => {
        element.setAttribute("stroke", "#0E0620");
      });
      document
        .querySelectorAll("#stars > #starsBig line, #stars > #starsSmall line, #stars > #circlesBig circle")
        .forEach((element) => {
          element.setAttribute("stroke", "#0E0620");
        });
      document.querySelectorAll("#stars > #circlesSmall circle").forEach((element) => {
        element.setAttribute("fill", "#0E0620");
      });
      document.querySelectorAll("#spaceman #cord, #spaceman #antenna").forEach((element) => {
        element.setAttribute("stroke", "#0E0620");
      });
    }

    // yoyo - forward and backward;
    // repeat - infinity;
    gsap.to("#headStripe", {
      y: 1,
      rotation: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      duration: 1,
    });

    gsap.to("#spaceman", {
      y: 0.5,
      rotation: 1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      duration: 1,
    });

    gsap.to("#craterSmall", {
      x: -5,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut",
    });

    gsap.to("#craterBig", {
      x: 5,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut",
    });

    gsap.to("#planet", {
      rotation: -2,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut",
      transformOrigin: "50% 50%",
    });

    gsap.to("#starsBig g", {
      rotation: "random(-45, 45)",
      transformOrigin: "50% 50%",
      yoyo: true,
      repeat: -1,
      duration: 0.8,
      ease: "sine.inOut",
    });

    gsap.fromTo(
      "#starsSmall g",
      { scale: 0, transformOrigin: "50% 50%" },
      {
        scale: 1.2,
        transformOrigin: "50% 50%",
        yoyo: true,
        repeat: -1,
        duration: 0.5,
        ease: "sine.inOut",
        stagger: 0.2,
      },
    );

    gsap.to("#circlesSmall circle", {
      y: -3,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut",
    });

    gsap.to("#circlesBig circle", {
      y: 3,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut",
    });

    gsap.set("#glassShine", { x: -70 });

    gsap.to("#glassShine", {
      x: 80,
      duration: 2,
      rotation: -30,
      ease: "expo.inOut",
      transformOrigin: "50% 50%",
      repeat: -1,
      repeatDelay: 5,
    });
  },
  computed: {},
  watch: {
    colorMode: {
      handler(val) {
        switch (val) {
          case "light":
            break;

          case "dark":
            break;

          default:
            break;
        }
      },
      deep: true,
    },
  },
};
