import React from 'react'
import * as BooksAPI from '../BooksAPI'

class BookResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: []};
  }

  componentDidUpdate(prevProps) {
    if (this.props.search !== prevProps.search) {
      BooksAPI.search(this.props.search).then(books => {
        this.setState({ searchResults: books });
      }).catch(function (err) {
        console.log("there was a search error", err);
      });
    }
  }

  render() {
    console.log("[BookResults]", this.state.searchResults);
    return (
      <h2>Hi there. I will be the book results</h2>
    )
  }
}

export default BookResults;

{/* <ol className="books-grid">
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
</ol> */}

// TODO: manage the search results
// Should we be making an AJAX request on every entry or only if the search query matches one of the results
