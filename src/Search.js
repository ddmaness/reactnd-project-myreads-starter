import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

// Component for searching for books in the API
class Search extends React.Component {
  constructor(props){
		super(props);

    this.state = {
  		query: '',
	    results: [],
  	}
    this.updateQuery = this.updateQuery.bind(this);
  }
  
  // Updates query based on user input
	updateQuery(query) {
    this.setState({query: query})
    BooksAPI.search(query, 20).then(response => this.setState({results: response})).catch(() => this.setState({results: []}));
  }
  
	render() {
    const library = this.props.bookList;
    const onChange = this.props.onChange;
    let bookList;
    
    // Ensures that the appropriate shelf is marked in search results
    if (this.state.results && this.state.results.length > 0) {
      bookList = this.state.results.map(function(elem) {
        let book;
        for (let i = 0; i < library.length; i++) {
          if (library[i].id === elem.id) {
            book = library[i];
            break;
          }
          else if (i === library.length - 1) {
            book = elem;
          }
        }
      	return (
          <Book
            book = {book}
            onChange = {onChange}
            key = {book.id}
          />
        )
      })
    }
    else if (this.state.query === '') {
      bookList = <li>Search for Books</li>
    }
    else {
      bookList = <li>No Matches Found</li>
    }

    return( 
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
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
		      <ol className="books-grid">
            {bookList}
		      </ol>
        </div>
      </div>
    )
	}
}

export default Search