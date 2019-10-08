'use strict';

(function () {
  var UPLOAD_FILE = document.querySelector('#upload-file');
  var IMG_SETUP = document.querySelector('.img-upload__overlay');
  var BTN_CLOSE_IMG_SETUP = IMG_SETUP.querySelector('.img-upload__cancel');
  var KEY_ESC = 27;
  var SLIDER_PIN = IMG_SETUP.querySelector('.effect-level__pin');
  var SLIDER_LINE = IMG_SETUP.querySelector('.effect-level__depth');
  var SLIDER_BLOCK = IMG_SETUP.querySelector('.effect-level__line');

  var onImgSetupEscPress = function (evt) {
    if (evt.keyCode === KEY_ESC) {
      closeImgSetup();
    }
  };

  var openImgSetup = function () {
    IMG_SETUP.classList.remove('hidden');
    document.addEventListener('keydown', onImgSetupEscPress);
  };

  var closeImgSetup = function () {
    IMG_SETUP.classList.add('hidden');
    document.removeEventListener('keydown', onImgSetupEscPress);
  };

  var setupSliderPosition = function (evt) {
    var clientXmin = 595;
    var clientXmax = 1045;
    var clientXcurrent = Math.floor((evt.clientX - clientXmin) * 100 / (clientXmax - clientXmin));
    SLIDER_PIN.style.left = clientXcurrent + '%';
    SLIDER_LINE.style.width = clientXcurrent + '%';
    console.log(clientXcurrent);
  }

  var touchSliderBlock = function (evt) {
    setupSliderPosition(evt);
  };

  /* var sliderEffect = function () {
    ----- Здесь должна быть функция слайдера
  }; */

  // ОТКРЫВАЕМ блок редактирования изображения
  UPLOAD_FILE.addEventListener('change', function () {
    openImgSetup();
  });

  // ЗАКРЫВАЕМ блок редактирования изображения
  BTN_CLOSE_IMG_SETUP.addEventListener('click', closeImgSetup);

  SLIDER_BLOCK.addEventListener('click', touchSliderBlock);

  SLIDER_PIN.addEventListener('mousemove', function (evt) {
    var startClientX = evt.clientX;


  });
})();
