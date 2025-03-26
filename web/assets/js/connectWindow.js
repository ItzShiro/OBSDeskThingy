export const ConnectWindow = {
  toggle: () => {
    document.querySelector(".line3").classList.toggle("active");
  },
  close: () => {
    document.querySelector(".line3").classList.remove("active");
  },
  init: async () => {
    document.querySelectorAll(".inputLine").forEach((input, key) => {
      var nth = key + 2;
      input.setAttribute(
        "style",
        `transition-delay: calc((var(--transition-delay) / 2) * ${nth});`
      );
    });
  },
  indicator: (type) => {
    if (type == "c_s") {
      return {
        diode: document.querySelector(".client_server-connectionIndicator"),
        text: document.querySelector(".connectionStatusSpan"),
        activate: () => {
          ConnectWindow.indicator("c_s").diode.classList.add("connected");
          ConnectWindow.indicator("c_s").text.textContent = "Connected";
        },
        deactivate: () => {
          ConnectWindow.indicator("c_s").diode.classList.remove("connected");
          ConnectWindow.indicator("c_s").text.textContent = "Disconnected";
        },
      };
    } else if (type == "s_s") {
      return {
        diode: document.querySelector(".server_server-connectionIndicator"),
        text: document.querySelector(".connectionStatusSpan"),
        activate: () => {
          ConnectWindow.indicator("s_s").diode.classList.add("connected");
          ConnectWindow.indicator("s_s").text.textContent = "Connected";
        },
        deactivate: () => {
          ConnectWindow.indicator("s_s").diode.classList.remove("connected");
          ConnectWindow.indicator("s_s").text.textContent = "Disconnected";
        },
      };
    }
  },
  disconnection: () => {
    ConnectWindow.indicator("c_s").deactivate();
    ConnectWindow.indicator("s_s").deactivate();
    document.querySelector(".window_connectButton").classList.remove("state2");
  },
};

ConnectWindow.init().then(() => {
  document
    .querySelector("nav .icon.connectWindow")
    .addEventListener("click", () => {
      ConnectWindow.toggle();
    });
  document.querySelector(".line3 .backBtn").addEventListener("click", () => {
    ConnectWindow.toggle();
  });
});

export default ConnectWindow;
