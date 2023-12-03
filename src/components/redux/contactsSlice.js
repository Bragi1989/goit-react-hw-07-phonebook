import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = 'https://656bc56ae1e03bfd572dd2a0.mockapi.io/goit-react-hw-07-phonebook';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await axios.get(`${baseUrl}/contacts`);
  return response.data;
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
  try {
    const response = await axios.post(`${baseUrl}/contacts`, contact);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
  await axios.delete(`${baseUrl}/contacts/${contactId}`);
  return contactId;
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null, filter: '' },
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload.map((contact) => ({
          id: contact.id,
          name: contact.name,
          number: contact.number || '',
        }));
        state.isLoading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        const newContact = action.payload;
        const isContactUnique = !state.items.some(
          (existingContact) => existingContact.name.toLowerCase() === newContact.name.toLowerCase()
        );

        if (isContactUnique) {
          state.items.push(newContact);
        } else {
          toast.error('Контакт не уникальный!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
        }
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      });
  },
});

export const { updateFilter: updateFilterAction } = contactsSlice.actions;
export const selectContacts = (state) => {
  const filter = state.contacts.filter.toLowerCase();
  return state.contacts.items.filter(
    (contact) => contact.name.toLowerCase().includes(filter) || contact.number.includes(filter)
  );
};
export const selectFilter = (state) => state.contacts.filter;

export default contactsSlice.reducer;