// APPLICATION: COLOR MODES
const colorModeToggles = document.querySelectorAll("#color-mode-control button")
const colorModeSystemSetting = window.matchMedia("(prefers-color-scheme: dark)")

const getStoredColorTheme = () => localStorage.getItem("spooler-theme")
const setStoredColorTheme = theme => localStorage.setItem("spooler-theme", theme)

const setColorTheme = theme => {
  document.documentElement.setAttribute("data-bs-theme", theme)
}

if (colorModeToggles) {
  colorModeToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const theme = toggle.value
      setStoredColorTheme(theme)
      setToggleClasses(theme)
      setColorTheme(theme === "auto" ? colorModeSystemSetting.matches ? "dark" : "light" : theme)
    })
  })
}

colorModeSystemSetting.addEventListener("change", (e) => {
  const storedTheme = getStoredColorTheme()
  const activeTheme = !storedTheme ? "auto" : storedTheme
  if (activeTheme !== "light" && activeTheme !== "dark") {
    const theme = e.matches ? "dark" : "light"
    setToggleClasses(theme)
    setColorTheme(theme)
  }
})

const setToggleClasses = (theme) => {
  if (colorModeToggles) {
    colorModeToggles.forEach(toggle => {
      if (toggle.value === theme) {
        toggle.classList.add("active")
      } else {
        toggle.classList.remove("active")
      }
    })
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const storedTheme = getStoredColorTheme()
  const activeTheme = !storedTheme ? "auto" : storedTheme
  setToggleClasses(activeTheme)
  setColorTheme(activeTheme === "auto" ? colorModeSystemSetting.matches ? "dark" : "light" : activeTheme)
})