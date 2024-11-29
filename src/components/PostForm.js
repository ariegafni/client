import React, { useState } from 'react';
import axios from 'axios';
import styles from './PostForm.module.css';

const PostForm = ({ onPostAdded }) => {
  const [newPost, setNewPost] = useState({
    name: '',
    title: '',
    content: ''
  });

  const handleChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    });
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/posts', newPost)
      .then(response => {
        onPostAdded(response.data);
        setNewPost({ name: '', title: '', content: '' });
      })
      .catch(error => console.error('There was an error adding the post!', error));
  };

  return (
    <form className={styles.form} onSubmit={handleAddPost}>
      <div className={styles.inputGroup}>
        <label htmlFor="name" className={styles.label}>שם הכותב/ת</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="הכנס/י את שמך"
          value={newPost.name}
          onChange={handleChange}
          required
          className={styles.input}
          dir="rtl"
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="title" className={styles.label}>כותרת</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="הכנס/י כותרת לפוסט"
          value={newPost.title}
          onChange={handleChange}
          required
          className={styles.input}
          dir="rtl"
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="content" className={styles.label}>תוכן</label>
        <textarea
          id="content"
          name="content"
          placeholder="כתוב/י את תוכן הפוסט כאן..."
          value={newPost.content}
          onChange={handleChange}
          required
          className={styles.textarea}
          dir="rtl"
        />
      </div>
      
      <button type="submit" className={styles.submitButton}>
        פרסם פוסט
      </button>
    </form>
  );
}

export default PostForm;