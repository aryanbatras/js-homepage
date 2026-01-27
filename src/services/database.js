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
    console.error('Error adding comment:', error);
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
    console.error('Error adding solution:', error);
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
    console.error('Error liking comment:', error);
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
    console.error('Error unliking comment:', error);
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
