'use strict';

(function () {
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
  var DESCRIPTION = 'описание фотографии';
  var MAX_AMMOUNT_OF_PHOTOS = 25;
  var MAX_AMMOUNT_OF_AVATARS = 6;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 6;
  var MAX_COMMENT_LENGTH = 2;
  var MIN_COMMENT_LENGTH = 1;

  // клонируем переданный массив
  var cloneArray = function (array) {
    return array.slice();
  };
  // генерируем массив из N чисел, что бы не ручками
  var generateNumberList = function (ammount) {
    var numbers = [];
    for (var i = 1; i <= ammount; i++) {
      numbers.push(i);
    }

    return numbers;
  };
  // массивы номеров для аваторов и фоточек
  var AVATAR_NUMBERS = generateNumberList(MAX_AMMOUNT_OF_AVATARS);
  var PHOTO_NUMBERS = generateNumberList(MAX_AMMOUNT_OF_PHOTOS);

  // простой рандом - выцепляет случайный элемент массива
  var getRandom = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };
  // рандом между - для генерации количества лайков
  var getRandomBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  // рандом не больше чем
  /* var getRandomLessThan = function (max) {
    return Math.floor(Math.random() * max);
  }; */
  // берем случайный элемент массива без повторов
  var getRandomElementNoRepeat = function (array) {
    return array.splice(Math.floor(Math.random() * array.length), 1);
  };

  // генерируем комментарий из массива комментраиев
  // --- TODO --- рассмотреть возможность украшения функции через filter, concat, slice --- TODO ---
  var getCommentMessage = function () {
    var newCommentList = [];
    var comments = cloneArray(COMMENTS);
    var ammount = Math.floor(Math.random() * MAX_COMMENT_LENGTH + MIN_COMMENT_LENGTH);
    for (var i = 0; i < ammount; i++) {
      newCommentList.push(getRandomElementNoRepeat(comments));
    }

    return newCommentList.join(' ');
  };

  // создает объект комментарий
  var createSingleComment = function () {
    var avatarNumber = cloneArray(AVATAR_NUMBERS);
    var comment = {
      avatar: 'img/avatar-' + getRandomElementNoRepeat(avatarNumber) + '.svg',
      message: getCommentMessage(),
      name: getRandom(NAMES)
    };

    return comment;
  };

  // создает массив из объектов комментарий для размещения под фотографией
  var generateCommentList = function (min, max) {
    var commentList = [];
    var commentAmmount = Math.floor(Math.random() * (max - min) + min);
    for (var i = 0; i < commentAmmount; i++) {
      commentList.push(createSingleComment());
    }

    return commentList;
  };

  // генерируем массив фоточек
  var generatePhotoList = function (ammount) {
    var photoList = [];
    for (var i = 0; i < ammount; i++) {
    // сама фоточка
      var photo = {
        url: 'photos/' + getRandomElementNoRepeat(PHOTO_NUMBERS) + '.jpg',
        description: DESCRIPTION,
        likes: getRandomBetween(MIN_LIKES, MAX_LIKES),
        comments: generateCommentList(MIN_COMMENTS, MAX_COMMENTS)
      };
      photoList.push(photo);
    }

    return photoList;
  };

  window.data = {
    generatePhotoList: generatePhotoList,
    maxAmmountOfPhotos: MAX_AMMOUNT_OF_PHOTOS
  };

})();
