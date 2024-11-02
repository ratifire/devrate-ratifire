const teamSwiperBlock = new Swiper(".team-swiper", {
  direction: "horizontal",
  slidesPerView: 4,
  loop: false,
  spaceBetween: 15,

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },

    768: {
      slidesPerView: 2,
      spaceBetween: 5,
    },

    1024: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
