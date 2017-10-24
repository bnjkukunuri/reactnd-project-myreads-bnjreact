import React, { Component } from "react";
import PropTypes from "prop-types";
import BookShelfChanger from "../components/BookShelfChanger";

class Book extends Component {
    static propTypes = {
        book : PropTypes.object.isRequired,
        changeShelf : PropTypes.func.isRequired
    }
    
    render() {
        const { book } = this.props;
        return(
            <div className="book" id={book.id}>
                <div className="book-top">
                    <div className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`,
                        }}                    
                    ></div>
                    <BookShelfChanger 
                        book={book} 
                        changeShelf={this.props.changeShelf}/>
                </div>
                <div className="book-title">{book.name}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        )
    }
}

export default Book