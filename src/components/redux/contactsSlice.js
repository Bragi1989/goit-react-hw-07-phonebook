import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addContactAction: (state, action) => {
      state.items.push(action.payload);
    },
    deleteContactAction: (state, action) => {
      state.items = state.items.filter((contact) => contact.id !== action.payload);
    },
    updateFilterAction: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export default contactsSlice.reducer;
export const { addContactAction, deleteContactAction, updateFilterAction } = contactsSlice.actions;