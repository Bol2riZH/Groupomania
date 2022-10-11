import React, { useState } from 'react';
import classes from './SearchBar.module.scss';

import Input from '../UI/Input';
import Button from '../UI/Button';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');

  const inputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const onSearchHandler = () => {};

  return (
    <div className={classes.searchBar}>
      <Input onChange={inputHandler} />
      <Button>Rechercher</Button>
    </div>
  );
};

export default SearchBar;
