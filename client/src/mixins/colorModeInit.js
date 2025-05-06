export default {
  mounted() {
    const colorMode = localStorage.getItem("colorMode");

    if (!colorMode) {
      localStorage.setItem("colorMode", "light");
      $("html").attr("data-bs-theme", "light");
    } else {
      $("html").attr("data-bs-theme", colorMode);
    }
  },
};
