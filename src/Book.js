import React from 'react'

function Book(props) {
      return( 
        <li>
        	<div className="book">
        		<div className="book-top">
        			<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.smallThumbnail})` }}></div>
						<div className="book-shelf-changer">
							<select onChange={function(event){props.onChange(props.book, event)}}>
								<option value="move" disabled>Move to...</option>
								<option hidden value='' defaultValue>dummy option for onChange workaround</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{props.book.title}</div>
					<div className="book-authors">{props.book.authors.join(', ')}</div>
					</div>
				</li>
			)}

export default Book