"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useSearch } from "@/context/SearchContext";

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setActiveSuggestionIndex(-1);
    if (term.trim() === "") {
      setFilteredBooks([]);
      setSuggestionsVisible(false);
      return;
    }
    setLoading(true);
    try {
      const booksCollection = collection(db, "livros");
      const q = query(booksCollection, orderBy("titulo"));
      const querySnapshot = await getDocs(q);
      const books = querySnapshot.docs.map((doc) => doc.data());
      setFilteredBooks(books);
      setSuggestionsVisible(true);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Buscar livros..."
      />
      {suggestionsVisible && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2">
          {filteredBooks.map((book, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer ${activeSuggestionIndex === index ? "bg-blue-100 text-black font-semibold" : "text-black hover:bg-gray-100"}`}
              onClick={() => setSearchTerm(book.titulo)}
            >
              {book.titulo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;