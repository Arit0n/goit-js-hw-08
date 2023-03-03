import { throttle } from "lodash";

const form = document.querySelector(".feedback-form");
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const LOCALSTORAGE_KEY = "feedback-form-state";

form.addEventListener(
  "input",
  throttle((e) => {
    const objectToSave = { email: email.value, message: message.value };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
  }, 500)
);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (email.value === "" || message.value === "") {
    return alert("Заповніть всі поля!");
  }

  // Виведення у консоль об'єкта з полями та їхніми поточними значеннями
  console.log({ email: email.value, message: message.value });

  form.reset(); // очищення поля форми
  localStorage.removeItem(LOCALSTORAGE_KEY); // очищення сховища
});

// Метод load який буде абстрагувати повторюваний код перевірки помилок парса
const load = (key) => {
  try {
    const serializedState = localStorage.getItem(key); // ключ елемента сховища

    // Якщо елемента немає - повернути undefined, інакше розпарсити елемент.
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    // В разі помилки повернути повідомлення
    console.error("Get state error: ", error.message);
  }
};

// Присвоєння ключа до сховища через метод load
const storageData = load(LOCALSTORAGE_KEY);

// Перевірка стану сховища.
// Якщо  в сховищі є збережені дані - заповнити ними поля форми.
if (storageData) {
  email.value = storageData.email;
  message.value = storageData.message;
}
