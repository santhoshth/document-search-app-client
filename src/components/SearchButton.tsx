interface SearchButtonProps {
    handleSearch: () => void;
    loading: boolean;
}

const SearchButton = ({ handleSearch, loading }: SearchButtonProps) => {
    return (
        <button
            onClick={handleSearch}
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-md ${loading ? "bg-teal-300" : "bg-teal-600 hover:bg-teal-700"} text-white`}
        >
            {loading ? "Searching..." : "Search"}
        </button>
    );
};

export default SearchButton;
