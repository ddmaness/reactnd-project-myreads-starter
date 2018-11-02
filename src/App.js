import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'

class BooksApp extends React.Component {
  constructor(){
    super();
    this.state = {
      /**
      * TODO: Instead of using this state variable to keep track of which page
      * we're on, use the URL in the browser's address bar. This will ensure that
      * users can use the browser's back and forward buttons to navigate between
      * pages, as well as provide a good URL they can bookmark and share.
      */
      showSearchPage: false,
      currentlyReading: [],
      wantToRead: [],
      read: [],
    }
    this.addBook = this.addBook.bind(this);
  }
  
  updateLibrary(books) {
    const currentlyReading = [];
    const wantToRead = [];
    const read = [];
    console.log(books);
    books.forEach(function(elem) {
        console.log(elem);
        if (elem.shelf === 'test') {
          currentlyReading.push(elem);
        }
        else if (elem.shelf === 'wantToRead') {
          wantToRead.push(elem);
        }
        else if (elem.shelf === 'read') {
          read.push(elem);
        }
      })
    this.setState({
      currentlyReading: currentlyReading,
      wantToRead: wantToRead,
      read: read,
    })
  }



  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.updateLibrary(books)
    }) 
  }

  addBook(book, event){
    if (event.target.value) {
      BooksAPI.update(book, event.target.value).then(BooksAPI.getAll).then(books => {
        if (!this.state.showSearchPage) {
          this.updateLibrary(books)
        }
      })
    }
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search 
          onChange={this.addBook}
          />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf shelfName='Currently Reading' books={this.state.currentlyReading} onChange={this.addBook}/>
                <BookShelf shelfName='Want To Read' books={this.state.wantToRead} onChange={this.addBook}/>
                <BookShelf shelfName='Read' books={this.state.read} onChange={this.addBook}/>                
              </div>
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

export default BooksApp
