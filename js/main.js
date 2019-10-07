'use strict';

var PICTURE_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
var PICTURES = document.querySelector('.pictures');
var AMMOUNT_OF_PHOTOS = 25;
var AMMOUNT_OF_AVATARS = 6;
var DESCRIPTION = 'описание фотографии';
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 6;
var MAX_COMMENT_LENGTH = 2;
var MIN_COMMENT_LENGTH = 1;
var BIG_PICTURE = document.querySelector('.big-picture');
var BIG_PICTURE_IMAGE = BIG_PICTURE.querySelector('.big-picture__img');
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = [
  'Росс Геллер',
  'Моника Геллер',
  'Джоуи Триббиани',
  'Рейчел Грин',
  'Фиби Буффе',
  'Чендлер Бинг'
];
var COMMENT_COUNT = BIG_PICTURE.querySelector('.social__comment-count');
var NEW_COMMENT_DOWNLOAD = BIG_PICTURE.querySelector('.comments-loader');
var photoList = [];
var bigPhotoCommentList = BIG_PICTURE.querySelector('.social__comments');
var readyComment = BIG_PICTURE.querySelector('.social__comment');

// генерируем массив из N чисел, что бы не ручками
var generateNumberList = function (ammount) {
  var numbers = [];
  for (var i = 1; i <= ammount; i++) {
    numbers.push(i);
  }

  return numbers;
};

// массивы номеров для аваторов и фоточек
var AVATAR_NUMBERS = generateNumberList(AMMOUNT_OF_AVATARS);
var PHOTO_NUMBERS = generateNumberList(AMMOUNT_OF_PHOTOS);

// простой рандом - выцепляет случайный элемент массива
var getRandom = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// рандом между - для генерации количества лайков
var getRandomBetween = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// клонируем переданный массив
var cloneArray = function (array) {
  return array.slice();
};

// берем случайный элемент массива без повторов
var getRandomElement = function (array) {
  return array.splice(Math.floor(Math.random() * array.length), 1);
};

// правда или ложь --- про запас, на случай альтернативной реализации
// var trueOrFalse = function () {
//   return Math.random() >= 0.5;
// };

// генерируем комментарий из массива комментраиев
// --- TODO --- рассмотреть возможность украшения функции через filter, concat, slice --- TODO ---
var getCommentMessage = function () {
  var newCommentList = [];
  var comments = cloneArray(COMMENTS);
  var ammount = Math.floor(Math.random() * MAX_COMMENT_LENGTH + MIN_COMMENT_LENGTH);
  for (var i = 0; i < ammount; i++) {
    newCommentList.push(getRandomElement(comments));
  }
  // newCommentList.concat(arrayCloned.filter(trueOrFalse));
  // newCommentList.slice(0, ammount).join(' ');

  return newCommentList.join(' ');
};

// создает объект комментарий
var createComment = function () {
  var avatarNumber = cloneArray(AVATAR_NUMBERS);
  var comment = {
    avatar: 'img/avatar-' + getRandomElement(avatarNumber) + '.svg',
    message: getCommentMessage(),
    name: getRandom(NAMES)
  };

  return comment;
};

// создает массив из объектов комментарий для размещения под фотографией
var fullCommentList = function (min, max) {
  var commentList = [];
  var commentAmmount = Math.floor(Math.random() * (max - min) + min);
  for (var i = 0; i < commentAmmount; i++) {
    commentList.push(createComment());
  }

  return commentList;
};

// генерируем массив фоточек
var generatePhotoList = function (ammount) {
  for (var i = 0; i < ammount; i++) {
    // сама фоточка
    var photo = {
      url: 'photos/' + getRandomElement(PHOTO_NUMBERS) + '.jpg',
      description: DESCRIPTION,
      likes: getRandomBetween(MIN_LIKES, MAX_LIKES),
      comments: fullCommentList(MIN_COMMENTS, MAX_COMMENTS)
    };
    photoList.push(photo);
  }

  return photoList;
};

var preparePhotoElement = function (foto) {
  var photoElement = PICTURE_TEMPLATE.cloneNode(true);

  photoElement.querySelector('.picture__img').src = foto.url;
  photoElement.querySelector('.picture__likes').textContent = foto.likes;
  photoElement.querySelector('.picture__comments').textContent = foto.comments.length;

  return photoElement;
};

var renderPhotos = function (array) {
  var fragment = document.createDocumentFragment();
  array.forEach(function (item) {
    fragment.appendChild(preparePhotoElement(item));
  });

  PICTURES.appendChild(fragment);
};

// подготовка комментария
var prepareComment = function (comment) {
  var newComment = readyComment.cloneNode(true);

  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};

// вставка комментариев под фото
var renderCommentList = function (comments) {
  var fragment = document.createDocumentFragment();
  comments.forEach(function (item) {
    fragment.appendChild(prepareComment(item));
  });

  return bigPhotoCommentList.replaceWith(fragment);
};

renderPhotos(generatePhotoList(AMMOUNT_OF_PHOTOS));

// работа с большим фото
var renderBigPicture = function () {
  BIG_PICTURE_IMAGE.querySelector('img').src = photoList[1].url;
  BIG_PICTURE.querySelector('.likes-count').textContent = photoList[1].likes;
  BIG_PICTURE.querySelector('.comments-count').textContent = photoList[1].comments.length;
  BIG_PICTURE.querySelector('.social__caption').textContent = photoList[1].description;
  renderCommentList(photoList[1].comments);
};

renderBigPicture();
BIG_PICTURE.classList.remove('hidden');
// прячем блоки подсчета комментариев и загрузки новых
COMMENT_COUNT.classList.add('visually-hidden');
NEW_COMMENT_DOWNLOAD.classList.add('visually-hidden');
