import React, { useState } from 'react';
import { addComment, getComments } from '../../services/database';
import styles from './TestFirebase.module.sass';

export default function TestFirebase() {
  const [testProblemId] = useState('test-problem-123');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const testAddComment = async () => {
    if (!comment.trim()) return;
    
    setLoading(true);
    try {
      await addComment(
        testProblemId,
        'test-user-123',
        'TestUser',
        'https://github.com/github.png',
        comment
      );
      setComment('');
      alert('Comment added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding comment: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = () => {
    getComments(testProblemId, (data) => {
      setComments(data);
    });
  };

  return (
    <div className={styles.container}>
      <h2>Firebase Integration Test</h2>
      <p><strong>Problem ID:</strong> {testProblemId}</p>
      
      <div className={styles.testSection}>
        <h3>Add Test Comment</h3>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter test comment"
          className={styles.input}
        />
        <button 
          onClick={testAddComment}
          disabled={loading}
          className={styles.button}
        >
          {loading ? 'Adding...' : 'Add Comment'}
        </button>
      </div>

      <div className={styles.testSection}>
        <h3>Load Comments</h3>
        <button onClick={loadComments} className={styles.button}>
          Load Comments ({comments.length})
        </button>
        
        <div className={styles.commentsList}>
          {comments.map((c) => (
            <div key={c.id} className={styles.comment}>
              <strong>{c.username}:</strong> {c.comment}
              <br />
              <small>{c.timestamp?.toDate()?.toLocaleString()}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
