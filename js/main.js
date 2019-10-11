'use strict';
(function () {
  var VISUALLY_HIDDEN_CLASS = 'visually-hidden';

  var PICTURES = document.querySelector('.pictures');
  var PICTURE_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
  var BIG_PICTURE = document.querySelector('.big-picture');
  var NEW_COMMENT_DOWNLOAD = BIG_PICTURE.querySelector('.comments-loader');
  var COMMENT_COUNT = BIG_PICTURE.querySelector('.social__comment-count');
  var BIG_PICTURE_IMAGE = BIG_PICTURE.querySelector('.big-picture__img').querySelector('img');
  var BIG_PICTURE_LIKES = BIG_PICTURE.querySelector('.likes-count');
  var BIG_PICTURE_COMMENTS_AMMOUNT = BIG_PICTURE.querySelector('.comments-count');
  var BIG_PICTURE_SINGLE_COMMENT = BIG_PICTURE.querySelector('.social__comment');
  var BIG_PICTURE_DESCRIPION = BIG_PICTURE.querySelector('.social__caption');
  var BIG_PICTURE_COMMENTS = BIG_PICTURE.querySelector('.social__comments');

  var preparePhoto = function (photo) {
    var photoElement = PICTURE_TEMPLATE.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__img').alt = photo.description;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  // подготовка комментария
  var prepareComment = function (comment) {
    var newComment = BIG_PICTURE_SINGLE_COMMENT.cloneNode(true);

    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;

    return newComment;
  };

  // создание фрагмента
  var renderFragment = function (array, func) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (item) {
      fragment.appendChild(func(item));
    });

  return fragment;
  };

  var photoList = window.data.generatePhotoList(window.data.maxAmmountOfPhotos);

  // работа с большим фото
  var renderBigPicture = function () {
    BIG_PICTURE_IMAGE.src = photoList[3].url;
    BIG_PICTURE_LIKES.textContent = photoList[3].likes;
    BIG_PICTURE_COMMENTS_AMMOUNT.textContent = photoList[3].comments.length;
    BIG_PICTURE_DESCRIPION.textContent = photoList[3].description;
    BIG_PICTURE_COMMENTS.replaceWith(renderFragment(photoList[3].comments, prepareComment));
  };

  // прячем и вскрываем на странице что нужно
  var hideAndSeek = function () {
    // BIG_PICTURE.classList.remove('hidden'); /* временно прячем большую картинку */
    // прячем блоки подсчета комментариев и загрузки новых
    COMMENT_COUNT.classList.add('visually-hidden');
    NEW_COMMENT_DOWNLOAD.classList.add('visually-hidden');
  };

  var main = function () {
    // отрисовка фоточек на главной
    PICTURES.appendChild(renderFragment(photoList, preparePhoto));

    renderBigPicture();
    hideAndSeek();
  };

  main();

})();

