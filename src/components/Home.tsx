import React, { useState } from 'react';
import { File } from '../types';
import SearchBox from './SearchBox';
import DateRangeFilter from './DateRangeFilter';
import SearchButton from './SearchButton';
import ResultsTable from './ResultsTable';
import NoResults from './NoResults';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: string }>({ key: "name", direction: "asc" });
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchAttempted, setSearchAttempted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value);
    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value);

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            alert("Please enter a search term");
            return;
        }

        setLoading(true);
        setResults([]);
        setSearchAttempted(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_INSTANCE_URL}/api/search?q=${searchTerm}`);
            const data = await response.json();
            setResults(data.files);
        } catch (error) {
            console.error("Error fetching search results:", error);
            alert("Failed to fetch search results");
        }

        setLoading(false);
    };

    const handleSort = (key: "name" | "lastUpdatedTime") => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const filteredResults = results.filter((file) => {
        if (!startDate && !endDate) return true;

        const fileDate = new Date(file.lastUpdatedTime).setHours(0, 0, 0, 0);
        const startDateNormalized = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
        const endDateNormalized = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

        const isAfterStart = startDateNormalized ? fileDate >= startDateNormalized : true;
        const isBeforeEnd = endDateNormalized ? fileDate <= endDateNormalized : true;
        return isAfterStart && isBeforeEnd;
    });

    const sortedResults = filteredResults.sort((a, b) => {
        if (!sortConfig) return 0;
        const modifier = sortConfig.direction === 'asc' ? 1 : -1;
        if (sortConfig.key === "name") {
            return modifier * a.name.localeCompare(b.name);
        } else if (sortConfig.key === "lastUpdatedTime") {
            return modifier * (new Date(a.lastUpdatedTime).getTime() - new Date(b.lastUpdatedTime).getTime());
        }
        return 0;
    });

    return (
        <>
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8 mb-8">
                <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Dropbox File Search</h1>

                <SearchBox searchTerm={searchTerm} handleInputChange={handleInputChange} handleSearch={handleSearch} />
                <DateRangeFilter startDate={startDate} endDate={endDate} handleStartDateChange={handleStartDateChange} handleEndDateChange={handleEndDateChange} />
                <SearchButton handleSearch={handleSearch} loading={loading} />


            </div>
            {!loading && searchAttempted && sortedResults.length === 0 && <NoResults />}
            {sortedResults.length > 0 && (
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Results</h2>
                    <ResultsTable results={sortedResults} sortConfig={sortConfig} handleSort={handleSort} />
                </div>
            )}
        </>
    );
};

export default Home;
