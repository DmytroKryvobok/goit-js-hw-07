import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');

const cardsMarkup = createMarkupOfImgCard(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

function createMarkupOfImgCard(gallery) {
    return gallery.map(({ preview, original, description }) => {
        return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}" target="_self">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>
        `
    }).join('');
}

const imageEl = galleryContainer.querySelector('.gallery__image');

const modal = basicLightbox.create(`
		<img src="${imageEl.dataset.source}" class="gallery__modal">
	`);

const onImageCardClick = e => {
    e.preventDefault();
    
    const isImgEl = e.target.classList.contains('gallery__image');
    if (!isImgEl) {
        return;
    }

    modal.show();
}

const closeByEsc = evt => {
    if (evt.code === "Escape") {
        modal.close();
    }
}

galleryContainer.addEventListener('click', onImageCardClick);
document.addEventListener('keydown', closeByEsc);







