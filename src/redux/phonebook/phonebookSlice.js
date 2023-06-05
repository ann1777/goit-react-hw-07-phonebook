import { createSlice } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
  },
  reducers: {
    add: (state, { payload }) => {
      const isPresent = state.contacts.find(
        contact => contact.name.toLowerCase() === payload.name.toLowerCase()
      );
      if (isPresent) {
        alert(`${payload.name} is already in contacts`);
        return;
      } else {
        state.contacts.push(payload);
      }
    },
    remove: (state, { payload }) => {
      state.contacts = state.contacts.filter(({ id }) => id !== payload);
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { add, remove, setFilter } = contactsSlice.actions;
