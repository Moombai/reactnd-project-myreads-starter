import React from 'react';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'none' }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.handleBookUpdate(event, this.props.bookId)
  }

  render () {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.url})` }}></div>
            <div className="book-shelf-changer">
              {/* If the book has a shelf property we will use that as initial select value */}
              <select value={this.props.shelf || this.state.value } onChange={this.handleChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.authors}</div>
        </div>
      </li>
    )
  }
}

export default Book;