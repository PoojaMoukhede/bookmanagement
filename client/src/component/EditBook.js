import React, { useEffect, useState } from "react";
import { useAPI } from "../Context";

export default function EditBook({
  isEditModalVisible,
  handleCloseEditModal,
  selectedBook, // Receive the selected book prop
}) {
  const {
    updateBook,
    fetchBooks,
    title,
    setTitle,
    author,
    setAuthor,
    genre,
    setGenre,
  } = useAPI();

  // Update form fields when selectedBook changes
  useEffect(() => {
    if (selectedBook) {
      setTitle(selectedBook.title); // Set the initial value for title
      setAuthor(selectedBook.author); // Set the initial value for author
      setGenre(selectedBook.genre); // Set the initial value for genre
    }
  }, [selectedBook]);

  const handleSave = async () => {
    // Create the data object to send for update
    const updatedData = {
      title, // Send updated title
      author, // Send updated author
      genre, // Send updated genre
    };

    // Call the updateBook function
    await updateBook(selectedBook._id, updatedData);

    // Fetch updated books list
    await fetchBooks();

    // Close the modal
    handleCloseEditModal();
  };

  return (
    <div
      className={`modal fade ${isEditModalVisible ? "show" : ""}`}
      tabIndex="-1"
      style={{ display: isEditModalVisible ? "block" : "none" }}
      aria-labelledby="editBookModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editBookModalLabel">
              Edit Book
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleCloseEditModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              {/* Editable Title Field */}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="form-control"
                  value={title} // Bind input to state
                  onChange={(e) => setTitle(e.target.value)} // Update state on input change
                  required
                />
              </div>

              {/* Editable Author Field */}
              <div className="mb-3">
                <label htmlFor="author" className="form-label">
                  Author
                </label>
                <input
                  id="author"
                  type="text"
                  className="form-control"
                  value={author} // Bind input to state
                  onChange={(e) => setAuthor(e.target.value)} // Update state on input change
                  required
                />
              </div>

              {/* Editable Genre Field */}
              <div className="mb-3">
                <label htmlFor="genre" className="form-label">
                  Genre
                </label>
                <input
                  id="genre"
                  type="text"
                  className="form-control"
                  value={genre} // Bind input to state
                  onChange={(e) => setGenre(e.target.value)} // Update state on input change
                  required
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseEditModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
