import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import PostService from '../services/PostService'
import { updatePost } from '../slices/posts'

const EditPost = () => {
  let params = useParams()
  const initalPostState = {
    id: null,
    title: '',
    content: '',
  }
  const [post, setPost] = useState(initalPostState)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    PostService.get(params.id)
      .then((res) => {
        setPost(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [params.id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPost({ ...post, [name]: value })
  }

  const savePost = () => {
    dispatch(updatePost({ id: post.id, data: post }))
      .unwrap()
      .then((res) => {
        navigate('/')
      })
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <h1>Update Post</h1>

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
              required
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
              required
            />
          </div>
          <button type="submit" onClick={savePost} className="btn btn-primary">
            Update Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditPost
