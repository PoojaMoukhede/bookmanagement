import React, { useState ,useEffect} from "react";
import { useAPI } from "../Context";

export default function CreateBook({
  isCreateModalVisible,
  handleCloseCreateModal,
}) {
  const { title, setTitle, author, setAuthor, genre, setGenre, createBooks,fetchBooks } =
    useAPI(); // API function to handle book creation

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Validation (basic)
    if (!title || !author || !genre) {
      alert("Please fill out all fields");
      return;
    }

    // Call createBook API function
    await createBooks({ title, author, genre });

    // Reset fields and close modal
    setTitle("");
    setAuthor("");
    setGenre("");
    handleCloseCreateModal();
   await fetchBooks()
  };

  if (!isCreateModalVisible) return null; // Do not render if modal is not visible

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Book</h5>
            <button
              type="button"
              className="close"
              onClick={handleCloseCreateModal}
            >
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter book title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  placeholder="Enter author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <input
                  type="text"
                  className="form-control"
                  id="genre"
                  placeholder="Enter genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseCreateModal}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Create Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
