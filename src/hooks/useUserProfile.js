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
      const currentSolvedCount = solvedProblems.length;
      const currentStreak = streakResult?.currentStreak || 0;
      const totalXP = progress?.xpEarned || 0;
      
      // Problem solving milestones
      if (currentSolvedCount === 0) {
        achievementsToAward.push({
          id: 'first-problem',
          name: '🎯 Hello World!',
          description: 'Solved your first problem',
          icon: '🎯',
          category: 'milestone',
          rarity: 'common',
          xpBonus: 10
        });
      }
      
      if (currentSolvedCount === 9) {
        achievementsToAward.push({
          id: 'ten-problems',
          name: '🌟 Getting Started',
          description: 'Solved 10 problems',
          icon: '🌟',
          category: 'milestone',
          rarity: 'common',
          xpBonus: 25
        });
      }
      
      if (currentSolvedCount === 24) {
        achievementsToAward.push({
          id: 'twenty-five-problems',
          name: '🚀 Rising Star',
          description: 'Solved 25 problems',
          icon: '🚀',
          category: 'milestone',
          rarity: 'uncommon',
          xpBonus: 50
        });
      }
      
      if (currentSolvedCount === 49) {
        achievementsToAward.push({
          id: 'fifty-problems',
          name: '⭐ Problem Solver',
          description: 'Solved 50 problems',
          icon: '⭐',
          category: 'milestone',
          rarity: 'rare',
          xpBonus: 75
        });
      }
      
      if (currentSolvedCount === 99) {
        achievementsToAward.push({
          id: 'hundred-problems',
          name: '🏆 JavaScript Master',
          description: 'Solved 100 problems',
          icon: '�',
          category: 'milestone',
          rarity: 'epic',
          xpBonus: 100
        });
      }
      
      // Streak achievements
      if (currentStreak === 3 && !achievements.some(a => a.id === 'three-day-streak')) {
        achievementsToAward.push({
          id: 'three-day-streak',
          name: '🔥 On Fire!',
          description: '3 day solving streak',
          icon: '🔥',
          category: 'streak',
          rarity: 'common',
          xpBonus: 15
        });
      }
      
      if (currentStreak === 7 && !achievements.some(a => a.id === 'week-streak')) {
        achievementsToAward.push({
          id: 'week-streak',
          name: '💪 Weekly Warrior',
          description: '7 day solving streak',
          icon: '💪',
          category: 'streak',
          rarity: 'uncommon',
          xpBonus: 30
        });
      }
      
      if (currentStreak === 30 && !achievements.some(a => a.id === 'month-streak')) {
        achievementsToAward.push({
          id: 'month-streak',
          name: '👑 Monthly Master',
          description: '30 day solving streak',
          icon: '👑',
          category: 'streak',
          rarity: 'epic',
          xpBonus: 100
        });
      }
      
      // XP achievements
      if (totalXP >= 100 && totalXP < 200 && !achievements.some(a => a.id === 'century-xp')) {
        achievementsToAward.push({
          id: 'century-xp',
          name: '💎 Century Club',
          description: 'Earned 100+ XP',
          icon: '💎',
          category: 'xp',
          rarity: 'uncommon',
          xpBonus: 20
        });
      }
      
      if (totalXP >= 500 && totalXP < 600 && !achievements.some(a => a.id === 'half-thousand-xp')) {
        achievementsToAward.push({
          id: 'half-thousand-xp',
          name: '🌟 XP Hunter',
          description: 'Earned 500+ XP',
          icon: '🌟',
          category: 'xp',
          rarity: 'rare',
          xpBonus: 50
        });
      }
      
      if (totalXP >= 1000 && !achievements.some(a => a.id === 'thousand-xp')) {
        achievementsToAward.push({
          id: 'thousand-xp',
          name: '🏆 XP Legend',
          description: 'Earned 1000+ XP',
          icon: '🏆',
          category: 'xp',
          rarity: 'legendary',
          xpBonus: 200
        });
      }
      
      // Difficulty-specific achievements
      if (problemData.difficulty === 'hard') {
        const hardSolved = solvedProblems.filter(p => p.difficulty === 'hard').length;
        if (hardSolved === 1) {
          achievementsToAward.push({
            id: 'first-hard',
            name: '💪 Hard Mode Activated',
            description: 'Solved your first hard problem',
            icon: '💪',
            category: 'difficulty',
            rarity: 'uncommon',
            xpBonus: 20
          });
        }
        
        if (hardSolved === 10) {
          achievementsToAward.push({
            id: 'ten-hard',
            name: '🔥 Hard Core',
            description: 'Solved 10 hard problems',
            icon: '🔥',
            category: 'difficulty',
            rarity: 'rare',
            xpBonus: 50
          });
        }
      }
      
      // Consistency achievements
      if (currentSolvedCount > 0 && currentSolvedCount % 5 === 0) {
        const achievementId = `consistent-${currentSolvedCount}`;
        if (!achievements.some(a => a.id === achievementId)) {
          achievementsToAward.push({
            id: achievementId,
            name: '📈 Consistent Coder',
            description: `Solved ${currentSolvedCount} problems consistently`,
            icon: '📈',
            category: 'consistency',
            rarity: currentSolvedCount < 20 ? 'common' : currentSolvedCount < 50 ? 'uncommon' : 'rare',
            xpBonus: Math.floor(currentSolvedCount / 5) * 5
          });
        }
      }
      
      // Award achievements
      for (const achievement of achievementsToAward) {
        await addAchievement(username, achievement);
      }
      
      return achievementsToAward;
    } catch (error) {
      console.error('Error checking achievements:', error);
      return [];
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
