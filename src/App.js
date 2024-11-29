import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import styles from './App.module.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(response => {
        // סדר את הפוסטים כך שהפוסט האחרון יופיע ראשון
        const sortedPosts = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(sortedPosts);
      })
      .catch(error => console.error('There was an error!', error));
  }, []);

  const handleSelectPost = (post) => {
    setSelectedPost(post);
  };

  const handlePostAdded = (newPost) => {
    setPosts([newPost, ...posts]); // הוסף את הפוסט החדש בראש
    setShowPostForm(false);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post));
  };

  const handlePostDeleted = (id) => {
    setPosts(posts.filter(post => post._id !== id));
  };

  const handleBackToPosts = () => {
    setSelectedPost(null); // חזרה לרשימת הפוסטים
  };

  return (
    <div className={styles['app-container']}>
      <div className={styles['content-wrapper']}>
        <h1 className={styles['main-title']}>בלוג לזכרו של משה סלומונס ז"ל</h1>

        <div className={styles['add-post-section']}>
          <button 
            onClick={() => setShowPostForm(!showPostForm)}
            className={styles['add-post-button']}
          >
            {showPostForm ? 'ביטול' : 'הוספת פוסט'}
          </button>
        </div>

        {/* הצגת טופס הוספת פוסט אם showPostForm הוא true */}
        {showPostForm && (
          <div className={styles['post-form-container']}>
            <PostForm onPostAdded={handlePostAdded} />
          </div>
        )}

        <div className={styles['posts-section']}>
          {/* הצגת הפוסטים אם לא נבחר פוסט */}
          {!selectedPost && <PostList posts={posts} onSelectPost={handleSelectPost} />}

          {/* הצגת הפוסט הנבחר עם כפתור חזרה */}
          {selectedPost && (
            <div className={styles['selected-post']}>
              <h2 className={styles['selected-post-title']}>{selectedPost.title}</h2>
              <p className={styles['selected-post-content']}>{selectedPost.content}</p>
              <button onClick={handleBackToPosts} className={styles['back-to-posts-button']}>חזרה לרשימת הפוסטים</button>
            </div>
          )}
        </div>

        <div className={styles['admin-section']}>
          {/* הצגת טופס כניסת אדמין אם לא מחובר */}
          {!isAdmin && <AdminLogin onLogin={setIsAdmin} />}
          {/* הצגת לוח הבקרה של האדמין אם מחובר */}
          {isAdmin && <AdminPanel posts={posts} onPostUpdated={handlePostUpdated} onPostDeleted={handlePostDeleted} />}
        </div>
        <footer className={styles.footer}>
        <p>© 2024 נוצר על ידי אריה גפני</p>

        <a href="mailto:ariegafni18@gmail.com" className={styles.email}>ariegafni18@gmail.com</a>
        </footer>
      </div>
    </div>
  );
}

export default App;
