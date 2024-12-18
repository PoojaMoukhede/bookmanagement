import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import CreateBook from "../component/CreateBook";
import EditBook from "../component/EditBook";
import axios from "axios";
import book from "../imgs/2.jpg";
import { useAPI } from "../Context";

export default function ProductDashboard() {
  const { handleDelete } = useAPI();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false); // Modal state
  const [selectedBook, setSelectedBook] = useState(null); // State for the selected book
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // Modal state
  const [books, setBooks] = useState([]); // State for storing books
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
  const [searchText, setSearchText] = useState(""); // State for search input
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Function to fetch books from the backend
  const fetchBooks = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(response.data); // Set books to state
      setFilteredBooks(response.data); // Set filtered books to state
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false); // Stop loading once the request is done
    }
  };

  // Function to handle search
  const handleSearch = (event) => {
    setSearchText(event.target.value);
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  useEffect(() => {
    fetchBooks(); // Call fetchBooks when the component mounts
  }, []); // Empty dependency array ensures it runs only once

  const handleOpenCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalVisible(false);
  };

  const handleOpenEditModal = (book) => {
    setSelectedBook(book); // Set the selected book for editing
    setIsEditModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
  };

  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: "7rem" }}>
        <div className="d-flex justify-content-start align-items-center">
          {/* Search and Create Button */}

          <div className="d-flex align-items-center">
            <input
              placeholder="Search by name"
              value={searchText}
              onChange={handleSearch}
              className="form-control search-input"
              style={{
                width: 250,
                height: 40,
                borderColor: "#1d3a4c",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
              }}
            />
            <button
              className="btn ms-3 create-btn"
              onClick={handleOpenCreateModal}
              style={{
                backgroundColor: "#1d3a4c",
                color: "#fff",
              }}
            >
              Create
            </button>
          </div>
        </div>

        {/* Books Display */}
        <div className="row mt-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            Array.isArray(filteredBooks) &&
            filteredBooks.map((item) => (
              <div key={item._id} className="col-md-4 mb-4">
                <div className="card book-card">
                  {/* Book Card */}
                  <img
                    src={book} // Default image if not available
                    className="card-img-top"
                    alt={item.title}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">Genre: {item.genre}</p>
                    <p className="card-text">Author: {item.author}</p>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-warning edit-btn"
                        onClick={() => handleOpenEditModal(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger delete-btn"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <CreateBook
        isCreateModalVisible={isCreateModalVisible}
        handleCloseCreateModal={handleCloseCreateModal}
      />
      <EditBook
        isEditModalVisible={isEditModalVisible}
        handleCloseEditModal={handleCloseEditModal}
        selectedBook={selectedBook}
      />
    </>
  );
}
