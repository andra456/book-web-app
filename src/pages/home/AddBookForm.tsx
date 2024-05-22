// src/components/AddBookForm.tsx
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CiImageOn } from "react-icons/ci";

import { Book } from "../../types";

interface AddBookFormProps {
  onAddBook: (book: Book) => void;
  onEditBook: (book: Book) => void;
  editingBook: Book | null;
  show: boolean;
  setShow: (e: boolean) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({
  onAddBook,
  onEditBook,
  editingBook,
  show,
  setShow,
}) => {
  const { register, handleSubmit, reset, setValue, getValues, watch } =
    useForm<Book>();

  useEffect(() => {
    if (editingBook) {
      setValue("title", editingBook.title);
      setValue("author", editingBook.author);
      setValue("description", editingBook.description);
      setValue("cover", editingBook.cover);
      setValue("publicationDate", editingBook.publicationDate);
    }
  }, [editingBook, setValue]);
  const cover = watch("cover");

  const onSubmit: SubmitHandler<Book> = (data) => {
    if (editingBook) {
      onEditBook({ ...data, id: editingBook.id, isLocal: true });
    } else {
      onAddBook({ ...data, id: Date.now(), isLocal: true });
    }
    reset();
  };
  console.log(cover);
  return (
    <div className={`layer ${show ? "show" : ""}`}>
      <div className="modal">
        <div className="cover">
          <div
            style={{
              backgroundImage: `url(${cover})`,
            }}>
            {!cover && (
              <span>
                <CiImageOn />
              </span>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("title")} placeholder="Title" required />
          <input {...register("author")} placeholder="Author" required />
          <textarea
            {...register("description")}
            placeholder="Description"
            required
          />
          <input {...register("cover")} placeholder="Cover URL" required />
          <input type="date" {...register("publicationDate")} required />
          <div className="group-button">
            <button className="submit" type="submit">
              {editingBook ? "Edit Book" : "Add Book"}
            </button>
            <div className="btn" onClick={() => reset()}>
              Reset
            </div>
            <div className="btn" onClick={() => setShow(false)}>
              Cancel
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
