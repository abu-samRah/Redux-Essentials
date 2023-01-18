import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectPosts,
  fetchPosts,
  selectPostsStatus,
  selectError,
  STATUS,
} from './postsSlice'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { Spinner } from '../../components/Spinner'

const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

const PostsList = () => {
  const dispatch = useDispatch()

  const posts = useSelector(selectPosts)
  const postsStatus = useSelector(selectPostsStatus)
  const error = useSelector(selectError)

  useEffect(() => {
    // Why useEffect??
    if (postsStatus === STATUS.idle) {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])

  let content

  if (postsStatus === STATUS.loading) {
    content = <Spinner text="Loading..." />
  } else if (postsStatus === STATUS.succeeded) {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postsStatus === STATUS.failed) {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList
