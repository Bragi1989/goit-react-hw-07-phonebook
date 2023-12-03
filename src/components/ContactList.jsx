import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, selectContacts } from './redux/contactsSlice';
import css from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contactList = useSelector(selectContacts);

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <ul className={css.contactlistForm}>
        {contactList.map((contact, index) => (
          <li className={css.contactlistName} key={`${contact.id}-${index}`}>
            <div>
              <strong>Name:</strong> {contact.name}
            </div>
            <div>
              <strong>Number:</strong> {contact.number || 'No number available'}
            </div>
            <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;