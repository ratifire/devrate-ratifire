// const teamslaider = document. querySelector ('.team__swiper')
// if (teamslaider) {
//   const teamSwiper = new Swiper('.team__swiper', {
//     direction: 'horizontal',
//     spaceBetween: 30,
//     pagination: {
//       el: '.team__swiper-pagination',
//     },
//   });
// }

// const teams = document.querySelector('.team__swiper');
// const swiper = new Swiper('.team__swiper', {
//   direction: 'horizontal',
//   loop: false,
//   spaceBetween: 30,
//   slidesPerView: 3,
//   pagination: {
//     el: '.team__swiper-pagination',
//     type: "bullets",
//   },
// });

// const teamSliderElement = document.querySelector('.team__swiper');
// if (teamSliderElement) {
//   const teamSwiper = new Swiper('.team__swiper', {
//     direction: 'horizontal',
//     spaceBetween: 30,
//     pagination: {
//       el: '.team__swiper-pagination',
//     },
//   });
// }


const teamSwiperBlock = new Swiper('.team-swiper', {
  direction: 'horizontal',
  slidesPerView: 1,
  loop: false,
  spaceBetween: 20,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
