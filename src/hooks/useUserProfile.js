import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  getUserProfile, 
  getUserStreak, 
  getUserProgress, 
  getSolvedProblems, 
  getBookmarks, 
  getAchievements, 
  getUserActivity,
  isProblemBookmarked,
  addBookmark,
  removeBookmark,
  addSolvedProblem,
  updateUserProgress,
  updateUserStreak,
  addActivity,
  addAchievement
} from '../services/userProfile';

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [streak, setStreak] = useState(null);
  const [progress, setProgress] = useState(null);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.isGuest) {
      setLoading(false);
      return;
    }

    const username = user.login.toLowerCase();
    setLoading(true);

    // Set up all real-time listeners
    const unsubscribeProfile = getUserProfile(username, (data) => {
      setProfile(data);
    });

    const unsubscribeStreak = getUserStreak(username, (data) => {
      setStreak(data);
    });

    const unsubscribeProgress = getUserProgress(username, (data) => {
      setProgress(data);
    });

    const unsubscribeSolved = getSolvedProblems(username, (data) => {
      setSolvedProblems(data);
    });

    const unsubscribeBookmarks = getBookmarks(username, (data) => {
      setBookmarks(data);
    });

    const unsubscribeAchievements = getAchievements(username, (data) => {
      setAchievements(data);
    });

    const unsubscribeActivity = getUserActivity(username, (data) => {
      setActivity(data);
    });

    setLoading(false);

    return () => {
      unsubscribeProfile();
      unsubscribeStreak();
      unsubscribeProgress();
      unsubscribeSolved();
      unsubscribeBookmarks();
      unsubscribeAchievements();
      unsubscribeActivity();
    };
  }, [user]);

  const handleSolveProblem = async (problemData) => {
    if (!user || user.isGuest) return false;

    try {
      const username = user.login.toLowerCase();
      
      // Add to solved problems
      await addSolvedProblem(username, problemData);
      
      // Update progress
      await updateUserProgress(username, problemData, true);
      
      // Update streak
      const streakResult = await updateUserStreak(username);
      
      // Log activity
      await addActivity(username, {
        type: 'solved',
        problemId: problemData.id,
        problemTitle: problemData.title,
        xpGained: problemData.xp || 10
      });

      // Check for achievements
      await checkAndAwardAchievements(username, problemData, streakResult);
      
      return true;
    } catch (error) {
      console.error('Error marking problem as solved:', error);
      return false;
    }
  };

  const handleAttemptProblem = async (problemData) => {
    if (!user || user.isGuest) return false;

    try {
      const username = user.login.toLowerCase();
      
      // Update progress (attempted but not solved)
      await updateUserProgress(username, problemData, false);
      
      // Log activity
      await addActivity(username, {
        type: 'attempted',
        problemId: problemData.id,
        problemTitle: problemData.title,
        xpGained: 0
      });
      
      return true;
    } catch (error) {
      console.error('Error logging problem attempt:', error);
      return false;
    }
  };

  const handleBookmarkProblem = async (problemData) => {
    if (!user || user.isGuest) return false;

    try {
      const username = user.login.toLowerCase();
      await addBookmark(username, problemData);
      
      // Log activity
      await addActivity(username, {
        type: 'bookmarked',
        problemId: problemData.id,
        problemTitle: problemData.title,
        xpGained: 0
      });
      
      return true;
    } catch (error) {
      console.error('Error bookmarking problem:', error);
      return false;
    }
  };

  const handleRemoveBookmark = async (problemId) => {
    if (!user || user.isGuest) return false;

    try {
      const username = user.login.toLowerCase();
      await removeBookmark(username, problemId);
      
      return true;
    } catch (error) {
      console.error('Error removing bookmark:', error);
      return false;
    }
  };

  const checkIsBookmarked = async (problemId) => {
    if (!user || user.isGuest) return false;

    try {
      const username = user.login.toLowerCase();
      return await isProblemBookmarked(username, problemId);
    } catch (error) {
      console.error('Error checking bookmark status:', error);
      return false;
    }
  };

  const checkAndAwardAchievements = async (username, problemData, streakResult) => {
    try {
      const achievementsToAward = [];
      
      // First problem solved
      if (solvedProblems.length === 0) {
        achievementsToAward.push({
          id: 'first-problem',
          name: 'Hello World!',
          description: 'Solved your first problem',
          icon: '🎯',
          category: 'milestone',
          rarity: 'common',
          xpBonus: 10
        });
      }
      
      // 10 problems solved
      if (solvedProblems.length === 9) {
        achievementsToAward.push({
          id: 'ten-problems',
          name: 'Getting Started',
          description: 'Solved 10 problems',
          icon: '🌟',
          category: 'milestone',
          rarity: 'common',
          xpBonus: 25
        });
      }
      
      // 100 problems solved
      if (solvedProblems.length === 99) {
        achievementsToAward.push({
          id: 'hundred-problems',
          name: 'JavaScript Master',
          description: 'Solved 100 problems',
          icon: '🏆',
          category: 'milestone',
          rarity: 'rare',
          xpBonus: 100
        });
      }
      
      // Streak achievements
      if (streakResult && streakResult.isNewMilestone) {
        const streak = streakResult.currentStreak;
        let badgeName = '';
        let icon = '🔥';
        let rarity = 'common';
        let xpBonus = 20;
        
        if (streak === 7) {
          badgeName = 'Week Warrior';
          icon = '📅';
          rarity = 'common';
          xpBonus = 20;
        } else if (streak === 30) {
          badgeName = 'Monthly Master';
          icon = '🗓️';
          rarity = 'rare';
          xpBonus = 50;
        } else if (streak === 100) {
          badgeName = 'Century Streak';
          icon = '💎';
          rarity = 'epic';
          xpBonus = 200;
        } else if (streak === 365) {
          badgeName = 'Year of Code';
          icon = '🌟';
          rarity: 'legendary',
          xpBonus = 500;
        }
        
        if (badgeName) {
          achievementsToAward.push({
            id: `${streak}-day-streak`,
            name: badgeName,
            description: `Maintained a ${streak}-day streak`,
            icon: icon,
            category: 'streak',
            rarity: rarity,
            xpBonus: xpBonus
          });
        }
      }
      
      // Award achievements
      for (const achievement of achievementsToAward) {
        await addAchievement(username, achievement);
      }
      
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  };

  return {
    profile,
    streak,
    progress,
    solvedProblems,
    bookmarks,
    achievements,
    activity,
    loading,
    solveProblem: handleSolveProblem,
    attemptProblem: handleAttemptProblem,
    bookmarkProblem: handleBookmarkProblem,
    removeBookmark: handleRemoveBookmark,
    isBookmarked: checkIsBookmarked
  };
};
