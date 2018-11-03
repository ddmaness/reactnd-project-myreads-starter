import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'

class BooksApp extends React.Component {
  constructor(){
    super();
    this.state = {
      bookList: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
    }
    this.addBook = this.addBook.bind(this);
    this.updateLibrary = this.updateLibrary.bind(this);
  }
  
  // Places books on correct shelf based on their 'shelf' property
  updateLibrary(books) {
    const bookList = [];
    const currentlyReading = [];
    const wantToRead = [];
    const read = [];
    books.forEach(function(elem) {
      bookList.push(elem);
      if (elem.shelf === 'currentlyReading') {
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
      bookList: bookList,
      currentlyReading: currentlyReading,
      wantToRead: wantToRead,
      read: read,
    })
  }

  // API call for all books currently on a shelf
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.updateLibrary(books)
    }) 
  }

  // API call to add or move book from one shelf to another
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
        <Route path="/search" render={() => (
          <Search
            bookList = {this.state.bookList}
            onChange = {this.addBook}
          />
        )}/>

        <Route exact path="/" render={() => (
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
              <Link to="/search">Add a book</Link>
            </div>
          </div>
          )}/>
      </div>
    )
  }
}

export default BooksApp
