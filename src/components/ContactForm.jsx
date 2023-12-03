import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, selectContacts } from './redux/contactsSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import css from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingContact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());

    if (existingContact) {
      toast.error(`${name} уже существует в списке контактов.`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    } else {
      dispatch(addContact({ name, number }))
        .then(() => {
          toast.success(`${name} успешно добавлен в список контактов.`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
          setName('');
          setNumber('');
        })
        .catch((error) => {
          console.error('Ошибка при добавлении контакта:', error);
        });
    }
  };

  return (
    <form className={css.contactForm} onSubmit={handleSubmit}>
      <p className={css.contactName}>Name</p>
      <input type="text" name="name" value={name} onChange={handleNameChange} required />
      <p className={css.contactName}>Number</p>
      <input type="tel" name="number" value={number} onChange={handleNumberChange} required />
      <button className={css.contactButton} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;