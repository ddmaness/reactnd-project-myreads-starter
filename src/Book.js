import React from 'react'
import Options from './Options'

// Component for displaying information of individual books
function Book(props) {
	return( 
	  <li>
	  	<div className="book">
	  		<div className="book-top">
	  			<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: props.book.imageLinks ? `url(${props.book.imageLinks.smallThumbnail})` : 'none' }}></div>
						<div className="book-shelf-changer">
							<Options
								book = {props.book} 
								onChange = {props.onChange}
							/>
						</div>
					</div>
					<div className="book-title">{props.book.title}</div>
					<div className="book-authors">{props.book.authors ? props.book.authors.join(', ') : ''}</div>
				</div>
		</li>
	)}

export default Book