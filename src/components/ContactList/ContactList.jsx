import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ContactItem, DeleteButton } from './ContactList.styled';
import { fetchContactsThunk,  deleteContactThunk} from 'redux/phonebook/phonebook-operations';

function ContactList() {
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(fetchContactsThunk());
  }, [dispatcher]);
  const contacts = useSelector(state => state.contacts.contacts);
  console.log(contacts);
  const filter = useSelector(state => state.contacts.filter);
  const filteredContacts = contacts.filter(el =>
    el.name.toLowerCase().includes(filter.toLocaleLowerCase())
  );
  const onDelete = id => dispatcher(deleteContactThunk(id));

  return (
    <List>
      {filteredContacts
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