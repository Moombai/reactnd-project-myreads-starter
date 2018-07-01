import React from 'react'
import Book from './Book.js'
import * as BooksAPI from '../BooksAPI'

class BookResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: []};
  }

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
        console.log("search result is empty")
        this.setState({ searchResults: [] });
      }
    }
  }

  render() {
    console.log("[BookResults]", this.state.searchResults);
    const results = this.state.searchResults;
    return (
      <ol className="books-grid">
        {
          results.map((book, index) => {
            return <Book url={book.imageLinks.smallThumbnail}
              title={book.title}
              authors={book.authors}
              bookId={book.id}
              handleBookUpdate={this.handleBookUpdate}
              key={index} />
          })
        }
      </ol>
    )
  }
}

export default BookResults;



// TODO: tidy up searchResults code