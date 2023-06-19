import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = async event => {
    event.preventDefault();
    await setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setQuery(event.target.value);
    if (query === '') {
      return;
    }
    if (query === event.target.value) {
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button className={css.button} type="submit">
          <span className={css.label}>Search</span>
        </button>
        <input
          className={css.input}
          value={query}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
