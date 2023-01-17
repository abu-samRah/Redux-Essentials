import { useSelector } from 'react-redux'
import { selectPosById } from './postsSlices'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const post = useSelector(selectPosById(postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
      </article>
    </section>
  )
}
