const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');
const closeButton = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('[data-lightbox]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    lightboxImage.src = link.href;
    lightboxImage.alt = link.querySelector('img')?.alt || link.dataset.lightbox || 'Vergrößertes Bild';
    lightboxCaption.textContent = link.dataset.lightbox || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

closeButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});

const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = document.querySelectorAll('.gallery img, .portrait img, .about-photo img');
  let overlay = document.querySelector('.lightbox-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<img alt=""><button type="button" aria-label="Schließen">×</button>';
    document.body.appendChild(overlay);
  }
  const overlayImg = overlay.querySelector('img');
  const closeBtn = overlay.querySelector('button');
  galleryImages.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (event) => {
      event.preventDefault();
      overlayImg.src = img.currentSrc || img.src;
      overlayImg.alt = img.alt || '';
      overlay.classList.add('is-visible');
    });
  });
  const close = () => overlay.classList.remove('is-visible');
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay || event.target === closeBtn) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
});
