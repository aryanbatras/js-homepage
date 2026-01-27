import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { addComment, addSolution, getComments, getSolutions, likeComment, unlikeComment } from '../services/database';

export const useDiscussion = (problemId) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!problemId) return;

    setLoading(true);
    
    const unsubscribeComments = getComments(problemId, (commentsData) => {
      setComments(commentsData);
      setLoading(false);
    });
    
    const unsubscribeSolutions = getSolutions(problemId, (solutionsData) => {
      setSolutions(solutionsData);
    });
    
    return () => {
      unsubscribeComments();
      unsubscribeSolutions();
    };
  }, [problemId]);

  const handleAddComment = async (comment, usernameOverride = null) => {
    if (!user) {
      throw new Error('Please login to comment');
    }
    
    if (user.isGuest) {
      throw new Error('Please login with GitHub to comment');
    }
    
    try {
      const finalUsername = user?.login || 'GuestUser';
      const finalAvatar = user?.avatar_url || null;
      const finalUserId = user?.id || `guest_${Date.now()}`;
      
      await addComment(
        problemId,
        finalUserId,
        finalUsername,
        finalAvatar,
        comment
      );
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const comment = comments.find(c => c.id === commentId);
      if (!comment) return;
      
      // Simple toggle - just increment or decrement
      const currentLikes = comment.likes || 0;
      if (currentLikes > 0) {
        await unlikeComment(problemId, commentId);
      } else {
        await likeComment(problemId, commentId);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  };

  const handleAddSolution = async (approach, code, language) => {
    if (!user) {
      throw new Error('Must be logged in to submit solution');
    }
    
    try {
      await addSolution(
        problemId,
        user.id,
        user.login,
        user.avatar_url,
        approach,
        code,
        language
      );
    } catch (error) {
      console.error('Error adding solution:', error);
      throw error;
    }
  };

  return {
    comments,
    solutions,
    loading,
    addComment: handleAddComment,
    addSolution: handleAddSolution,
    likeComment: handleLikeComment,
    canComment: user && !user.isGuest
  };
};
