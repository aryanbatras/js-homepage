import { doc, setDoc, getDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove, increment, serverTimestamp, collection, query, where, orderBy, limit, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

// Initialize user profile when they first login
export const initializeUserProfile = async (githubUser) => {
  try {
    const userRef = doc(db, 'users', githubUser.login.toLowerCase());
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // Create new user profile
      await setDoc(userRef, {
        githubUsername: githubUser.login,
        avatar: githubUser.avatar_url,
        displayName: githubUser.name || githubUser.login,
        bio: githubUser.bio || '',
        joinDate: serverTimestamp(),
        lastActive: serverTimestamp(),
        totalXP: 0,
        level: 1,
        isInitialized: true
      });

      // Initialize subcollections
      await initializeUserSubcollections(githubUser.login.toLowerCase());
    } else {
      // Update last active
      await updateDoc(userRef, {
        lastActive: serverTimestamp()
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error initializing user profile:', error);
    throw error;
  }
};

// Initialize user subcollections
const initializeUserSubcollections = async (username) => {
  try {
    // Initialize profile settings
    const profileRef = doc(db, 'users', username, 'profile', 'settings');
    await setDoc(profileRef, {
      theme: 'dark',
      notifications: true,
      publicProfile: true,
      showStreak: true,
      showProgress: true
    });

    // Initialize empty collections
    const collections = ['achievements', 'streak', 'progress', 'problemsSolved', 'bookmarks', 'activity'];
    
    for (const collectionName of collections) {
      const initRef = doc(db, 'users', username, collectionName, 'init');
      await setDoc(initRef, {
        initialized: true,
        createdAt: serverTimestamp()
      });
    }

    return true;
  } catch (error) {
    console.error('Error initializing user subcollections:', error);
    throw error;
  }
};

// Get user profile data
export const getUserProfile = (username, callback) => {
  const userRef = doc(db, 'users', username.toLowerCase());
  
  return onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() });
    } else {
      callback(null);
    }
  });
};

// Update user streak
export const updateUserStreak = async (username) => {
  try {
    const streakRef = doc(db, 'users', username.toLowerCase(), 'streak', 'current');
    const streakDoc = await getDoc(streakRef);
    
    if (streakDoc.exists()) {
      const streakData = streakDoc.data();
      const today = new Date().toDateString();
      const lastActive = streakData.lastActiveDate ? new Date(streakData.lastActiveDate.toDate()).toDateString() : null;
      
      let newStreak = streakData.currentStreak;
      let newLongestStreak = streakData.longestStreak;
      let streakHistory = streakData.streakHistory || [];
      let milestones = streakData.milestones || [];
      
      if (lastActive === today) {
        // Already active today, no change
        return streakData;
      } else if (lastActive === new Date(Date.now() - 86400000).toDateString()) {
        // Consecutive day
        newStreak++;
      } else {
        // Streak broken
        newStreak = 1;
      }
      
      // Update longest streak
      if (newStreak > newLongestStreak) {
        newLongestStreak = newStreak;
      }
      
      // Add to history
      streakHistory.push({
        date: serverTimestamp(),
        streak: newStreak
      });
      
      // Check for milestones
      if (newStreak === 7 || newStreak === 30 || newStreak === 100 || newStreak === 365) {
        milestones.push({
          streak: newStreak,
          achievedAt: serverTimestamp(),
          badge: `${newStreak}-day-streak`
        });
      }
      
      await updateDoc(streakRef, {
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastActiveDate: serverTimestamp(),
        streakHistory: streakHistory,
        milestones: milestones
      });
      
      return {
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        isNewMilestone: milestones.length > streakData.milestones.length
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error updating user streak:', error);
    throw error;
  }
};

// Get user streak data
export const getUserStreak = (username, callback) => {
  const streakRef = doc(db, 'users', username.toLowerCase(), 'streak', 'current');
  
  return onSnapshot(streakRef, (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() });
    } else {
      callback(null);
    }
  });
};

// Update user progress
export const updateUserProgress = async (username, problemData, isSolved = false) => {
  try {
    const progressRef = doc(db, 'users', username.toLowerCase(), 'progress', 'overview');
    const progressDoc = await getDoc(progressRef);
    
    if (progressDoc.exists()) {
      const progressData = progressDoc.data();
      
      const updates = {
        problemsAttempted: increment(1),
        lastActiveDate: serverTimestamp()
      };
      
      if (isSolved) {
        updates.totalProblemsSolved = increment(1);
        updates.xpEarned = increment(problemData.xp || 10);
        
        // Update difficulty progress
        const difficulty = problemData.difficulty || 'easy';
        updates[`difficultyProgress.${difficulty}.solved`] = increment(1);
      }
      
      await updateDoc(progressRef, updates);
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error updating user progress:', error);
    throw error;
  }
};

// Get user progress
export const getUserProgress = (username, callback) => {
  const progressRef = doc(db, 'users', username.toLowerCase(), 'progress', 'overview');
  
  return onSnapshot(progressRef, (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() });
    } else {
      callback(null);
    }
  });
};

