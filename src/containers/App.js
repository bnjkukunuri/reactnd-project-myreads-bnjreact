import React from 'react';
import { Link, Route } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import BookShelf from "../components/BookShelf";
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    });
  }

  getBooksByShelf(shelfName) {
    return this.state.books.filter( (b) => b.shelf === shelfName);
  }

  changeShelf = (book, newShelfName) => {
    BooksAPI.update(book, newShelfName).then( () => {
      book.shelf = newShelfName;

      this.setState( state => ({
        books : state.books.filter( (b) => b.id !== book.id).concat([book])
      }));
    });
  };

  render() {
    return (
        <div className="app">
          <Route 
            path="/search"
            render={({ history }) => 
              (<div className="search-books">
                <div className="search-books-bar">
                  <Link className="close-search" to="/">close</Link>
                  <div className="search-books-input-wrapper">
                    {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author"/>
                  </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
            </div>)}
            />
            <Route
              exact
              path="/"
              render={() => 
                (<div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <BookShelf 
                    title="Currently Reading" 
                    books= {this.getBooksByShelf("currentlyReading")}
                    changeShelf={this.changeShelf}
                    />

                    <BookShelf 
                    title="Want to Read" 
                    books= {this.getBooksByShelf("wantToRead")}
                    changeShelf={this.changeShelf}
                    />

                    <BookShelf 
                    title="Read" 
                    books= {this.getBooksByShelf("read")}
                    changeShelf={this.changeShelf}
                    />
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>                  
                </div>
              </div>)}
            />
        </div> 
    )
  }
}

export default BooksApp
