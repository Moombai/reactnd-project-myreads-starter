import React from 'react'
import Book from './Book.js'
import * as BooksAPI from '../BooksAPI'

class BookResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: []};
  }

  static undefinedPropertyCheck(property) {
    if (typeof property.imageLinks === "undefined") {
      property.imageLinks = "";
    }
    if (typeof property.authors === "undefined") {
      property.imageLinks = "";
    }
  }

  // this method manages the display of search results
  componentDidUpdate(prevProps) {
    if (this.props.search !== prevProps.search) {
      // run code if the search props has a value
      if (this.props.search) {
        // ajax request based on search props
        BooksAPI.search(this.props.search).then(books => {
          // update search results if we get a valid response
          if (books.length > 0 && this.props.search) {
            this.setState({ searchResults: books });
          } else {
            this.setState({ searchResults: [] });
          }
        }).catch(function (err) {
          console.log("there was a search error", err);
        });
      } else {
        this.setState({ searchResults: [] });
      }
    }
  }

  render() {
    const results = this.state.searchResults;
    // iterate through search results and pass the shelf status as a prop if it's found
    return (
      <ol className="books-grid">
        {
          results.map((book, index) => {
            BookResults.undefinedPropertyCheck(book);

            const archived = this.props.storedBooks.find(stored =>{
              return stored.id === book.id;
            });

            if (archived) {
              return <Book
                book={book}
                shelf={archived.shelf}
                url={book.imageLinks.smallThumbnail}
                title={book.title}
                authors={book.authors}
                bookId={book.id}
                handleBookUpdate={this.props.handleSearchUpdate}
                key={index} />
            } else {
              return <Book
                book={book}
                url={book.imageLinks.smallThumbnail}
                title={book.title}
                authors={book.authors}
                bookId={book.id}
                handleBookUpdate={this.props.handleSearchUpdate}
                key={index} />
            }
          })
        }
      </ol>
    )
  }
}

export default BookResults;