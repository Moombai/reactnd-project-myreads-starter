import React from 'react';
import Book from './Book.js';

const Bookshelf = (props) => {

  const books = props.books;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.filter(book => {
            return book.shelf === props.shelf;
          }).map( (book, index) => {
            Bookshelf.undefinedPropertyCheck(book);
            return <Book
                         book={book}
                         url={book.imageLinks.smallThumbnail}
                         title={book.title}
                         authors={book.authors}
                         shelf={book.shelf}
                         bookId={book.id}
                         handleBookUpdate={props.handleBookUpdate}
                         key={index} />
          })}
        </ol>
      </div>
    </div>
  )
}

// Add check for undefined properties
Bookshelf.undefinedPropertyCheck = function(property) {
  if (typeof property.imageLinks === "undefined") {
    property.imageLinks = "";
  }
  if (typeof property.authors === "undefined") {
    property.imageLinks = "";
  }
}

export default Bookshelf;