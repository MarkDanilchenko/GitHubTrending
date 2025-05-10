import gsap from "gsap";

export default {
  mounted() {
    gsap.fromTo(
      "#getReposBtn",
      { boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)" },
      {
        duration: 0.7,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        boxShadow: "0 0 25px 5px rgba(7, 151, 98)",
      },
    );
  },
};
