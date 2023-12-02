import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterAction } from './redux/contactsSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.contacts.filter);

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