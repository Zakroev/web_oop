import {
  MainSlider,
  VideoPlayer,
  MiniSlider,
  Difference,
  Form,
  ShowInfo,
  Download
} from "../js/modules";

window.addEventListener("DOMContentLoaded", () => {
  const slider = new MainSlider({ container: ".page", buttons: ".next" });
  slider.render();

  const modulePageSlider = new MainSlider({
    container: ".moduleapp",
    buttons: ".next",
  });
  modulePageSlider.render();

  const showUpSlider = new MiniSlider({
    container: ".showup__content-slider",
    prev: ".showup__prev",
    next: ".showup__next",
    activeClass: "card-active",
    animate: true,
  });
  showUpSlider.init();

  const modulesSlider = new MiniSlider({
    container: ".modules__content-slider",
    prev: ".modules__info-btns .slick-prev",
    next: ".modules__info-btns .slick-next",
    activeClass: ".card-active",
    animate: true,
    autoplay: true,
  });
  modulesSlider.init();

  const feedSlider = new MiniSlider({
    container: ".feed__slider",
    prev: ".feed__slider .slick-prev",
    next: ".feed__slider .slick-next",
    activeClass: "feed__item-active",
  });
  feedSlider.init();

  new VideoPlayer(".showup .play", ".overlay").init();
  new VideoPlayer(".module__video-item .play", ".overlay").init();
  new Difference(".officerold", ".officernew", ".officer__card-item").init();
  new Form(".form").init();
  new ShowInfo(".plus__content").init();
  new Download(".download").init();
});
