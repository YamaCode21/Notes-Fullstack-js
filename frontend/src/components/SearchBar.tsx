import React from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="w-5/12 bg-slate-500 rounded-lg max-w-md mx-auto my-4">
      <input
        type="text"
        placeholder="Buscar notas..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full !p-1 text-white placeholder-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-all shadow-md"
      />
    </div>
  );
};

export default SearchBar;
