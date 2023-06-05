import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ContactItem, DeleteButton } from './ContactList.styled';
import { remove } from 'redux/phonebook/phonebookSlice';

function ContactList() {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatcher = useDispatch();
  const onDelete = id => dispatcher(remove(id));

  return (
    <List>
      {contacts
        .filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
        .map(({ id, name, number }) => {
          return (
            <ContactItem key={id}>
              <span>{name} :</span>
              <span>{number}</span>
              <DeleteButton type="button" onClick={() => onDelete(id)}>
                Remove
              </DeleteButton>
            </ContactItem>
          );
        })}
    </List>
  );
}

export default ContactList;