import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import EditPost from './components/EditPost'
import NewPost from './components/NewPost'
import Posts from './components/Posts'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  All Posts <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/post/new" className="nav-link">
                  New Post
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="jumbotron mb-4">
          <h1>Basic CRUD with redux Toolkit</h1>
        </div>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/post/new" element={<NewPost />} />
          <Route path="/post/edit/:id" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
