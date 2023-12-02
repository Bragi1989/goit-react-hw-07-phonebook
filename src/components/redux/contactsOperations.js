import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  try {
    const response = await axios.get('http://localhost:goit-react-hw-07-phonebook/contacts'); 
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
  try {
    const response = await axios.post('/goit-react-hw-07-phonebook/contacts', contact); 
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
  try {
    await axios.delete(`http://localhost:goit-react-hw-07-phonebook/contacts/${contactId}`); 
    return contactId;
  } catch (error) {
    throw error;
  }
});