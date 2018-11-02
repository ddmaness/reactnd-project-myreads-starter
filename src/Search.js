import React from 'react'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends React.Component {
  constructor(props){
		super(props);

    this.state = {
  		query: '',
	    results: [],
  	}
  }
  
	updateQuery(query) {
    this.setState({query: query})
    BooksAPI.search(query, 20).then(response => this.setState({results: response})).catch(() => this.setState({results: []}));
  }
  
	render() {
    const onChange = this.props.onChange;
    let bookList;
    if (this.state.results && this.state.results.length > 0) {
      bookList = this.state.results.map(function(elem) {
      	return (
          <Book
            book = {elem}
            onChange = {onChange}
            key = {elem.id}
          />
        )
      })
    }
    else {
      bookList = <li>"No Results!"</li>
    }

    return( 
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