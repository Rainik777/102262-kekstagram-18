'use strict';

(function () {
  var HIDDEN_CLASS = 'hidden';
  var keyCodes = {
    esc: 27,
    enter: 13
  };

  // если нажали ESC, сделать что то
  var isEscEvent = function (evt, action) {
    if (evt.keyCode === keyCodes.esc) {
      action();
    }
  };

  // усли нажали ENTER, сделать что то
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === keyCodes.esc) {
      action();
    }
  };

  // спрячь
  var hide = function (element) {
    element.classList.add(HIDDEN_CLASS);
  };

  // покажи
  var show = function (element) {
    element.classList.remove(HIDDEN_CLASS);
  };

  // экспорт
  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    hide: hide,
    show: show
  };
})();
