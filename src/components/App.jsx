import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { fetchContacts } from './redux/contactsOperations';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.contacts?.filter || '');
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const error = useSelector((state) => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);


  const filteredContacts = useMemo(() => {
    return contacts
      ? contacts.filter((contact) =>
          contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
        )
      : [];
  }, [contacts, filter]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ContactList contacts={filteredContacts} />
      )}
    </div>
  );
};

export default App;



