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

const normilize = (value) => {
  const noNormilizeArray = value.trim().split(' ');
  const normilizeArray = noNormilizeArray.filter((tag) => tag.length > 0);
  return normilizeArray;
};
