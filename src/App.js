import React from 'react'
import * as BooksAPI from './BooksAPI'
import Header from './components/Header.js'
import Bookshelf from './components/Bookshelf.js'
import './App.css'

class BooksApp extends React.Component {

  /**
   * TODO: Instead of using this state variable to keep track of which page
   * we're on, use the URL in the browser's address bar. This will ensure that
   * users can use the browser's back and forward buttons to navigate between
   * pages, as well as provide a good URL they can bookmark and share.
   */
  constructor() {
    super();
    this.handleBookUpdate = this.handleBookUpdate.bind(this);
    this.state = {
      showSearchPage: false,
      books: []
    }
  }

  handleBookUpdate(event, id) {
    let booksCopy = [...this.state.books];
    let selectedShelf = event.target.value;
    // check through all the books
    let updatedBooks = booksCopy.map( book => {
      if (book.id === id) {
        // if a book id matches, update that book before returning it
        book.shelf = selectedShelf;
      }
      return book;
    });
    this.setState({books: updatedBooks});
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <Header />
            <div className="list-books-content">
              <Bookshelf books={this.state.books} handleBookUpdate={this.handleBookUpdate} title="Currently Reading" shelf="currentlyReading" />
                <Bookshelf books={this.state.books} handleBookUpdate={this.handleBookUpdate} title="Want to Read" shelf="wantToRead" />
                <Bookshelf books={this.state.books} handleBookUpdate={this.handleBookUpdate} title="Read" shelf="read" />
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp;

