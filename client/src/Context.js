import React, { useContext, useState, createContext } from "react";
import axios from "axios";

const APIContext = createContext();

export function APIContextProvider({ children }) {
  //   const URL = "http://localhost:5000/";

  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  // const fetchBooks = async () => {
  //   setLoading(true);
  //   const token = localStorage.getItem("token");
  
  //   if (!token) {
  //     console.log("No token found");
  //     setLoading(false); // Make sure to stop loading if no token
  //     return;
  //   }
  
  //   try {
  //     const res = await axios.get("http://localhost:5000/books", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  
  //     console.log(res); // Inspect the response structure
  
  //     // Assuming books are directly in res.data (from the backend)
  //     setBooks(res.data);
  //     setFilteredBooks(res.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching Books:", error);
  //     setLoading(false);
  //   }
  // };
  
 // Function to fetch books
 const fetchBooks = async () => {
  setLoading(true);
  try {
    const response = await axios.get("http://localhost:5000/books", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setBooks(response.data);
    setFilteredBooks(response.data);
  } catch (error) {
    console.error("Error fetching books:", error);
  } finally {
    setLoading(false);
  }
};
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    filterData(e.target.value);
  };

  const filterData = (searchText, roleFilter) => {
    const filtered = books.filter((user) => {
      const nameMatch = user.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return nameMatch;
    });
    setFilteredBooks(filtered);
  };

  const handleDelete = async (book) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        console.log("No token found");
        return;
      }
  
      // Send DELETE request with Authorization header
      await axios.delete(`http://localhost:5000/books/${book}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the request header
        },
      });
      console.log("Deleting book with ID:", book);
  
      // Refetch the updated books list
      await fetchBooks(); // Call your fetch function to update the list
    } catch (e) {
      console.error("Error deleting book:", e);
    }
  };
  

  const createBooks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found, please log in again!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/books",
        { title, author, genre },
        {
          headers: { Authorization: `Bearer ${token}` }, // Add Bearer prefix
        }
      );
      alert("Book created successfully!");
      await fetchBooks();
    } catch (error) {
      console.error("Error creating book:", error);
      alert("Failed to create book!");
    }
  };

 const updateBook = async (bookId, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }
  
      const response = await axios.put(
        `http://localhost:5000/books/${bookId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("Book updated successfully:", response.data);
      await fetchBooks(); 
      return response.data;
    } catch (error) {
      console.error("Error updating book:", error);
      throw error; // Optionally, handle the error in your component
    }
  };
  

  return (
    <APIContext.Provider
      value={{
        books,
        setBooks,
        searchText,
        setSearchText,
        loading,
        setLoading,
        fetchBooks,
        handleSearch,
        updateBook,
        filterData,
        handleDelete,
        filteredBooks,
        name,
        setName,
        email,
        setEmail,
        title,
        setTitle,
        author,
        setAuthor,
        genre,
        setGenre,
        password,
        setPassword,
        createBooks,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
