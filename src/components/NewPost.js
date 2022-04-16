import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPost } from '../slices/posts'
import { useNavigate } from 'react-router-dom'

const NewPost = () => {
  const initalPostState = {
    title: '',
    content: '',
  }

  const [post, setPost] = useState(initalPostState)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setPost({ ...post, [name]: value })
  }

  const savePost = () => {
    const { title, content } = post

    dispatch(createPost({ title, content }))
      .unwrap()
      .then((data) => {
        console.log(data)
        setPost({
          id: data.id,
          title: data.title,
          content: data.content,
        })
        navigate('/')
      })
      .catch((e) => {
        console.log(e)
      })
  }
  return (
    <div>
      <h1>New Post</h1>

      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Post title"
              name="title"
              value={post.title || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <input
              type="text"
              className="form-control"
              placeholder="Post content"
              name="content"
              value={post.content || ''}
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={savePost} className="btn btn-primary">
            Add Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewPost
