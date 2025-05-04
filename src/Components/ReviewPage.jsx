import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState('');
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);

  // Mock function to simulate checking user authentication
  useEffect(() => {
    // Replace with your own auth state logic (e.g., local storage, JWT, etc.)
    const currentUser = { name: 'John Doe' };  // Mock logged-in user
    setUser(currentUser);

    // Mock comments fetching (replace with your backend fetching logic)
    const fetchedComments = [
      { name: 'Jane Doe', stars: 5, text: 'Great product!' },
      { name: 'Alice', stars: 4, text: 'Good value for money.' },
    ];
    setComments(fetchedComments);
  }, []);

  const handleSubmit = () => {
    if (review.trim() && user) {
      const newComment = {
        text: review,
        stars: rating,
        name: user.name || user.email,
      };

      setComments([newComment, ...comments]);  // Add new comment to the list
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
        className="w-full border border-gray-300 rounded p-2 mb-3 "
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
