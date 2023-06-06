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
      state.contacts.items = payload;
      state.isLoading = false;
    })
    .addCase(addContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.items.push(payload);
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
        const contactId = state.contacts.items.findIndex(
          item => item.id === payload
        );
        state.contacts.items.splice(contactId, 1);
        // state.data = state.data.filter(({id}) => id !== payload);
        state.isLoading = false;
    })
    .addCase(deleteContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
    })
    .addMatcher(
      action => action.type.endsWith('/fulfilled'),
      state => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
      }
    )
    .addMatcher(
      action => action.type.endsWith('/pending'),
      state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      }
    )
    .addMatcher(
      action => action.type.endsWith('/rejected'),
      (state, action) => {
        state.contacts.error = action.payload;
        state.contacts.isLoading = false;
      })
    }
})

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: { setFilter: (_, action) => action.payload },
});

export const { setFilter } = filterSlice.actions;
