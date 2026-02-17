import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

const user = JSON.parse(localStorage.getItem('user'));

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await axios.post('/api/auth/login', userData);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await axios.post('/api/auth/register', userData);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user, isLoading: false, error: null },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.isLoading = true; })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
