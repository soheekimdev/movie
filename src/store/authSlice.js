import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../api/supabase';

const initialState = {
  user: null,
  loading: true,
  error: null,
};

// 비동기 액션 생성
export const initializeAuth = createAsyncThunk('auth/initialize', async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.user ?? null;
});

export const signIn = createAsyncThunk('auth/signIn', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.user;
  } catch (error) {
    let errorMessage = '로그인에 실패했습니다.';
    if (error.message?.includes('Invalid login credentials')) {
      errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
    } else if (error.message?.includes('Email not confirmed')) {
      errorMessage = '이메일 인증이 필요합니다. 이메일을 확인해주세요.';
    }
    return rejectWithValue(errorMessage);
  }
});

export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
  try {
    await supabase.auth.signOut();
    return null;
  } catch (error) {
    return rejectWithValue('로그아웃 중 오류가 발생했습니다.');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // initializeAuth
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // signIn
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // signOut
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;