/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function BookCard({ book , role}) {
  const { name, author, imageUrl} = book;
  return (
    <div className="book-card">
      <img src={imageUrl} alt={name} className="book-image" />
      <div className="book-details">
        <h3>{name}</h3>
        <p>{author}</p>
      </div>
      {role=== "admin" && 
        <div className="book-actions">
        <Link to={`/book/${book._id}`} className="btn-link">
          <button>Edit</button>
        </Link>
        <Link to={`/delete/${book._id}`} className="btn-link">
          <button>Delete</button>
        </Link>
      </div>}
    </div>
  );
}

export default BookCard;
