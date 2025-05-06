export default {
  mounted() {
    const colorMode = localStorage.getItem("colorMode");

    if (colorMode && colorMode === "light") {
      $("#colorMode_switcher").attr("checked", false);
    } else if (colorMode && colorMode === "dark") {
      $("#colorMode_switcher").attr("checked", true);
    }
  },
};
