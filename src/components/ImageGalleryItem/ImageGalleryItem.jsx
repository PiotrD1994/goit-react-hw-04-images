import React, { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem ({image}) {
  const lightbox = useRef(null);

  useEffect(() => {
    const openLightbox = () => {
      lightbox.current && lightbox.current.show();
    };

    const handleKeyDown = (event) => {
      if (event.code === 'Escape') {
        lightbox.current && lightbox.current.close();
      }
    };

    lightbox.current = basicLightbox.create(`
      <div class="modal">
        <img src="${image.largeImageURL}" alt="${image.tags}">
      </div>
    `);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      lightbox.current && lightbox.current.close();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [image]);

  return (
    <li className={css.item}>
      <img className={css.image} src={image.webformatURL} alt={image.tags} onClick={() => lightbox.current && lightbox.current.show()} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;