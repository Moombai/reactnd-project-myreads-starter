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
      console.log(response);
    }).catch(function(err) {
      console.log("error updating book", err);
    })
  }

  handleSearchUpdate(event, book) {
    // I want to get the book from my search api and add it to my book state with the correct shelf

    // make a copy of the book state
    let booksCopy = [...this.state.books];
    let selectedShelf = event.target.value;
    book.shelf = selectedShelf;
    console.log(book);
    // add the shelf to the book based on the event
    // check if this book is present in the book state
    // if it's not then we need to add it
    // update the book state with our new data

    console.log("[handleSearchUpdate]","says hello!");

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
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"
                  value={this.state.search}
                  onChange={this.handleQuery}
                />
              </div>
            </div>
            <div className="search-books-results">
              <BookResults search={this.state.search} handleSearchUpdate={this.handleSearchUpdate}/>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp;

