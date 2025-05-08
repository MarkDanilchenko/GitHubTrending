export default {
  mounted() {
    const colorMode = localStorage.getItem("colorMode");

    if (!colorMode) {
      localStorage.setItem("colorMode", "light");
      document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", "light");
    } else {
      document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", colorMode);
    }
  },
};
