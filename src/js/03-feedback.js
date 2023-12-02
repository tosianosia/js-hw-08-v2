import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';
const { email, message } = feedbackForm.elements;
let formData = {};

feedbackForm.addEventListener('input', throttle(onFeedbackFormChange, 500));
feedbackForm.addEventListener('submit', onFeedbackFormSubmit);

checkLocalStorage();

function checkLocalStorage() {
  const savedLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (savedLocalStorage) {
    formData = JSON.parse(savedLocalStorage);
    email.value = formData.email;
    message.value = formData.message;
  }
}

function onFeedbackFormChange(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function onFeedbackFormSubmit(evt) {
  evt.preventDefault();
  console.log({ email: email.value, message: message.value });

  if (email.value === '' || message.value === '') {
    return alert('Пожалуйста, заполните все обязательные поля!!!');
  }

  evt.currentTarget.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}
