import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const addComment = async (problemId, userId, username, avatar, comment) => {
  try {
    const docRef = await addDoc(collection(db, 'problems', problemId, 'comments'), {
      userId,
      username,
      avatar,
      comment,
      timestamp: serverTimestamp(),
      likes: 0
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const addSolution = async (problemId, userId, username, avatar, approach, code, language) => {
  try {
    const docRef = await addDoc(collection(db, 'problems', problemId, 'solutions'), {
      userId,
      username,
      avatar,
      approach,
      code,
      language,
      timestamp: serverTimestamp(),
      upvotes: 0
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getComments = (problemId, callback) => {
  const q = query(
    collection(db, 'problems', problemId, 'comments'),
    orderBy('timestamp', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(comments);
  });
};

export const likeComment = async (problemId, commentId) => {
  try {
    const commentRef = doc(db, 'problems', problemId, 'comments', commentId);
    const commentSnap = await getDoc(commentRef);
    if (commentSnap.exists()) {
      const currentLikes = commentSnap.data().likes || 0;
      await updateDoc(commentRef, {
        likes: currentLikes + 1
      });
    }
  } catch (error) {
    throw error;
  }
};

export const unlikeComment = async (problemId, commentId) => {
  try {
    const commentRef = doc(db, 'problems', problemId, 'comments', commentId);
    const commentSnap = await getDoc(commentRef);
    if (commentSnap.exists()) {
      const currentLikes = commentSnap.data().likes || 0;
      await updateDoc(commentRef, {
        likes: Math.max(0, currentLikes - 1)
      });
    }
  } catch (error) {
    throw error;
  }
};

export const getSolutions = (problemId, callback) => {
  const q = query(
    collection(db, 'problems', problemId, 'solutions'),
    orderBy('timestamp', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const solutions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(solutions);
  });
};

export const addSubmission = async (problemId, userId, username, avatar, approach, code, description) => {
  try {
    const docRef = await addDoc(collection(db, 'problems', problemId, 'submissions'), {
      userId,
      username,
      avatar,
      approach,
      code,
      language: 'javascript',
      description,
      timestamp: serverTimestamp(),
      upvotes: 0,
      downvotes: 0,
      upvoters: [],
      downvoters: [],
      verified: false
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getSubmissions = (problemId, callback) => {
  const q = query(
    collection(db, 'problems', problemId, 'submissions'),
    orderBy('timestamp', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const submissions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(submissions);
  });
};

export const upvoteSubmission = async (problemId, submissionId, userId) => {
  try {
    const submissionRef = doc(db, 'problems', problemId, 'submissions', submissionId);
    const submissionSnap = await getDoc(submissionRef);
    if (submissionSnap.exists()) {
      const data = submissionSnap.data();
      const upvoters = data.upvoters || [];
      const downvoters = data.downvoters || [];
      
      // Remove from downvoters if exists
      const newDownvoters = downvoters.filter(id => id !== userId);
      
      // Toggle upvote
      let newUpvoters;
      if (upvoters.includes(userId)) {
        // Remove upvote
        newUpvoters = upvoters.filter(id => id !== userId);
      } else {
        // Add upvote
        newUpvoters = [...upvoters, userId];
      }
      
      await updateDoc(submissionRef, {
        upvoters: newUpvoters,
        downvoters: newDownvoters,
        upvotes: newUpvoters.length,
        downvotes: newDownvoters.length
      });
    }
  } catch (error) {
    throw error;
  }
};

export const downvoteSubmission = async (problemId, submissionId, userId) => {
  try {
    const submissionRef = doc(db, 'problems', problemId, 'submissions', submissionId);
    const submissionSnap = await getDoc(submissionRef);
    if (submissionSnap.exists()) {
      const data = submissionSnap.data();
      const upvoters = data.upvoters || [];
      const downvoters = data.downvoters || [];
      
      // Remove from upvoters if exists
      const newUpvoters = upvoters.filter(id => id !== userId);
      
      // Toggle downvote
      let newDownvoters;
      if (downvoters.includes(userId)) {
        // Remove downvote
        newDownvoters = downvoters.filter(id => id !== userId);
      } else {
        // Add downvote
        newDownvoters = [...downvoters, userId];
      }
      
      await updateDoc(submissionRef, {
        upvoters: newUpvoters,
        downvoters: newDownvoters,
        upvotes: newUpvoters.length,
        downvotes: newDownvoters.length
      });
    }
  } catch (error) {
    throw error;
  }
};
