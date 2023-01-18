import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const STATUS = {
  idle: 'idle',
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed',
}

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await client.post('/fakeApi/posts', initialPost)
    return response.data
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const existingPost = state.data.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      const existingPost = state.data.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = STATUS.loading
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = STATUS.succeeded
        state.data = state.data.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = STATUS.failed
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.data.push(action.payload)
      })
  },
})

export const selectPosts = (state) => state.posts.data
export const selectPostsStatus = (state) => state.posts.status
export const selectError = (state) => state.posts.error
export const selectPostById = (id) => (state) =>
  state.posts.data.find((post) => post.id === id)

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
