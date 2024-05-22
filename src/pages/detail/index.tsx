import { useEffect } from "react";

import { BrowserRouter as Link, useRouteMatch } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { Card } from "../../material/components/card";

import "./_index.scss";
import { useBooks, TypeFetch } from "../../hooks/useBooks";
import moment from "moment";

const dummy_img_url =
  "https://i1.rgstatic.net/publication/313278694_EVALUASI_ISI_BUKU_TEKS_PELAJARAN_SEJARAH_PADA_MASA_ORDE_BARU/links/5894b409aca2721f0da1cfa7/largepreview.png";
export interface MatchParams {
  Id: string;
}

const Detail = (props: any) => {
  const routepath = useRouteMatch<MatchParams>("/read/:Id");
  const { book, loading, fetchBooks } = useBooks({ type: TypeFetch.DETAIL });

  const Id = routepath?.params.Id;

  useEffect(() => {
    fetchBooks({ path: `/${Id}` });
  }, []);

  return (
    <section className="vision-section">
      <div className="head-static patter-dash"></div>
      <div className=" row">
        <div className="col-xs-12 col-md-8">
          <div className="header-detail">
            <h2>{book?.title}</h2>
            <span>
              By{" "}
              <a
                href={
                  "https://www.google.com/search?tbm=bks&q=" +
                  book?.author +
                  ":" +
                  book?.title
                }>
                {book?.author}.
              </a>{" "}
              {moment(book?.publicationDate).format("LL")}
            </span>
          </div>
          <div className="button-list">
            <button>
              <IoIosSearch /> Preview
            </button>
            <button>
              <MdFavoriteBorder />
              Add to favorite
            </button>
          </div>
        </div>
        <div className="col-xs-12 col-md-4">
          <div className="list-cover">
            <Card className="cover-book" src={book?.cover ?? ""} />
            <Card className="cover-book" src={dummy_img_url} />
          </div>
        </div>
      </div>

      {book ? (
        <div className="meta-writter row">
          <div className="col-xs-12 col-md-8">
            <h4> Description</h4>
            <div className="book-show">
              <div className="detail">
                <p>
                  Published :{" "}
                  <span>{moment(book?.publicationDate).format("LL")}</span>
                </p>
                <p>
                  Author : <span>{book?.author}</span>
                </p>
                <div className="divider"></div>
                <p>{book.description}</p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book..
                </p>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-4">
            <h4>About writter</h4>
            <div className="book-show">
              <div className="detail">
                <h3>{book?.author}</h3>
                <span> Author</span>
                <div className="divider"></div>
                <p>
                  {book?.author} Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Detail;
