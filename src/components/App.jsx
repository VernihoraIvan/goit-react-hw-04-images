import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { fetchImages } from '../utils/image-service';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { useState, useEffect } from 'react';

export const App = () => {
  // state = {
  //   page: 1,
  //   query: '',
  //   imageProfiles: [],
  //   isLoading: false,
  //   totalHits: '',
  //   isButtonActive: false,
  //   showModal: false,
  //   largeImage: '',
  // };

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
    // this.setState({ query, page: 1, imageProfiles: [] });
  };

  const getPhotos = async (inputQuery, inputPagepage) => {
    if (!inputQuery) {
      return;
    }
    try {
      setIsLoading(true);
      // this.setState({ isLoading: true });
      const data = await fetchImages(inputQuery, inputPagepage);
      if (data.hits.length === 0) {
        return;
      }
      ////////////////////////////////////////////////////////////////////////??????????????????????????????????????
      setImageProfiles(prevState => [...prevState, ...data.hits]);
      setTotalHits(data.totalHits);
      // this.setState(prevState => ({
      //   imageProfiles: [...prevState.imageProfiles, ...data.hits],
      //   totalHits: data.totalHits,
      // }));
      ///////////////////////////////////////////////////////////////////////////????????????????????????????????
    } catch {
      window.alert('Somthing went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
    // this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  useEffect(() => {
    setIsLoading(true);
    setIsButtonActive(true);
    if (page !== 1) {
      setIsButtonActive(false);
    }

    getPhotos(query, page);
    if (!isButtonActive && totalHits > imageProfiles.length) {
      setIsButtonActive(true);
    }
  }, [page, query]);
  // componentDidUpdate(prevProps, prevState) {
  //   const { page, query } = this.state;
  //   if (query !== prevState.query || prevState.page !== page) {
  //     this.setState({
  //       isLoader: true,
  //       isButtonActive: page !== 1,
  //     });
  //     this.getPhotos(query, page);
  //   }

  //   if (
  //     !prevState.isButtonActive &&
  //     this.state.totalHits > this.state.imageProfiles.length
  //   ) {
  //     this.setState({ isButtonActive: true });
  //   }
  //   if (
  //     prevState.isButtonActive &&
  //     this.state.totalHits < this.state.imageProfiles.length
  //   ) {
  //     this.setState({ isButtonActive: false });
  //   }
  // }

  const modalOpen = inputLargeImage => {
    setLargeImage(inputLargeImage);
    setShowModal(true);
    // this.setState({ largeImage, showModal: true });
  };
  const onClose = () => {
    setShowModal(false);
    // this.setState({ showModal: false });
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
