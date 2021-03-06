import React from 'react'
import Book from './Book'

// Component for displaying books on a shelf
function BookShelf(props) {
  let bookList;
  if (props.books) {
    // generates Book component display for each book on bookshelf
    bookList = props.books.map(function(elem, index) {
    	return (
        	<Book
            book={elem}
            onChange={props.onChange}
            key={elem.id}
          />
        )
    })
  }
  else {
    bookList = <li>"No Results!"</li>
  }
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfName}</h2>
      <div className="bookshelf-books">
	      <ol className="books-grid">
          {bookList}
	      </ol>
      </div>
    </div>
  )
}

export default BookShelf