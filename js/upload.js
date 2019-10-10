'use strict';

(function () {
  var UPLOAD_FILE = document.querySelector('#upload-file');
  var IMG_SETUP = document.querySelector('.img-upload__overlay');
  var BTN_CLOSE_IMG_SETUP = IMG_SETUP.querySelector('.img-upload__cancel');
  var KEY_ESC = 27;
  var SLIDER_PIN = IMG_SETUP.querySelector('.effect-level__pin');
  var SLIDER_LINE = IMG_SETUP.querySelector('.effect-level__depth');
  var SLIDER_BLOCK = IMG_SETUP.querySelector('.effect-level__line');
  // var EFFECTS = IMG_SETUP.querySelectorAll('.effects__item');
  // var IMG_PREVIEW = IMG_SETUP.querySelector('.img-upload__preview');
  // var TAG_INPUT = IMG_SETUP.querySelector('input[name="hashtags"]');

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

  /* var getSliderPosition  = function (evt) {
    var PIN_MIN_X = 595;
    var PIN_MAX_X = 1045;
    var clientXcurrent = Math.floor((evt.clientX - PIN_MIN_X) * 100 / (PIN_MAX_X - PIN_MIN_X));
    SLIDER_PIN.style.left = clientXcurrent + '%';
    SLIDER_LINE.style.width = clientXcurrent + '%';
    console.log(evt.clientX);
  }; */

  // var setupSliderPosition = function (evt) {
  //   getSliderPosition(evt.clientX);
  // };

 /* var sliderEffect = function () {
    ----- Здесь должна быть функция слайдера
  }; */

  // ОТКРЫВАЕМ блок редактирования изображения
  UPLOAD_FILE.addEventListener('change', function () {
    openImgSetup();
  });

  // ЗАКРЫВАЕМ блок редактирования изображения
  BTN_CLOSE_IMG_SETUP.addEventListener('click', closeImgSetup);

  // SLIDER_BLOCK.addEventListener('click', getSliderPosition);

  // перемещение пина вслед за мышкой - НЕ РАБОТАЕТ
  SLIDER_PIN.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startClientX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftClientX = startClientX - moveEvt.clientX;
      startClientX = moveEvt.clientX;

      SLIDER_PIN.style.left = (SLIDER_PIN.offsetLeft - shiftClientX) + 'px';
      SLIDER_LINE.style.width = (SLIDER_PIN.offsetLeft - shiftClientX) + 'px';
      console.log(SLIDER_PIN.offsetLeft - shiftClientX);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // валидация хештегов

  // наложение эффектов на изображение

})();
