import { MainSlider, VideoPlayer, Difference } from "../js/modules";

window.addEventListener("DOMContentLoaded", () => {
  const slider = new MainSlider({ page: ".page", buttons: ".next" });
  slider.render();

  const player = new VideoPlayer(".showup .play", ".overlay");
  player.init();

  new Difference(".officerold", ".officernew", ".officer__card-item").init();
});
