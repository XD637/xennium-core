'use client';

import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter(); // Initialize the router

  const handleSearch = async (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    if (inputValue.trim() === '') {
      setSuggestions([]);
      return;
    }

    // Fetch suggestions based on the current input
    try {
      const response = await fetch(`/api/searchUser?query=${encodeURIComponent(inputValue)}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (username) => {
    setQuery(username);
    setSuggestions([]);
    router.push(`/profile/${username}`); // Redirect to the profile page
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex items-center border-1 border-black rounded-md p-2" style={{ backgroundColor: 'transparent' }}>
        <input
          type="text"
          className="flex-grow bg-transparent border-none focus:outline-none text-black px-2"
          placeholder="Search by username"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit" className="flex items-center justify-center p-1">
          <FiSearch className="h-6 w-6 text-black" />
        </button>
      </form>
      
      {/* Dropdown for real-time suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-black rounded-md mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion.username)} // Redirect on click
            >
              {suggestion.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
