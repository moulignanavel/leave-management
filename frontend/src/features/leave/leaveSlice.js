import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

export const createLeave = createAsyncThunk('leave/create', async (leaveData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const response = await axios.post('/api/leaves', leaveData, getConfig(token));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const getMyLeaves = createAsyncThunk('leave/getMyLeaves', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const response = await axios.get('/api/leaves/my-leaves', getConfig(token));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const leaveSlice = createSlice({
  name: 'leave',
  initialState: { leaves: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyLeaves.fulfilled, (state, action) => {
        state.leaves = action.payload;
        state.isLoading = false;
      })
      .addCase(createLeave.fulfilled, (state, action) => {
        state.leaves.unshift(action.payload);
      });
  }
});

export default leaveSlice.reducer;
