import React, { useState } from 'react';
import { FaUser, FaTrophy, FaFire, FaChartLine, FaBook, FaCog, FaTimes, FaCalendar, FaClock, FaCode, FaStar } from 'react-icons/fa';
import { useUserProfile } from '../../hooks/useUserProfile.js';
import styles from './UserProfile.module.sass';

export default function UserProfile({ isOpen, onClose }) {
  const { profile, streak, progress, solvedProblems, bookmarks, achievements, activity, loading } = useUserProfile();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  const renderOverview = () => (
    <div className={styles.overview}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaFire />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{streak?.currentStreak || 0}</div>
            <div className={styles.statLabel}>Day Streak</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaCode />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{solvedProblems?.length || 0}</div>
            <div className={styles.statLabel}>Problems Solved</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaTrophy />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{achievements.length}</div>
            <div className={styles.statLabel}>Achievements</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaBook />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{bookmarks?.length || 0}</div>
            <div className={styles.statLabel}>Bookmarks</div>
          </div>
        </div>
      </div>
      
      {/* Streak Heatmap */}
      <div className={styles.streakSection}>
        <h3>Activity Heatmap</h3>
        <div className={styles.heatmap}>
          {generateHeatmap()}
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className={styles.recentActivity}>
        <h3>Recent Activity</h3>
        <div className={styles.activityList}>
          {activity.slice(0, 5).map((item) => (
            <div key={item.id} className={styles.activityItem}>
              <div className={styles.activityIcon}>
                {item.type === 'solved' && <FaCode />}
                {item.type === 'attempted' && <FaClock />}
                {item.type === 'bookmarked' && <FaBook />}
              </div>
              <div className={styles.activityContent}>
                <div className={styles.activityTitle}>
                  {item.type === 'solved' && `Solved: ${item.problemTitle}`}
                  {item.type === 'attempted' && `Attempted: ${item.problemTitle}`}
                  {item.type === 'bookmarked' && `Bookmarked: ${item.problemTitle}`}
                </div>
                <div className={styles.activityTime}>
                  {new Date(item.timestamp?.toDate()).toLocaleDateString()}
                </div>
              </div>
              {item.xpGained > 0 && (
                <div className={styles.activityXP}>+{item.xpGained} XP</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const generateHeatmap = () => {
    const days = [];
    const today = new Date();
    
    // Generate last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Check if there's activity for this date
      const hasActivity = activity.some(item => {
        if (!item.timestamp) return false;
        const activityDate = new Date(item.timestamp.toDate ? item.timestamp.toDate() : item.timestamp);
        return activityDate.toDateString() === date.toDateString();
      });
      
      days.push(
        <div 
          key={i} 
          className={`${styles.heatmapDay} ${hasActivity ? styles.active : ''}`}
          title={date.toLocaleDateString()}
        />
      );
    }
    
    return days;
  };

  const renderAchievements = () => (
    <div className={styles.achievements}>
      <div className={styles.achievementsGrid}>
        {achievements.map((achievement) => (
          <div key={achievement.id} className={styles.achievementCard}>
            <div className={styles.achievementIcon}>{achievement.icon}</div>
            <div className={styles.achievementInfo}>
              <div className={styles.achievementName}>{achievement.name}</div>
              <div className={styles.achievementDescription}>{achievement.description}</div>
              <div className={styles.achievementMeta}>
                <span className={`${styles.rarity} ${styles[achievement.rarity]}`}>
                  {achievement.rarity}
                </span>
                {achievement.xpBonus > 0 && (
                  <span className={styles.xpBonus}>+{achievement.xpBonus} XP</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {achievements.length === 0 && (
        <div className={styles.emptyState}>
          <FaTrophy />
          <p>No achievements yet. Start solving problems to earn your first badge!</p>
        </div>
      )}
    </div>
  );

  const renderStreak = () => (
    <div className={styles.streak}>
      <div className={styles.streakHeader}>
        <div className={styles.streakMain}>
          <div className={styles.streakValue}>{streak?.currentStreak || 0}</div>
          <div className={styles.streakLabel}>Current Streak</div>
        </div>
        <div className={styles.streakMain}>
          <div className={styles.streakValue}>{streak?.longestStreak || 0}</div>
          <div className={styles.streakLabel}>Longest Streak</div>
        </div>
      </div>
      
      <div className={styles.streakCalendar}>
        <h3>Activity Calendar</h3>
        <div className={styles.calendarGrid}>
          {generateCalendarDays().map((day, index) => (
            <div
              key={index}
              className={`${styles.calendarDay} ${day.hasActivity ? styles.active : ''}`}
              title={day.date}
            />
          ))}
        </div>
      </div>
      
      {streak?.milestones && streak.milestones.length > 0 && (
        <div className={styles.milestones}>
          <h3>Milestones</h3>
          {streak.milestones.map((milestone, index) => (
            <div key={index} className={styles.milestone}>
              <FaFire />
              <span>{milestone.streak}-day streak achieved!</span>
              <span>{new Date(milestone.achievedAt.toDate()).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderProgress = () => {
    // Calculate dynamic values from actual data
    const solvedCount = solvedProblems?.length || 0;
    const attemptedCount = progress?.problemsAttempted || 0;
    const totalXP = progress?.xpEarned || 0;
    const currentLevel = progress?.level || 1;
    
    // Calculate success rate
    const successRate = attemptedCount > 0 ? (solvedCount / attemptedCount) * 100 : 0;
    
    // Get difficulty progress from actual data
    const difficultyProgress = progress?.difficultyProgress || { 
      easy: { attempted: 0, solved: 0 }, 
      medium: { attempted: 0, solved: 0 }, 
      hard: { attempted: 0, solved: 0 } 
    };

    // Calculate XP needed for next level (simple formula: level * 100)
    const xpNeeded = currentLevel * 100;
    const xpProgress = (totalXP % xpNeeded) / xpNeeded * 100;

    return (
      <div className={styles.progress}>
        <div className={styles.progressOverview}>
          <div className={styles.progressCard}>
            <h3>Problems Solved</h3>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${Math.min(successRate, 100)}%` }}
              />
            </div>
            <div className={styles.progressText}>
              {solvedCount} problems solved • {attemptedCount} attempted
            </div>
          </div>
          
          <div className={styles.progressCard}>
            <h3>Success Rate</h3>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${successRate}%` }}
              />
            </div>
            <div className={styles.progressText}>
              {Math.round(successRate)}% success rate
            </div>
          </div>
          
          <div className={styles.progressCard}>
            <h3>Level Progress</h3>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <div className={styles.progressText}>
              Level {currentLevel} • {totalXP} XP
            </div>
          </div>
        </div>

        <div className={styles.difficultyProgress}>
          <h3>Progress by Difficulty</h3>
          <div className={styles.difficultyGrid}>
            <div className={styles.difficultyCard}>
              <div className={styles.difficultyLabel}>Easy</div>
              <div className={styles.difficultyBar}>
                <div 
                  className={`${styles.difficultyFill} ${styles.easy}`}
                  style={{ width: `${difficultyProgress.easy.attempted > 0 ? (difficultyProgress.easy.solved / difficultyProgress.easy.attempted) * 100 : 0}%` }}
                />
              </div>
              <div className={styles.difficultyText}>
                {difficultyProgress.easy.solved} solved • {difficultyProgress.easy.attempted} attempted
              </div>
            </div>
            
            <div className={styles.difficultyCard}>
              <div className={styles.difficultyLabel}>Medium</div>
              <div className={styles.difficultyBar}>
                <div 
                  className={`${styles.difficultyFill} ${styles.medium}`}
                  style={{ width: `${difficultyProgress.medium.attempted > 0 ? (difficultyProgress.medium.solved / difficultyProgress.medium.attempted) * 100 : 0}%` }}
                />
              </div>
              <div className={styles.difficultyText}>
                {difficultyProgress.medium.solved} solved • {difficultyProgress.medium.attempted} attempted
              </div>
            </div>
            
            <div className={styles.difficultyCard}>
              <div className={styles.difficultyLabel}>Hard</div>
              <div className={styles.difficultyBar}>
                <div 
                  className={`${styles.difficultyFill} ${styles.hard}`}
                  style={{ width: `${difficultyProgress.hard.attempted > 0 ? (difficultyProgress.hard.solved / difficultyProgress.hard.attempted) * 100 : 0}%` }}
                />
              </div>
              <div className={styles.difficultyText}>
                {difficultyProgress.hard.solved} solved • {difficultyProgress.hard.attempted} attempted
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSolvedProblems = () => (
    <div className={styles.solvedProblems}>
      <div className={styles.problemsList}>
        {solvedProblems.map((problem) => (
          <div key={problem.id} className={styles.problemCard}>
            <div className={styles.problemInfo}>
              <div className={styles.problemTitle}>{problem.problemTitle}</div>
              <div className={styles.problemMeta}>
                <span className={`${styles.difficulty} ${styles[problem.difficulty]}`}>
                  {problem.difficulty}
                </span>
                <span className={styles.category}>{problem.category}</span>
                <span className={styles.solvedDate}>
                  Solved {new Date(problem.solvedAt.toDate()).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className={styles.problemXP}>+{problem.xpEarned} XP</div>
          </div>
        ))}
      </div>
      
      {solvedProblems.length === 0 && (
        <div className={styles.emptyState}>
          <FaCode />
          <p>No problems solved yet. Start coding to see your progress here!</p>
        </div>
      )}
    </div>
  );

  const renderBookmarks = () => (
    <div className={styles.bookmarks}>
      <div className={styles.bookmarksList}>
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id} className={styles.bookmarkCard}>
            <div className={styles.bookmarkInfo}>
              <div className={styles.bookmarkTitle}>{bookmark.problemTitle}</div>
              <div className={styles.bookmarkMeta}>
                <span className={`${styles.difficulty} ${styles[bookmark.difficulty]}`}>
                  {bookmark.difficulty}
                </span>
                <span className={styles.category}>{bookmark.category}</span>
                <span className={styles.bookmarkedDate}>
                  Bookmarked {new Date(bookmark.bookmarkedAt.toDate()).toLocaleDateString()}
                </span>
              </div>
              {bookmark.notes && (
                <div className={styles.bookmarkNotes}>{bookmark.notes}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {bookmarks.length === 0 && (
        <div className={styles.emptyState}>
          <FaBook />
          <p>No bookmarks yet. Save problems you want to revisit later!</p>
        </div>
      )}
    </div>
  );

  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dateStr = date.toDateString();
      const hasActivity = activity.some(act => 
        new Date(act.timestamp?.toDate()).toDateString() === dateStr
      );
      
      days.push({
        date: dateStr,
        hasActivity
      });
    }
    
    return days;
  };

  if (loading) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <img 
              src={profile?.avatar || '/default-avatar.svg'} 
              alt={profile?.displayName}
              className={styles.avatar}
            />
            <div className={styles.userDetails}>
              <div className={styles.displayName}>{profile?.displayName}</div>
              <div className={styles.username}>@{profile?.githubUsername}</div>
              <div className={styles.joinDate}>
                Joined {new Date(profile?.joinDate?.toDate()).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <button className={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'achievements' ? styles.active : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            <FaTrophy /> Achievements
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'streak' ? styles.active : ''}`}
            onClick={() => setActiveTab('streak')}
          >
            <FaFire /> Streak
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'progress' ? styles.active : ''}`}
            onClick={() => setActiveTab('progress')}
          >
            <FaChartLine /> Progress
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'solved' ? styles.active : ''}`}
            onClick={() => setActiveTab('solved')}
          >
            <FaCode /> Solved
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'bookmarks' ? styles.active : ''}`}
            onClick={() => setActiveTab('bookmarks')}
          >
            <FaBook /> Bookmarks
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'achievements' && renderAchievements()}
          {activeTab === 'streak' && renderStreak()}
          {activeTab === 'progress' && renderProgress()}
          {activeTab === 'solved' && renderSolvedProblems()}
          {activeTab === 'bookmarks' && renderBookmarks()}
        </div>
      </div>
    </div>
  );
}
