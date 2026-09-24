// Runs in <head> so the saved or system theme applies before first paint.
(function () {
  var root = document.documentElement, saved = null
  try { saved = localStorage.getItem("flow-theme") } catch (e) {}
  if (saved === "dark" || (!saved && window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches)) root.classList.add("dark")

  document.addEventListener("DOMContentLoaded", function () {
    var toggles = document.querySelectorAll(".themetoggle")
    function sync() {
      var label = root.classList.contains("dark") ? "Switch to light mode" : "Switch to dark mode"
      toggles.forEach(function (b) { b.setAttribute("aria-label", label); b.title = label })
    }
    toggles.forEach(function (b) {
      b.addEventListener("click", function () {
        var dark = !root.classList.contains("dark")
        root.classList.toggle("dark", dark)
        try { localStorage.setItem("flow-theme", dark ? "dark" : "light") } catch (e) {}
        sync()
      })
    })
    sync()
  })
})()
