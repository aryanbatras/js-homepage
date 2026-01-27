import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { addComment, addSolution, getComments, getSolutions, likeComment, unlikeComment, addSubmission, getSubmissions, upvoteSubmission, downvoteSubmission } from '../services/database';

export const useDiscussion = (problemId) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [submissions, setSubmissions] = useState([]);
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
    
    const unsubscribeSubmissions = getSubmissions(problemId, (submissionsData) => {
      setSubmissions(submissionsData);
    });
    
    return () => {
      unsubscribeComments();
      unsubscribeSolutions();
      unsubscribeSubmissions();
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

  const handleUpvoteSubmission = async (submissionId) => {
    try {
      await upvoteSubmission(problemId, submissionId, user?.id);
    } catch (error) {
      console.error('Error upvoting submission:', error);
      throw error;
    }
  };

  const handleDownvoteSubmission = async (submissionId) => {
    try {
      await downvoteSubmission(problemId, submissionId, user?.id);
    } catch (error) {
      console.error('Error downvoting submission:', error);
      throw error;
    }
  };

  const validateCode = (code) => {
    try {
      // Just try to run the JavaScript code and catch any errors
      new Function(code)();
      return { valid: true, errors: [] };
    } catch (error) {
      return { 
        valid: false, 
        errors: [error.message] 
      };
    }
  };

  const handleAddSubmission = async (approach, code, description) => {
    if (!user) {
      throw new Error('Must be logged in to submit solution');
    }
    
    if (user.isGuest) {
      throw new Error('Please login with GitHub to submit solutions');
    }

    // Validate code before submission
    const validation = validateCode(code);
    if (!validation.valid) {
      throw new Error(`Code validation failed: ${validation.errors.join(', ')}`);
    }
    
    try {
      await addSubmission(
        problemId,
        user.id,
        user.login,
        user.avatar_url,
        approach,
        code,
        description
      );
    } catch (error) {
      console.error('Error adding submission:', error);
      throw error;
    }
  };

  return {
    comments,
    solutions,
    submissions,
    loading,
    addComment: handleAddComment,
    addSolution: handleAddSolution,
    addSubmission: handleAddSubmission,
    likeComment: handleLikeComment,
    upvoteSubmission: handleUpvoteSubmission,
    downvoteSubmission: handleDownvoteSubmission,
    canComment: user && !user.isGuest
    // canComment: true // let it be for testing
  };
};
