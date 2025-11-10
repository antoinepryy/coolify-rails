import React, { useState, useEffect } from 'react';
import { postsApi, usersApi } from '../services/api';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', user_id: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        postsApi.getPosts(),
        usersApi.getUsers()
      ]);
      setPosts(postsResponse.data);
      setUsers(usersResponse.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postsApi.createPost(formData);
      setFormData({ title: '', content: '', user_id: '' });
      fetchData();
    } catch (err) {
      setError('Failed to create post');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Posts</h2>
      
      <div className="create-form">
        <h3>Create New Post</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Post title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="content"
            placeholder="Post content"
            value={formData.content}
            onChange={handleInputChange}
            required
            rows={4}
          />
          <select
            name="user_id"
            value={formData.user_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button type="submit">Create Post</button>
        </form>
      </div>

      {error && <div className="error">Error: {error}</div>}
      
      <div className="posts-list">
        <h3>All Posts</h3>
        {posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <article key={post.id} className="post-card">
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                <div className="post-meta">
                  <small>By: {getUserName(post.user_id)}</small>
                  <small>Created: {new Date(post.created_at).toLocaleDateString()}</small>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Posts;