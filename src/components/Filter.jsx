import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterAction, selectFilter } from './redux/contactsSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChangeFilter = (e) => {
    dispatch(updateFilterAction(e.target.value));
  };

  return (
    <label key="filter-label">
      <input type="text" value={filter} onChange={handleChangeFilter} key="filter-input" />
    </label>
  );
};

export default Filter;