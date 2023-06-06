import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import * as mockApi from 'services/mock-api';
axios.defaults.baseURL = 'https://647de0acaf984710854a85e8.mockapi.io/';

export const fetchContactsThunk = createAsyncThunk(
    'phonebook/fetchContacts',
    async (_, {rejectWithValue}) => {
        try {
            // const { data } = await mockApi.fetchContacts();
            const { data } = await axios.get('contacts');
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const postContactsThunk = createAsyncThunk(
    'phonebook/postContacts',
    async (contact, {rejectWithValue}) => {
        try {
            // const contacts = await mockApi.postContacts(contact);
            const { data } = await axios.post('contacts', contact);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteContactsThunk = createAsyncThunk(
    'phonebook/deleteContacts',
    async (id, {rejectWithValue}) => {
        try {
            // const contacts = await mockApi.deleteContacts(id);
            await axios.delete(`contacts/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
    {
		condition: (_, thunkAPI) => {
      const loading = thunkAPI.getState().contacts.isLoading;
			if (loading) {
				return false
			}
		}
	}
);