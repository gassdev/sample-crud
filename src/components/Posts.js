import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { deletePost, getAllPosts } from '../slices/posts'
import { Link } from 'react-router-dom'

const Posts = () => {
  const posts = useSelector((state) => state.posts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  const removePost = (id) => {
    dispatch(deletePost({ id }))
      .unwrap()
      .then(() => {
        dispatch(getAllPosts())
      })
      .catch((e) => console.log(e))
  }

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <h3>All Posts</h3>

        <ul className="list-group">
          {posts &&
            posts.map((p) => (
              <li key={p.id} className="list-group-item">
                <span className="float-left">{p.title}</span>
                <span className="float-right">
                  <button
                    onClick={() => removePost(p.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Remove
                  </button>
                </span>
                <span className="float-right">
                  <Link
                    to={`/post/edit/${p.id}`}
                    className="btn btn-sm btn-warning ml-2 mr-2"
                  >
                    Edit
                  </Link>
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Posts
