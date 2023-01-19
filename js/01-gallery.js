import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryBox = document.querySelector(".gallery");

function onCreateEl(elements) {
  return elements
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`
    )
    .join("");
}
const htmlElement = onCreateEl(galleryItems);
galleryBox.insertAdjacentHTML("afterbegin", htmlElement);

galleryBox.addEventListener("click", onClickGiveUrl);

let instance = {};

function onClickGiveUrl(event) {
  onPreventDefault(event);

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const url = event.target.dataset.source;
  instance = basicLightbox.create(`
    <img src="${url}" width="800" height="600">
`);
  instance.show();
  window.addEventListener("keydown", onEscCloseModal);
}

function onPreventDefault(event) {
  event.preventDefault();
}

function onEscCloseModal(event) {
  if (event.code === "Escape") {
    instance.close();
    window.removeEventListener("keydown", onEscCloseModal);
  }
}
