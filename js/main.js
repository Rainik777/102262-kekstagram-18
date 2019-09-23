'use strict';

var AMMOUNT_OF_PHOTOS = 25;
var AMMOUNT_OF_AVATARS = 6;
var DESCRIPTION = 'описание фотографии';
var MIN_LIKES = 15;
var MAX_LIKES = 200;
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
var generateArrayOfNumbers = function (ammount) {
  var numbers = [];
  for (var i = 1; i <= ammount; i++) {
    numbers.push(i);
  }

  return numbers;
};

// генерируем количество лайков
var generateLikes = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// клонируем переданный массив
var cloneArray = function(array) {
  return array.slice();
};

// берем случайный элемент массива без повторов
var getRandomElement = function (array) {
  return array.splice(Math.floor(Math.random() * array.length), 1);
};

//объект комментарий
var avatarNumbers = generateArrayOfNumbers(AMMOUNT_OF_AVATARS);
var names = cloneArray(NAMES);
var comments = cloneArray(COMMENTS);
// генерируем комментарий из массива комментраиев
var getComment = function (array) {
  var MAX_COMMENT_LENGTH = 2;
  var MIN_COMMENT_LENGTH = 1
  var str = '';
  var ammount = Math.floor(Math.random() * MAX_COMMENT_LENGTH + MIN_COMMENT_LENGTH);
  for (var i = 0; i < ammount; i++) {
    str += getRandomElement(array) + ' ';
  } return str;
};
var comment = {
  avatar: 'img/avatar-' + getRandomElement(avatarNumbers) + '.svg',
  message: getComment(comments),
  name: getRandomElement(names)
};

// объект фотография
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 6;
var photoList = [];
var photoNumbers = generateArrayOfNumbers(AMMOUNT_OF_PHOTOS);
var fullCommentList = function (min, max) {
  var commentList = [];
  var ammount = Math.floor(Math.random() * (max - min) + min);
  for (var i = 0; i < ammount; i++) {
    commentList.push(comment);
  } return commentList;
};
var photo = {
  url: 'photos/' + getRandomElement(photoNumbers) + '.jpg',
  description: DESCRIPTION,
  likes: generateLikes(MIN_LIKES, MAX_LIKES),
  comments: fullCommentList(MIN_COMMENTS, MAX_COMMENTS)
};

// console.log(comment.avatar + ' ' + comment.message + ' ' + comment.name);
console.log(photo.url + ' ' + photo.description + ' ' + photo.likes + ' ' + photo.comments[0].message);
