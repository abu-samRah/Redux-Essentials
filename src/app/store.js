import { configureStore } from '@reduxjs/toolkit'
import postsSlices from '../features/posts/postsSlices'

export default configureStore({
  reducer: { posts: postsSlices },
})
