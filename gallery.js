import gallery from "./gallery-items.js";

const galleryEl = document.querySelector(".js-gallery");
const lightboxEl = document.querySelector(".js-lightbox");
const lightboxImageEl = document.querySelector(".lightbox__image");
const btnCloseModal = document.querySelector(".lightbox__button");
const backdropEl = document.querySelector(".lightbox__overlay");

const makeGalleryMarkup = ({ preview, original, description }) => {
  return `
<li class="gallery__item">
  <a
    class="gallery__link"
    href="#"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>

`;
};
const imageEl = gallery.map(makeGalleryMarkup).join("");
galleryEl.insertAdjacentHTML("afterbegin", imageEl);

galleryEl.addEventListener("click", onGalleryClick);

function onGalleryClick(e) {
  const isImageEl = e.target.classList.contains("gallery__image");
  if (!isImageEl) {
    return;
  }
  lightboxEl.classList.add("is-open");
  lightboxImageEl.src = e.target.dataset.source;

  window.addEventListener("keydown", onEscKeyPress);
}

btnCloseModal.addEventListener("click", onBtnModalCloseClick);
backdropEl.addEventListener("click", onBackdropClose);

function onModalClose() {
  lightboxEl.classList.remove("is-open");
  lightboxImageEl.src = "";
}

function onBtnModalCloseClick() {
  onModalClose();
}

function onEscKeyPress(e) {
  const isEscKey = e.code === "Escape";
  if (isEscKey) {
    onModalClose();
  }
}

function onBackdropClose(e) {
  if (e.target === e.currentTarget) {
    onModalClose();
  }
}