// Add solved problem
export const addSolvedProblem = async (username, problemData) => {
  try {
    const solvedRef = collection(db, 'users', username.toLowerCase(), 'problemsSolved');
    
    await setDoc(doc(solvedRef, problemData.id), {
      problemId: problemData.id,
      problemTitle: problemData.title,
      category: problemData.category || 'general',
      difficulty: problemData.difficulty || 'easy',
      solvedAt: serverTimestamp(),
      attempts: problemData.attempts || 1,
      timeTaken: problemData.timeTaken || 0,
      solution: problemData.solution || '',
      xpEarned: problemData.xp || 10
    });
    
    return true;
  } catch (error) {
    console.error('Error adding solved problem:', error);
    throw error;
  }
};

// Get solved problems
export const getSolvedProblems = (username, callback) => {
  const solvedRef = collection(db, 'users', username.toLowerCase(), 'problemsSolved');
  const q = query(solvedRef, orderBy('solvedAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const problems = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(problems);
  });
};

// Add bookmark
export const addBookmark = async (username, problemData) => {
  try {
    const bookmarksRef = collection(db, 'users', username.toLowerCase(), 'bookmarks');
    
    await setDoc(doc(bookmarksRef, problemData.id), {
      problemId: problemData.id,
      problemTitle: problemData.title,
      category: problemData.category || 'general',
      difficulty: problemData.difficulty || 'easy',
      bookmarkedAt: serverTimestamp(),
      notes: problemData.notes || ''
    });
    
    return true;
  } catch (error) {
    console.error('Error adding bookmark:', error);
    throw error;
  }
};

// Remove bookmark
export const removeBookmark = async (username, problemId) => {
  try {
    const bookmarkRef = doc(db, 'users', username.toLowerCase(), 'bookmarks', problemId);
    await deleteDoc(bookmarkRef);
    
    return true;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    throw error;
  }
};

// Get bookmarks
export const getBookmarks = (username, callback) => {
  const bookmarksRef = collection(db, 'users', username.toLowerCase(), 'bookmarks');
  const q = query(bookmarksRef, orderBy('bookmarkedAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const bookmarks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(bookmarks);
  });
};

// Check if problem is bookmarked
export const isProblemBookmarked = async (username, problemId) => {
  try {
    const bookmarkRef = doc(db, 'users', username.toLowerCase(), 'bookmarks', problemId);
    const bookmarkDoc = await getDoc(bookmarkRef);
    
    return bookmarkDoc.exists();
  } catch (error) {
    console.error('Error checking bookmark status:', error);
    return false;
  }
};

// Add achievement
export const addAchievement = async (username, achievementData) => {
  try {
    const achievementsRef = collection(db, 'users', username.toLowerCase(), 'achievements');
    
    await setDoc(doc(achievementsRef, achievementData.id), {
      name: achievementData.name,
      description: achievementData.description,
      icon: achievementData.icon,
      unlockedAt: serverTimestamp(),
      category: achievementData.category,
      rarity: achievementData.rarity || 'common',
      xpBonus: achievementData.xpBonus || 0
    });
    
    // Update user total XP
    const userRef = doc(db, 'users', username.toLowerCase());
    await updateDoc(userRef, {
      totalXP: increment(achievementData.xpBonus || 0)
    });
    
    return true;
  } catch (error) {
    console.error('Error adding achievement:', error);
    throw error;
  }
};

// Get achievements
export const getAchievements = (username, callback) => {
  const achievementsRef = collection(db, 'users', username.toLowerCase(), 'achievements');
  const q = query(achievementsRef, orderBy('unlockedAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const achievements = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(achievements);
  });
};

// Get user activity for heatmap
export const getUserActivity = (username, callback) => {
  const activityRef = collection(db, 'users', username.toLowerCase(), 'activity');
  const q = query(activityRef, orderBy('timestamp', 'desc'), limit(365));
  
  return onSnapshot(q, (snapshot) => {
    const activities = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(activities);
  });
};

// Add activity log
export const addActivity = async (username, activityData) => {
  try {
    const activityRef = collection(db, 'users', username.toLowerCase(), 'activity');
    
    await setDoc(doc(activityRef, `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`), {
      type: activityData.type,
      problemId: activityData.problemId,
      problemTitle: activityData.problemTitle,
      timestamp: serverTimestamp(),
      details: activityData.details || {},
      xpGained: activityData.xpGained || 0
    });
    
    return true;
  } catch (error) {
    console.error('Error adding activity:', error);
    throw error;
  }
};
