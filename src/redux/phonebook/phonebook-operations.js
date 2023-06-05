import { createAsyncThunk } from '@reduxjs/toolkit';
import * as mockApi from 'services/mock-api';

export const fetchContacts = createAsyncThunk(
    'phonebook/fetchContacks',
    async (_, {rejectWithValue}) => {
        try {
            const { data } = await mockApi.fetchContacts();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const postContacts = createAsyncThunk(
    'phonebook/postContacts',
    async (data, {rejectWithValue}) => {
        try {
            const post = await mockApi.postContacts(data);
            return post;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteContacts = createAsyncThunk(
    'phonebook/deleteContacts',
    async (id, {rejectWithValue}) => {
        try {
            const remove = await mockApi.deleteContacts(id);
            return remove;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);