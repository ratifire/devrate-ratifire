const teamSwiperBlock = new Swiper(".team-swiper", {
  direction: "horizontal",
  slidesPerView: 4,
  loop: false,
  spaceBetween: 20,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
