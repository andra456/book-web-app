// src/components/BookList.tsx
import React, { useState } from "react";
import { Book } from "../../types";
import BookItem from "./BookItem";
import Pagination from "../../material/components/pagination";

interface BookListProps {
  books: Book[];
  onToggleFavorite: (id: number) => void;
  onEditClick: (book: Book) => void;
  onDeleteClick: (id: number) => void;
  favorites: number[];
}

const BookList: React.FC<BookListProps> = ({
  books,
  onToggleFavorite,
  onEditClick,
  onDeleteClick,
  favorites,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="book-list row">
        {currentBooks
          ? currentBooks.map((book: Book) => (
              <BookItem
                key={book.id}
                book={book}
                onToggleFavorite={onToggleFavorite}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
                isFavorite={favorites.includes(book.id)}
              />
            ))
          : ""}
      </div>

      <Pagination
        currentPage={currentPage}
        onPageChange={paginate}
        totalCount={books.length}
        pageSize={booksPerPage}
      />
    </>
  );
};

export default BookList;
