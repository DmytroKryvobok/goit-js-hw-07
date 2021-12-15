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

galleryContainer.addEventListener('click', onImageCardClick);
document.addEventListener('keydown', onKeyboardClick);

function onImageCardClick(e) {
    e.preventDefault();
    
    const isImgEl = e.target.classList.contains('gallery__image');
    if (!isImgEl) {
        return;
    }

    let modal = basicLightbox.create(`
            <img src="${e.target.dataset.source}" class="gallery__modal">
        `, {
        onShow: modal => {
            window.addEventListener('keydown', onKeyboardClick);
            console.log('onShow', modal);
        },
        onClose: modal => {
            window.removeEventListener('keydown', onKeyboardClick);
            console.log('onClose', modal);
        }
    });
    
    modal.show();

    function onKeyboardClick(e) {
        if (e.code === "Escape") {
            modal.close();
        }
    }
}









