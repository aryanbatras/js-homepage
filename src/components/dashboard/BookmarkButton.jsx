import React, { useState, useEffect } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { CiBookmark } from 'react-icons/ci';
import { useUserProfile } from '../../hooks/useUserProfile.js';
import styles from './BookmarkButton.module.sass';

export default function BookmarkButton({ problem }) {
  const { bookmarkProblem, removeBookmark, isBookmarked } = useUserProfile();
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkBookmarkStatus();
  }, [problem]);

  const checkBookmarkStatus = async () => {
    try {
      const bookmarked = await isBookmarked(problem.title);
      setIsBookmarkedState(bookmarked);
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    }
  };

  const handleBookmarkToggle = async () => {
    if (loading) return;

    setLoading(true);
    try {
      if (isBookmarkedState) {
        await removeBookmark(problem.title);
        setIsBookmarkedState(false);
      } else {
        await bookmarkProblem({
          id: problem.title,
          title: problem.title,
          category: problem.category || 'general',
          difficulty: problem.difficulty || 'easy'
        });
        setIsBookmarkedState(true);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`${styles.bookmarkButton} ${isBookmarkedState ? styles.bookmarked : ''}`}
      onClick={handleBookmarkToggle}
      disabled={loading}
      title={isBookmarkedState ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarkedState ? <CiBookmark /> : <FaBookmark />}
      <span>{isBookmarkedState ? 'Bookmarked' : 'Bookmark'}</span>
    </button>
  );
}
