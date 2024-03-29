'use strict';

(function () {

  // Открытие, закрытие окна загрузки фотографии
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var buttonCloseEdit = document.querySelector('.img-upload__cancel');
  var comment = document.querySelector('.social__footer-text');
  var textComment = document.querySelector('.text__description');
  // Теги
  var hashTags = document.querySelector('.text__hashtags');
  // Отправка формы
  var submitButton = document.querySelector('.img-upload__submit');
  var form = document.querySelector('.img-upload__form');

  uploadFile.onchange = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();
    var matches = window.constants.FILE_TYPES.some(function (extension) {
      return fileName.endsWith(extension);
    });
    if (matches) {
      imgUploadOverlay.classList.remove('hidden');
      buttonCloseEdit.addEventListener('click', buttonCloseEditClickHandler);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        if (e.target.readyState === FileReader.DONE) {
          window.effects.picture.querySelector('img').src = e.target.result;
        }
      };
      window.effects.scaleControl.value = window.constants.PICTURE_DEFAULT_SIZE + '%';
      window.effects.picture.style.transform = 'scale(' + (
        window.constants.PICTURE_DEFAULT_SIZE / window.constants.PICTURE_RESIZE_PERCENT
      ) + ')';
      window.effects.togglePictureLevel(true);
    }
  };

  var clearUploadForm = function () {
    imgUploadOverlay.classList.add('hidden');
    window.effects.setDefaultPicture();
    uploadFile.value = '';
    textComment.value = '';
    hashTags.value = '';
    hashTags.style = window.constants.BORDER_NO;
    textComment.style = window.constants.BORDER_NO;
  };

  var buttonCloseEditClickHandler = function () {
    clearUploadForm();
    buttonCloseEdit.removeEventListener('click', buttonCloseEditClickHandler);
  };

  document.addEventListener('keydown', function (evt) {
    switch (evt.keyCode) {
      case window.constants.BUTTON_ESC:
        if (
          document.activeElement === comment
          || document.activeElement === textComment
          || document.activeElement === hashTags
        ) {
          return;
        }
        clearUploadForm();
        window.gallery.buttonBigPictureCloseClickHandler();
        window.networking.closeSuccessUploadPopupClickHandler();
        window.networking.closeErrorPopup();
        break;
      case window.constants.BUTTON_ENTER:
        if (document.activeElement.classList.contains('picture')) {
          var image = document.activeElement.querySelector('.picture__img');
          window.gallery.findAndShowBigPicture(image.src);
        }
        break;
    }
  });

  hashTags.addEventListener('input', function (evt) {
    evt.target.style = window.constants.BORDER_NO;
    hashTags.setCustomValidity('');
  });

  textComment.addEventListener('input', function (evt) {
    evt.target.style = window.constants.BORDER_NO;
    textComment.setCustomValidity('');
  });

  var validateTag = function (tag) {
    return (tag[0] === '#' && tag.length > window.constants.MIN_TEGS_LENGTH && tag.length < window.constants.MAX_TEGS_LENGTH);
  };

  var validateHashTags = function (tags) {

    var tagsList = tags.replace(/\s+/g, ' ').split(' ').map(function (tag) {
      return tag.trim().toLowerCase();
    }).sort();

    if (tagsList.length > window.constants.MAX_TEGS) {
      hashTags.setCustomValidity('Максимальное колличество хештегов: 5');
      return false;
    }
    return tagsList.every(function (tag, index, thisArray) {
      var hashes = tag.split('').filter(function (letter) {
        return letter === '#';
      });
      if (hashes.length > 1) {
        hashTags.setCustomValidity('Теги должны быть разделены пробелом');
        return false;
      }
      if (!validateTag(tag)) {
        hashTags.setCustomValidity('Неправильный хештег: ' + tag);
        return false;
      }
      var nextTag = thisArray[index + 1];
      if (nextTag !== undefined && tag === nextTag) {
        hashTags.setCustomValidity('Одинаковые хештеги: ' + tag + ' и ' + nextTag);
        return false;
      }
      return true;
    });
  };

  var sendPhotoCallback = function (evt) {
    var tags = hashTags.value.trim();
    if (tags.length !== 0 && !validateHashTags(tags)) {
      hashTags.style = window.constants.BORDER_RED;
      return;
    }
    var photoComment = textComment.value.trim();
    if (photoComment.length > window.constants.COMMET_MAX_LENGTH) {
      textComment.setCustomValidity('Длина комментария не должна быть более ' + window.constants.COMMET_MAX_LENGTH + ' символов');
      textComment.style = window.constants.BORDER_RED;
      return;
    }
    evt.preventDefault();
    var data = new FormData(form);
    window.networking.uploadPhoto(data, window.networking.successUploadDataHandler, window.networking.showErrorMessage);
  };
  submitButton.addEventListener('click', sendPhotoCallback);

  window.uploadPicture = {
    clearUploadForm: clearUploadForm,
    uploadFile: uploadFile,
    imgUploadOverlay: imgUploadOverlay,
  };
})();
