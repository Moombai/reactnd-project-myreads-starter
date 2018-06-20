import React from 'react';
import Book from './Book.js';

const Bookshelf = (props) => {

  const books = props.books;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.filter(book => {
            return book.shelf === props.shelf;
          }).map( (book, index) => {
            return <Book url={book.imageLinks.smallThumbnail}
                         title={book.title}
                         authors={book.authors}
                         key={index} />
          })}
        </ol>
      </div>
    </div>
  )
}

export default Bookshelf;