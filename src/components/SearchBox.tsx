interface SearchBoxProps {
    searchTerm: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearch: () => void;
}

const SearchBox = ({ searchTerm, handleInputChange, handleSearch }: SearchBoxProps) => {
    return (
        <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search in files"
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleSearch();
                }
            }}
            className="w-full p-3 border border-gray-200 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
    );
};

export default SearchBox;
