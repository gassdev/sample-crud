import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import PostService from '../services/PostService'
import { v4 as uuidv4 } from 'uuid'

const initialState = []

export const createPost = createAsyncThunk(
  'post/new',
  async ({ id, title, content }) => {
    const res = await PostService.create({
      id: uuidv4(),
      title,
      content,
    })
    return res.data
  },
)

export const getAllPosts = createAsyncThunk('posts/', async () => {
  const res = await PostService.getAll()
  return res.data
})

export const updatePost = createAsyncThunk(
  'posts/update',
  async ({ id, data }) => {
    const res = await PostService.update(id, data)
    return res.data
  },
)

export const deletePost = createAsyncThunk('posts/delete', async ({ id }) => {
  await PostService.remove(id)
  return { id }
})

const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: {
    [createPost.fulfilled]: (state, action) => {
      state.push(action.payload)
    },
    [getAllPosts.fulfilled]: (state, action) => {
      return [...action.payload]
    },
    [updatePost.fulfilled]: (state, action) => {
      const index = state.findIndex((post) => post.id === action.payload.id)
      state[index] = {
        ...state[index],
        ...action.payload,
      }
    },
    [deletePost.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id)
      state.splice(index, 1)
    },
  },
})

const { reducer } = postSlice
export default reducer
