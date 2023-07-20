const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const formEditor = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const effectsList = document.querySelector('.effects__list');
const photoHashtags = imgUploadForm.querySelector('.text__hashtags');
const photoDescription = imgUploadForm.querySelector('.text__description');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const openForm = () => {
  formEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  window.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  formEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', onDocumentKeydown);
  pristine.reset();
};

// // const isTextFieldFocused = () =>
// //   document.activeElement === photoHashtags ||
// //   document.activeElement === photoDescription;

// // function onDocumentKeydown(evt) {
// //   if(evt.key === 'Escape' && !isTextFieldFocused()){
// //     evt.preventDefault();
// //     hideModal();
// //   }
// }
photoHashtags.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape'){
    evt.stopPropagation();
  }
});

photoDescription.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape'){
    evt.stopPropagation();
  }
});

// Убираем лишние пробелы, разделяем хештеги
const normilize = (value) => {
  const noNormilizeArray = value.trim().split(' ');
  const normilizeArray = noNormilizeArray.filter((tag) => tag.length > 0);
  return normilizeArray;
};

const validTextHashtag = (textHashtag) => normilize(textHashtag).every((tag) => VALID_SYMBOLS.test(tag));

pristine.addValidator(
  photoHashtags,
  validTextHashtag
);

const uniqueHashtag = (textHashtag) => {
  const lowerCase = normilize(textHashtag).map((tag) => tag.lowerCase());
  return lowerCase.length === new Set(lowerCase).size;
};

pristine.addValidator (
  photoHashtags,
  uniqueHashtag
);

const validHashtag = (textHashtag) => normilize(textHashtag).length <= MAX_HASHTAG_COUNT;

pristine.addValidator (
  photoHashtags,
  validHashtag
);

