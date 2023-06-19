import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, alt, largeImage, modalOpen }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={() => modalOpen(largeImage)}>
      <img className={css.ImageGalleryItem_image} src={image} alt={alt} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  modalOpen: PropTypes.func.isRequired,
};
