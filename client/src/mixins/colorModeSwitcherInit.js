export default {
  mounted() {
    const colorMode = localStorage.getItem("colorMode");

    if (colorMode === "light") {
      document.getElementById("colorMode_switcher").removeAttribute("checked");
    } else if (colorMode === "dark") {
      document.getElementById("colorMode_switcher").checked = true;
    }
  },
};
