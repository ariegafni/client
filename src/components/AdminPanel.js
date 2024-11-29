import React from 'react';
import axios from 'axios';
import styles from './AdminPanel.module.css';

const AdminPanel = ({ posts, onPostUpdated, onPostDeleted }) => {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      axios.delete(`http://localhost:5000/api/posts/${id}`)
        .then(() => {
          onPostDeleted(id);
        })
        .catch(error => console.error('There was an error deleting the post!', error));
    }
  };

  const handleEdit = (id) => {
    const newContent = prompt("Enter new content:");
    if (newContent !== null) {
      axios.put(`http://localhost:5000/api/posts/${id}`, { content: newContent })
        .then(response => {
          onPostUpdated(response.data);
        })
        .catch(error => console.error('There was an error updating the post!', error));
    }
  };

  return (
    <div className={styles['admin-container']}>
      <h2 className={styles['admin-title']}>אזור מנהל</h2>
      <div className={styles['posts-grid']}>
        {posts.map(post => (
          <div key={post._id} className={styles['post-card']}>
            <div className={styles['post-header']}>
              <h3 className={styles['post-title']}>{post.title}</h3>
              <p className={styles['post-author']}>by {post.name}</p>
            </div>
            
            <div className={styles['post-content']}>
              {post.content.slice(0, 100)}...
            </div>
            
            <div className={styles['button-group']}>
              <button 
                onClick={() => handleEdit(post._id)}
                className={`${styles['admin-button']} ${styles['edit-button']}`}
              >
                ערוך
              </button>
              <button 
                onClick={() => handleDelete(post._id)}
                className={`${styles['admin-button']} ${styles['delete-button']}`}
              >
                מחק פוסט
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;