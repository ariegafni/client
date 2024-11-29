import React from 'react';
import styles from './PostList.module.css';

const PostList = ({ posts, onSelectPost }) => {
  return (
    <div className={styles['posts-container']}>
      {posts.map(post => (
        <div 
          key={post._id} 
          onClick={() => onSelectPost(post)}
          className={styles['post-card']}
        >
          <h2 className={styles['post-title']}>{post.title}</h2>
          <p className={styles['post-author']}>נכתב על ידי:  {post.name}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
