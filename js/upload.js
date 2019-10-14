'use strict';

(function () {
  var HASHTAG_AMMOUNT_MAX = 5;

  // ЭФФЕКТЫ
  var filters = {
    // Для эффекта «Хром» — filter: grayscale(0..1);
    chrome: {
      name: 'grayscale',
      minValue: 0,
      maxValue: 1,
      unit: ''
    },
    // Для эффекта «Сепия» — filter: sepia(0..1);
    sepia: {
      name: 'sepia',
      minValue: 0,
      maxValue: 1,
      unit: ''
    },
    // Для эффекта «Марвин» — filter: invert(0..100%);
    marvin: {
      name: 'invert',
      minValue: 0,
      maxValue: 100,
      unit: '%'
    },
    // Для эффекта «Фобос» — filter: blur(0..3px);
    phobos: {
      name: 'blur',
      minValue: 0,
      maxValue: 3,
      unit: 'px'
    },
    // Для эффекта «Зной» — filter: brightness(1..3);
    heat: {
      name: 'brightness',
      minValue: 1,
      maxValue: 3,
      unit: ''
    }
  };

  var UPLOAD_INPUT_PHOTO = document.querySelector('.img-upload__input');
  var UPLOAD_FORM = document.querySelector('.img-upload__overlay');
  var BTN_CLOSE_FORM = UPLOAD_FORM.querySelector('.img-upload__cancel');
  var EFFECT_SLIDER_BLOCK = UPLOAD_FORM.querySelector('.effect-level__line');
  var EFFECT_SLIDER_BLOCK_PIN = UPLOAD_FORM.querySelector('.effect-level__pin');
  var EFFECT_VALUE = UPLOAD_FORM.querySelector('.effect-level__value');
  var EFFECT_ELEMENTS = UPLOAD_FORM.querySelectorAll('.effect__radio');
  var IMG_PREVIEW = UPLOAD_FORM.querySelector('.img-upload__preview');
  var EFFECT_IMG_NO_FILTER = UPLOAD_FORM.querySelector('#effect-none');
  var EFFECT_SLIDER = UPLOAD_FORM.querySelector('.effect-level');
  var HASHTAG_INPUT = UPLOAD_FORM.querySelector('.text__hashtags');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var closePopup = function () {
    window.util.hide(UPLOAD_FORM);
    document.removeEventListener('keydown', onPopupEscPress);
    UPLOAD_INPUT_PHOTO.value = UPLOAD_INPUT_PHOTO.defaultValue;
  };

  var setValue = function (value) {
    EFFECT_SLIDER_BLOCK_PIN.style.left = value + '%';
    EFFECT_VALUE.setAttribute('value', value);

    var effectName = UPLOAD_FORM.querySelector('.effect__list input:checked').value;
    var currentFilter = filters[effectName];
    if (currentFilter) {
      var photoStyle = currentFilter.name
      + '('
      + ((currentFilter.maxValue - currentFilter.minValue) * EFFECT_VALUE.value + currentFilter.minValue) / 100
      + currentFilter.unit
      + ')';
      IMG_PREVIEW.style.filter = photoStyle;
      window.util.show(EFFECT_SLIDER);
    } else {
      IMG_PREVIEW.style.filter = 'none';
      window.util.hide(EFFECT_SLIDER);
    }
  };

  var onEffectClick = function () {
    for (var i = 1; i < EFFECT_ELEMENTS; i++) {
      EFFECT_ELEMENTS[i].addEventListener('click', function () {
        setValue(100);
      });
    }
  };

  // валидация хештегов
  // перебор хештегов
  var isTooManyHashtags = function (array) {
    return array.length > HASHTAG_AMMOUNT_MAX;
  };
  // повторы хештегов
  var hasRepeats = function (array) {
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < array.length; j++) {
        if (array[i] === array[j]) {
          return true;
        }
      }
    }
    return false;
  };
  // валидация хештегов
  var validateHashtag = function (hashtags) {
    var hashtagStrings = hashtags.split(' ');
    if (isTooManyHashtags(hashtagStrings)) {
      return 'Слишком много хэштегов!';
    }
    if (hasRepeats(hashtagStrings)) {
      return 'Хэштеги повторяются';
    }
    for (var i = 0; i < hashtagStrings.legth; i++) {
      if (!hashtagStrings[i].match(/^#[a-z]{1,19}$/i) && hashtagStrings[i] !== '') {
        return 'Неправильный формат хэштега';
      }
    }

    return '';
  };

  onEffectClick();

  BTN_CLOSE_FORM.addEventListener('click', function () {
    closePopup();
  });

  UPLOAD_INPUT_PHOTO.addEventListener('change', function () {
    window.util.show(UPLOAD_FORM);
    document.addEventListener('keydown', onPopupEscPress);
    setValue(100);
  });

  EFFECT_SLIDER_BLOCK.addEventListener('mouseup', function (event) {
    var bounds = EFFECT_SLIDER_BLOCK.getBoundingClientRect();
    var value = (event.clientX - bounds.left) / bounds.width * 100;
    setValue(value);
  });

  EFFECT_IMG_NO_FILTER.addEventListener('click', function () {
    IMG_PREVIEW.style.filter = 'none';
    window.util.hide(EFFECT_SLIDER);
  });

  HASHTAG_INPUT.addEventListener('change', function () {
    var hashtags = HASHTAG_INPUT.value;
    HASHTAG_INPUT.setCustomValidity(validateHashtag(hashtags));
  });

  HASHTAG_INPUT.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, function () {
      evt.stopPropagation();
    });
  });
})();
