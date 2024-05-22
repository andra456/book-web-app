import { useState } from "react";
import { Link } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite, MdDeleteOutline } from "react-icons/md";
import { TfiClose } from "react-icons/tfi";
import { BiEditAlt } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import moment from "moment";

import { Book } from "../../types";

interface BookItemProps {
  book: Book;
  onToggleFavorite: (id: number) => void;
  onEditClick: (book: Book) => void;
  onDeleteClick: (id: number) => void;
  isFavorite: boolean;
}

interface StateDetail {
  show: boolean;
  id: null | number;
}

const BookItem = ({
  book,
  onToggleFavorite,
  onEditClick,
  onDeleteClick,
  isFavorite,
}: BookItemProps) => {
  const initDetail = {
    show: false,
    id: null,
  };
  const [detail, setDetail] = useState<StateDetail>(initDetail);
  const handleViewDetail = (id) => {
    // Logic to delete book
    setDetail({ show: true, id });
  };
  return (
    <div
      className={`${
        detail.show && Number(detail.id) === Number(book.id) && "show"
      } grid-card col-xs-6 col-sm-6 col-md-4 col-lg-3`}>
      <div className="details-open">
        <div className="perspective">
          <div className="book" data-book="book-8">
            <div className="cover">
              <div className="front">
                <div
                  className="book-img"
                  style={{
                    backgroundImage: `url(${book.cover})`,
                  }}></div>
              </div>

              <div className="inner inner-left">
                <Link to={`/read/${book.id}`}> </Link>
              </div>
            </div>
            <div className="inner inner-right"></div>
          </div>
          <div className="buttons">
            <button className="btn" onClick={() => handleViewDetail(book.id)}>
              <BsEye /> <span>View</span>
            </button>

            <button
              className="favorite"
              onClick={() => onToggleFavorite(book.id)}>
              {isFavorite ? <MdFavorite fill="red" /> : <MdFavoriteBorder />}
            </button>
            {book.isLocal && (
              <>
                <button className="btn" onClick={() => onEditClick(book)}>
                  <BiEditAlt />
                </button>
                <button className="btn" onClick={() => onDeleteClick(book.id)}>
                  <MdDeleteOutline />
                </button>
              </>
            )}
          </div>

          <h3 className="title">{book.title}</h3>
        </div>
        <div className="details">
          <button
            className="close"
            onClick={() => setDetail({ ...detail, show: false })}>
            <TfiClose />
          </button>
          <ul>
            <li>
              <h3>{book.title}</h3>
            </li>
            <li>
              {book.description?.substring(0, 120)}...{" "}
              <a href={`/read/${book.id}`}> (Read more)</a>
            </li>
            <li>{book.author}</li>
            <li>{moment(book.publicationDate).format("ll")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
