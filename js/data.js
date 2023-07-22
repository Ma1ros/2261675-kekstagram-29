import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './util.js';

const ID_PHOTO = 25;
const AVATAR = 6;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MAX = 30;
const COMMENT_PHOTO = [
  'Очень красиво',
  'Смазанная фотка',
  'Прекрасный снимок',
  'Шикарный вид'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const AUTOR = [
  'Артем',
  'Витя',
  'Дима',
  'Даша',
  'Ирина'
];

const generateCommentId = createIdGenerator();

const createMessage = () => Array.from(
  { length: getRandomInteger(1,2) },
  () => getRandomArrayElement(COMMENT_PHOTO),
).join(' ');


const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(AUTOR),
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(MESSAGE),
  likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
  comment: Array.from(
    {length: getRandomInteger(0, COMMENTS_MAX) },
    createComment,
  ),
});


const getPictures = () => Array.from(
  { length: ID_PHOTO },
  (_, pictureIndex) => createPicture(pictureIndex + 1),
);

// const getPictures = Array.from({length: ID_PHOTO}, createPicture);
export {getPictures};
