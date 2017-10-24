import React from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";
import BookShelf from "../components/BookShelf";
import Search from "../components/Search";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: []
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
        books : state.books.filter(b => b.id !== book.id).concat([ book ])
      }));
    });
  };

  booksSearch = (searchQuery) => {
    if(searchQuery){
      BooksAPI.search(searchQuery, 30).then((result) => {
        if(result && result.length){
          result.forEach((book, index) => {
            let myBook = this.state.books.find((b) => b.id === book.id);
            book.shelf = myBook ? myBook.shelf : 'none';
            result[index] = book;
          });

          this.setState({
              searchBooks: result
          });
        }
      });
    } else {
      this.setState({
          searchBooks: []
      });
    }
  }; 

  render() {
    return (
        <div className="app">
          <Route path="/search" render={() => (
            <Search
                books={this.state.searchBooks}
                booksSearch={this.booksSearch}
                changeShelf={this.changeShelf}                
            />
          )}/>
          <Route exact path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <BookShelf 
                      title="Currently Reading" 
                      books={this.getBooksByShelf("currentlyReading")}
                      changeShelf={this.changeShelf}/>

                    <BookShelf 
                      title="Want to Read" 
                      books={this.getBooksByShelf("wantToRead")}
                      changeShelf={this.changeShelf}/>

                    <BookShelf 
                      title="Read" 
                      books={this.getBooksByShelf("read")}
                      changeShelf={this.changeShelf}/>
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>                  
                </div>
              </div>)}/>
        </div> 
    )
  }
}

export default BooksApp
