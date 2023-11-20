export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.buttons = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector(".close");
    this.onePlayerStateChange = this.onePlayerStateChange.bind(this);
  }

  bindTriggers() {
    this.buttons.forEach((button, i) => {
      try {
        const blockedElem = button.closest(
          ".module__video-item"
        ).nextElementSibling;

        if (i % 2 == 0) {
          blockedElem.setAttribute("data-disabled", "true");
        }
      } catch (error) {}

      button.addEventListener("click", () => {
        if (
          !button.closest(".module__video-item") ||
          button
            .closest(".module__video-item")
            .getAttribute("data-disabled") !== "true"
        ) {
          this.activeBtn = button;

          if (document.querySelector("iframe#frame")) {
            this.overlay.style.display = "flex";
            if (this.path !== button.getAttribute("data-url")) {
              this.path = button.getAttribute("data-url");
              this.player.loadVideoById({ videoId: this.path });
            }
          } else {
            this.path = button.getAttribute("data-url");
            this.createPlayer(this.path);
          }
        }
      });
    });
  }

  bindCloseButton() {
    this.close.addEventListener("click", () => {
      this.overlay.style.display = "none";
      this.player.stopVideo();
    });
  }

  createPlayer(url) {
    this.player = new YT.Player("frame", {
      videoId: `${url}`,
      events: { onStateChange: this.onePlayerStateChange },
    });

    this.overlay.style.display = "flex";
  }

  onePlayerStateChange(state) {
    try {
      const blockedElem = this.activeBtn.closest(
        ".module__video-item"
      ).nextElementSibling;
      const playCircle = blockedElem.querySelector(".play__circle");
      const playBtn = this.activeBtn.querySelector("svg").cloneNode(true);

      if (state.data === 0 && playCircle.classList.contains("closed")) {
        playCircle.classList.remove("closed");
        playCircle.querySelector("svg").remove();
        playCircle.appendChild(playBtn);
        blockedElem.querySelector(".play__text").textContent = "play video";
        blockedElem.querySelector(".play__text").classList.remove("attention");
        blockedElem.style.opacity = 1;
        blockedElem.style.filter = "none";

        blockedElem.setAttribute("data-disabled", "false");
      }
    } catch (error) {}
  }

  init() {
    if (this.buttons.length > 0) {
      const tag = document.createElement("script");

      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      this.bindTriggers();
      this.bindCloseButton();
    }
  }
}
