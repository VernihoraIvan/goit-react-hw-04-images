import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ imageProfiles, modalOpen }) => {
  return (
    <>
      <ul className={css.ImageGallery}>
        {imageProfiles.map(element => (
          <ImageGalleryItem
            key={element.id}
            image={element.webformatURL}
            alt={element.tags}
            largeImage={element.largeImageURL}
            modalOpen={modalOpen}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  imageProfiles: PropTypes.arrayOf(PropTypes.object),
  modalOpen: PropTypes.func.isRequired,
};
