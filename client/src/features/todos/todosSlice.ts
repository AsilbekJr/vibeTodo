import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

interface TodosState {
  items: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  status: 'idle',
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (title: string) => {
  const response = await axios.post(API_URL, { title });
  return response.data;
});

export const updateTodoItem = createAsyncThunk('todos/updateTodo', async ({ id, completed, title }: { id: string; completed?: boolean; title?: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, { completed, title });
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error fetching todos';
      })
      // Optimistic Add Todo
      .addCase(addTodo.pending, (state, action) => {
        const tempTodo: Todo = {
          id: action.meta.requestId, // Use requestId as temp ID
          title: action.meta.arg,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          completedAt: null,
        };
        state.items.unshift(tempTodo);
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        // Find the temp item by requestId (which we used as ID) and replace it
        const index = state.items.findIndex(t => t.id === action.meta.requestId);
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          // Fallback if not found (shouldn't happen usually)
          state.items.unshift(action.payload);
        }
      })
      .addCase(addTodo.rejected, (state, action) => {
        // Remove the temp item if request failed
        state.items = state.items.filter(t => t.id !== action.meta.requestId);
        state.error = action.error.message || 'Failed to add todo';
      })
      .addCase(updateTodoItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      });
  },
});

export const selectTodos = (state: any) => state.todos.items;

export default todosSlice.reducer;
