import { useState } from "react";

import "./_index.scss";

import { useBooks, TypeFetch } from "../../hooks/useBooks";
import { useFavorites } from "../../hooks/useFavorite";
import BookList from "./BookList";
import AddBookForm from "./AddBookForm";
import { Book } from "@types-book/index";
import { Loader, Read } from "../../assets/img/Images";

function Home() {
  const { books: apiBooks, loading } = useBooks({ type: TypeFetch.LIST });
  const { favorites, toggleFavorite } = useFavorites();
  const [localBooks, setLocalBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const handleAddBook = (book: Book) => {
    const currentBook = [...localBooks];
    currentBook.unshift({ ...book, isLocal: true });
    setLocalBooks(currentBook);
    setShow(false);
  };

  const handleEditBook = (updatedBook: Book) => {
    setLocalBooks(
      localBooks.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      )
    );
    setEditingBook(null);
    setShow(false);
  };

  const handleDeleteBook = (id: number) => {
    setLocalBooks(localBooks.filter((book) => book.id !== id));
  };

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
    setShow(true);
  };

  const allBooks = [...localBooks, ...apiBooks];

  return (
    <div className="content-wrapper">
      <div className="header">
        <h3>Great reading book</h3>
        <span>Happy reading book serries & explore beyond your expirence</span>
        <div className="bg-right">
          <Read />
        </div>
      </div>
      <div className="body-book">
        <h2 className="title-header">
          Popular Now
          <div className="left-ico">
            <button onClick={() => setShow(true)} className="ico add squard">
              Add Book
            </button>
          </div>
        </h2>
        <AddBookForm
          show={show}
          setShow={setShow}
          onAddBook={handleAddBook}
          onEditBook={handleEditBook}
          editingBook={editingBook}
        />
        <BookList
          books={allBooks}
          onToggleFavorite={toggleFavorite}
          favorites={favorites}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteBook}
        />
      </div>

      <div className="loader-book">{loading ? <Loader /> : ""}</div>
    </div>
  );
}

export default Home;
