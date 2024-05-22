import { useEffect, useState } from "react";
import { Book } from "../types";

const API_URL = "https://my-json-server.typicode.com/cutamar/mock/books";

export enum TypeFetch {
  LIST = "LIST",
  DETAIL = "DETAIL",
}
interface PropsUseBook {
  type: TypeFetch;
}

export const useBooks = ({ type }: PropsUseBook) => {
  // for list data
  const [books, setBooks] = useState<Book[]>([]);
  // for single data
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchBooks = async ({ path = "" }: { path?: string }) => {
    try {
      const response = await fetch(API_URL + path);
      const data = await response.json();
      if (type === TypeFetch.LIST) {
        setBooks(data);
      } else if (type === TypeFetch.DETAIL) {
        setBook(data);
      }
    } catch (err) {
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type === TypeFetch.LIST) {
      fetchBooks({});
    }
  }, []);

  return { books, book, loading, error, fetchBooks };
};
