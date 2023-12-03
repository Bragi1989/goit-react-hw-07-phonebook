import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://656bc56ae1e03bfd572dd2a0.mockapi.io/goit-react-hw-07-phonebook';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await axios.get(`${baseUrl}/contacts`);
  return response.data;
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
  const response = await axios.post(`${baseUrl}/contacts`, contact);
  return response.data;
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
  await axios.delete(`${baseUrl}/contacts/${contactId}`);
  return contactId;
});

export const updateFilter = createSlice({
  name: 'contacts',
  initialState: { filter: '' },
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const selectContacts = (state) => state.contacts.items;

export const { updateFilter: updateFilterAction } = updateFilter.actions;

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null },
  reducers: {
    addContact: (state, action) => {
      if (Array.isArray(action.payload)) {
        const newContacts = action.payload.filter((newContact) => {
          const existingContactIndex = state.items.findIndex(
            (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
          );
          return existingContactIndex === -1;
        });

        state.items.push(...newContacts);
      } else {
        const { id, name, number } = action.payload;

        if (name && number) {
          const existingContactIndex = state.items.findIndex(
            (contact) => contact.name.toLowerCase() === name.toLowerCase()
          );

          if (existingContactIndex === -1) {
            state.items.push({ id, name, number });
          } else {
            alert('Contact is not unique!');
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      });
  },
});

export const { addContact: addContactAction, deleteContact: deleteContactAction, fetchContacts: fetchContactsAction } = contactsSlice.actions;
export default contactsSlice.reducer;