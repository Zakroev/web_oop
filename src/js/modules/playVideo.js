export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.buttons = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector(".close");
  }

  bindTriggers() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (document.querySelector("iframe#frame")) {
          this.overlay.style.display = "flex";
        } else {
          const path = button.getAttribute("data-url");
          this.createPlayer(path);
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
    });

    this.overlay.style.display = "flex";
  }

  init() {
    const tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.bindTriggers();
    this.bindCloseButton();
  }
}
