import React from 'react'

// Component for dropdown menu on each book
function Options(props) {
  return(
    <select onChange={function(event){props.onChange(props.book, event)}}>
      <option value="move" disabled>Move to...</option>
      <option hidden value='' defaultValue>dummy option for onChange workaround</option>
      <option value="currentlyReading">{props.book.shelf === 'currentlyReading' ? 'Currently Reading \u2713' : 'Currently Reading'}</option>
      <option value="wantToRead">{props.book.shelf === 'wantToRead' ? 'Want To Read \u2713' : 'Want To Read'}</option>
      <option value="read">{props.book.shelf === 'read' ? 'Read \u2713' : 'Read'}</option>
      <option value="none">{!props.book.shelf ? 'None \u2713' : 'None'}</option>
    </select>
  )}

export default Options