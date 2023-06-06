import { createSlice } from '@reduxjs/toolkit';

import {
    fetchContactsThunk,
    postContactsThunk,
    deleteContactsThunk,
} from './phonebook-operations';

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
      contacts: [],
      isLoading: false,
      error: null,
    },
    extraReducers: {
        [fetchContactsThunk.pending](state, _) {
            state.isLoading = true;
        },

        [fetchContactsThunk.fulfilled](state, { payload }) {
            state.data = payload;
            state.isLoading = false;
        },

        [fetchContactsThunk.rejected](state, action) {
            state.isLoading = false;
            state.error = action;
        },

        [postContactsThunk.pending](state, _){
            state.isLoading = true;
        },

        [postContactsThunk.fulfilled](state, { payload }) {
            state.data.push(payload);
            state.isLoading = false;
          },

        [postContactsThunk.rejected](state, action) {
            state.isLoading = false;
            state.error = action;
        },

        [deleteContactsThunk.pending](state, _){
            state.isLoading = true;
        },

        [deleteContactsThunk.fulfilled](state, { payload }) {
            state.data = state.data.filter(({id}) => id !== payload);
            state.isLoading = false;
          },

        [deleteContactsThunk.rejected](state, action) {
            state.isLoading = false;
            state.error = action;
        },
    },

});

export const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: { setFilter: (_, action) => action.payload },
  });
  
export const { setFilter } = filterSlice.actions;
  




  