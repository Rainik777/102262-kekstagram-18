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

// генерируем количество лайков
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

// правда или ложь
var trueOrFalse = function () {
    return Math.random() >= 0.3;
};

// объект комментарий
// генерируем комментарий из массива комментраиев
var getComment = function (array) {
  var newComment = array.filter(trueOrFalse);
  var newCommentList = [];
  var ammount = Math.floor(Math.random() * MAX_COMMENT_LENGTH + MIN_COMMENT_LENGTH);
  for (var i = 0; i < ammount; i++) {
    newCommentList.push(getRandomElement(newComment));
  }

  return newCommentList.join(' ');
};

var addComment = function () {
  var namesCloned = cloneArray(NAMES);
  var avatarNumberCloned = cloneArray(AVATAR_NUMBERS);
  var comment = {
    avatar: 'img/avatar-' + getRandomElement(avatarNumberCloned) + '.svg',
    message: getComment(COMMENTS),
    name: getRandomElement(namesCloned)
  };

  return comment;
};

var fullCommentList = function (min, max) {
  var commentList = [];
  var commentAmmount = Math.floor(Math.random() * (max - min) + min);
  for (var i = 0; i < commentAmmount; i++) {
    commentList.push(addComment());
  }

  return commentList;
};

// генерируем массив фоточек
var generatePhotoList = function (ammount) {
  var photoList = [];
  // массив комментариев под фото
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

renderPhotos(generatePhotoList(AMMOUNT_OF_PHOTOS));
console.log(getComment(COMMENTS));
