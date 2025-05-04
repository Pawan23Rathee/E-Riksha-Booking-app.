import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { db, auth } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const ReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState('');
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Track auth state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Fetch existing comments
    const q = query(collection(db, 'reviews'), orderBy('timestamp', 'desc'));
    const unsubscribeComments = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => doc.data()));
    });

    return () => {
      unsubscribe();
      unsubscribeComments();
    };
  }, []);

  const handleSubmit = async () => {
    if (review.trim() && user) {
      await addDoc(collection(db, 'reviews'), {
        text: review,
        stars: rating,
        name: user.displayName || user.email,
        timestamp: serverTimestamp(),
      });
      setReview('');
      setRating(0);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      {/* Star Rating */}
      <div className="flex space-x-2 mb-4">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1;
          return (
            <FaStar
              key={i}
              className={`cursor-pointer text-2xl ${
                starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => user && setRating(starValue)}
              onMouseEnter={() => user && setHover(starValue)}
              onMouseLeave={() => user && setHover(null)}
            />
          );
        })}
      </div>

      {/* Review Textarea */}
      <textarea
        className="w-full border border-gray-300 rounded p-2 mb-3 max-w-md"
        rows="4"
        placeholder={
          user ? "Write your review here..." : "Login to write a review..."
        }
        value={review}
        onChange={(e) => setReview(e.target.value)}
        disabled={!user}
      />

      {/* Submit Button */}
      <button
        className={`${
          user ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
        } text-white text-sm px-4 py-1 rounded mb-6`}
        onClick={handleSubmit}
        disabled={!user}
      >
        {user ? 'Comment' : 'Login to Comment'}
      </button>

      {/* Display Comments */}
      <div className="w-full max-w-md space-y-4">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="border rounded p-3 shadow bg-white"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-gray-700">{comment.name}</span>
              <div className="flex">
                {[...Array(comment.stars)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
            </div>
            <p className="text-gray-800">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
