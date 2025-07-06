// Light switcher
const lightSwitches = document.querySelectorAll(".light-switch");
if (lightSwitches.length > 0) {
  lightSwitches.forEach((lightSwitch, i) => {
    if (localStorage.getItem("dark-mode") === "true") {
      // eslint-disable-next-line no-param-reassign
      lightSwitch.checked = true;
    }
    lightSwitch.addEventListener("change", () => {
      const { checked } = lightSwitch;
      lightSwitches.forEach((el, n) => {
        if (n !== i) {
          // eslint-disable-next-line no-param-reassign
          el.checked = checked;
        }
      });
      document.documentElement.classList.add("**:transition-none!");
      if (lightSwitch.checked) {
        document.documentElement.classList.add("dark");
        document.querySelector("html").style.colorScheme = "dark";
        localStorage.setItem("dark-mode", true);
        document.dispatchEvent(
          new CustomEvent("darkMode", { detail: { mode: "on" } })
        );
      } else {
        document.documentElement.classList.remove("dark");
        document.querySelector("html").style.colorScheme = "light";
        localStorage.setItem("dark-mode", false);
        document.dispatchEvent(
          new CustomEvent("darkMode", { detail: { mode: "off" } })
        );
      }
      setTimeout(() => {
        document.documentElement.classList.remove("**:transition-none!");
      }, 1);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("waitlist-form");

  if (!form) {
    console.error("Form with ID 'waitlist-form' not found.");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;

    fetch("https://formspree.io/f/mrbkvldp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => {
        if (response.ok) {
          alert("You're on the waitlist!");
          form.reset();
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error. Try again later.");
      });
  });
});
