import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { fetchImages } from '../utils/image-service';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { useState, useEffect } from 'react';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [imageProfiles, setImageProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  const handleSubmit = inputQuery => {
    if (query === inputQuery) {
      return;
    }
    setQuery(inputQuery);
    setPage(1);
    setImageProfiles([]);
  };

  const getPhotos = async (inputQuery, inputPagepage) => {
    if (!inputQuery) {
      return;
    }
    try {
      setIsButtonActive(false);
      setIsLoading(true);
      const data = await fetchImages(inputQuery, inputPagepage);
      if (data.hits.length === 0) {
        return;
      }
      setImageProfiles(prevState => [...prevState, ...data.hits]);
      setTotalHits(data.totalHits);
    } catch {
      window.alert('Somthing went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    getPhotos(query, page);
  }, [query, page]);

  useEffect(() => {
    if (totalHits > imageProfiles.length) {
      setIsButtonActive(true);
    }
    if (totalHits <= imageProfiles.length) {
      setIsButtonActive(false);
    }
  }, [imageProfiles, totalHits]);

  const modalOpen = inputLargeImage => {
    setLargeImage(inputLargeImage);
    setShowModal(true);
  };
  const onClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery imageProfiles={imageProfiles} modalOpen={modalOpen} />
      {isLoading && <Loader />}
      {isButtonActive && <Button onClick={handleLoadMore} />}
      {showModal && <Modal largeImage={largeImage} onClose={onClose} />}
    </div>
  );
};
