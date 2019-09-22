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

// объект фотография
var photoList = [];
var photoNumbers = generateArrayOfNumbers(AMMOUNT_OF_PHOTOS);

var photo = {
  url: 'photos/' + getRandomElement(photoNumbers) + '.jpg'
};

console.log(photo.url);
