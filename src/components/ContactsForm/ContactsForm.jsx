import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { add } from 'redux/phonebook/phonebookSlice';


import {
  Form,
  FormField,
  InputField,
  StyledButton,
  LabelWrapper,
  ErrorMessage,
} from './ContactsForm.styled';


function ContactsForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatcher = useDispatch();


  const contacts = useSelector(state => state.contacts);


  const onNameChange = e => {
    setName(e.target.value);
  };


  const onInputChange = e => {
    setNumber(e.target.value);
  };


  const handleSubmit = e => {
    e.preventDefault();
    const newContact = {
      id: nanoid(),
      name: e.target.elements.name.value,
      number: e.target.elements.number.value,
    };
    if (contacts.contacts.find(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())) {
      return alert(`${newContact.name} is already in contacts.`);
    }
    dispatcher(add(newContact));
    e.target.reset();
  };


  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormField htmlFor="name">
          <LabelWrapper>Name:</LabelWrapper>
          <InputField
            type="text"
            name="name"
            placeholder="name"
            onChange={onNameChange}
            value={name || ''}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErrorMessage name="name" component="span" />
        </FormField>
        <FormField htmlFor="number">
          <LabelWrapper>Number:</LabelWrapper>
          <InputField
            type="phone"
            name="number"
            placeholder="tel number"
            onChange={onInputChange}
            value={number || ''}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <ErrorMessage name="number" component="span" />
        </FormField>
        <StyledButton type="submit">AddContact</StyledButton>
      </Form>
    </>
  );
}

export default ContactsForm;
