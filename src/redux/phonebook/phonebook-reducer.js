import { createSlice } from '@reduxjs/toolkit';

import {
    fetchContacts,
    postContacts,
    deleteContacts,
} from './phonebook-operations';

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
      contacts: [],
      isLoading: false,
      error: null,
    },
    extraReducers: {
        [fetchContacts.pending](state, _) {
            state.isLoading = true;
        },

        [fetchContacts.fulfilled](state, { payload }) {
            state.data = payload;
            state.isLoading = false;
        },

        [fetchContacts.rejected](state, action) {
            state.isLoading = false;
            state.error = action;
        },

        [postContacts.pending](state, _){
            state.isLoading = true;
        },

        [postContacts.fulfilled](state, { payload }) {
            state.data.push(payload);
            state.isLoading = false;
          },

        [postContacts.rejected](state, action) {
            state.isLoading = false;
            state.error = action;
        },

        [deleteContacts.pending](state, _){
            state.isLoading = true;
        },

        [deleteContacts.fulfilled](state, { payload }) {
            state.data = state.data.filter(({id}) => id !== payload);
            state.isLoading = false;
          },

        [deleteContacts.rejected](state, action) {
            state.isLoading = false;
            state.error = action;
        },
    },

});


  