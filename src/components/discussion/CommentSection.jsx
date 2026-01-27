import React, { useState } from 'react';
import { FaUser, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDiscussion } from '../../hooks/useDiscussion';
import styles from './CommentSection.module.sass';

export default function CommentSection({ problemId }) {
  const { comments, addComment, likeComment, canComment, loading } = useDiscussion(problemId);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!canComment) {
      setShowLoginDialog(true);
      return;
    }

    setSubmitting(true);
    try {
      await addComment(newComment);
      setNewComment('');
    } catch (error) {
      if (error.message.includes('login')) {
        setShowLoginDialog(true);
      } else {
        alert(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
    setShowLoginDialog(false);
  };

  const handleLikeClick = async (commentId) => {
    try {
      await likeComment(commentId);
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading comments...</div>;
  }

  return (
    <div className={styles.container}>
      <h3>Discussion ({comments.length})</h3>
      
      {canComment ? (
        <form onSubmit={handleSubmit} className={styles.commentForm}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className={styles.textarea}
            rows={3}
          />
          <button 
            type="submit" 
            disabled={submitting || !newComment.trim()}
            className={styles.submitButton}
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <div className={styles.loginPrompt}>
          <p>Please login with GitHub to participate in discussions</p>
          <button onClick={handleLoginRedirect} className={styles.loginButton}>
            Login with GitHub
          </button>
        </div>
      )}

      {showLoginDialog && (
        <div className={styles.dialogOverlay} onClick={() => setShowLoginDialog(false)}>
          <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <h3>Login Required</h3>
            <p>Please login with GitHub to comment on discussions</p>
            <div className={styles.dialogActions}>
              <button 
                onClick={handleLoginRedirect} 
                className={styles.primaryButton}
              >
                Login with GitHub
              </button>
              <button 
                onClick={() => setShowLoginDialog(false)} 
                className={styles.secondaryButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.commentsList}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.commentHeader}>
              {comment.avatar ? (
                <img 
                  src={comment.avatar} 
                  alt={comment.username}
                  className={styles.avatar}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  <FaUser />
                </div>
              )}
              <div className={styles.userInfo}>
                <span className={styles.username}>{comment.username}</span>
                <span className={styles.timestamp}>
                  {comment.timestamp?.toDate()?.toLocaleString() || 'Just now'}
                </span>
              </div>
            </div>
            <p className={styles.commentText}>{comment.comment}</p>
            <div className={styles.commentActions}>
              <button 
                onClick={() => handleLikeClick(comment.id)}
                className={styles.likeButton}
              >
                <FaHeart />
                <span>{comment.likes || 0}</span>
              </button>
            </div>
          </div>
        ))}
        
        {comments.length === 0 && (
          <p className={styles.noComments}>No comments yet. Be the first to share!</p>
        )}
      </div>
    </div>
  );
}
