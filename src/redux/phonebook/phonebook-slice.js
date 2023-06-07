import { createSlice } from '@reduxjs/toolkit';

import {
  fetchContactsThunk,
  addContactThunk,
  deleteContactThunk,
} from './phonebook-operations';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => { builder
    .addCase(fetchContactsThunk.pending, (state, _) => {
      state.isLoading = true;
    })
    .addCase(fetchContactsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      })
    .addCase(fetchContactsThunk.fulfilled, (state, { payload }) => {
      state.contacts = payload;
      state.isLoading = false;
    })
    .addCase(addContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.push(payload);
        state.isLoading = false;
    })
    .addCase(addContactThunk.pending, (state, _) => {
        state.isLoading = true;
    })
    .addCase(addContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
    })
    .addCase(deleteContactThunk.pending, (state, _) => {
        state.isLoading = true;
    })
    .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        const contactId = state.contacts.findIndex(
          item => item.id === payload);
        state.contacts.items.splice(contactId, 1);
        state.isLoading = false;
    })
    .addCase(deleteContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
    })
  }
})

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: { setFilter: (state, action) => (state = action.payload) },
});

export const { setFilter } = filterSlice.actions;
export const contactsReducer = contactsSlice.reducer;
export const filterReducer = filterSlice.reducer;
