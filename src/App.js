import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Header from './components/Header.js'
import Bookshelf from './components/Bookshelf.js'
import BookResults from './components/BookResults.js'
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
    this.handleSearchUpdate = this.handleSearchUpdate.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.state = {
      books: [],
      search: '',
      searchResult: []
    }
  }

  handleBookUpdate(event, book) {
    let id = book.id;
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
    // update the server
    BooksAPI.update({ id: id }, selectedShelf).then(function(response){
    }).catch(function(err) {
      console.log("error updating book", err);
    })
  }

  handleSearchUpdate(event, book) {
    let updateFlag = true;
    const bookFromSearch = book;
    const bookStateCopy = [...this.state.books];
    const selectedShelf = event.target.value;
    // add the shelf to the book based on the event
    bookFromSearch.shelf = selectedShelf;

    // if we find a book in state then we update it
    const updatedBooks = bookStateCopy.map(function(book) {
      if (book.id === bookFromSearch.id) {
        book.shelf = selectedShelf;
        updateFlag = false;
      }
      return book;
    });

    if (updateFlag) {
      // if a book can't be found in state then we add it with the updated shelf
      bookFromSearch.shelf = selectedShelf;
      updatedBooks.push(bookFromSearch);
    }
    this.setState({ books: updatedBooks });
  }

  handleQuery(event) {
    this.setState({search: event.target.value});
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <Header />
            <div className="list-books-content">
              <Bookshelf books={this.state.books} handleBookUpdate={this.handleBookUpdate} title="Currently Reading" shelf="currentlyReading" />
              <Bookshelf books={this.state.books} handleBookUpdate={this.handleBookUpdate} title="Want to Read" shelf="wantToRead" />
              <Bookshelf books={this.state.books} handleBookUpdate={this.handleBookUpdate} title="Read" shelf="read" />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">

                <input type="text" placeholder="Search by title or author"
                  value={this.state.search}
                  onChange={this.handleQuery}
                />
              </div>
            </div>
            <div className="search-books-results">
              <BookResults search={this.state.search} storedBooks={this.state.books} handleSearchUpdate={this.handleSearchUpdate}/>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp;

