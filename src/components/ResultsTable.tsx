import { File } from '../types';

const enum SORTING_KEYS {
    NAME = 'name',
    LAST_UPDATED_TIME = 'lastUpdatedTime'
}

interface ResultsTableProps {
    results: File[];
    sortConfig: { key: string; direction: string };
    handleSort: (key: SORTING_KEYS) => void;
}

const ResultsTable = ({ results, sortConfig, handleSort }: ResultsTableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-teal-100">
                        <th
                            className="px-4 py-3 text-left text-teal-800 font-semibold cursor-pointer hover:bg-teal-200"
                            onClick={() => handleSort(SORTING_KEYS.NAME)}
                        >
                            Name {sortConfig.key === SORTING_KEYS.NAME ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                        </th>
                        <th
                            className="px-4 py-3 text-left text-teal-800 font-semibold cursor-pointer hover:bg-teal-200"
                            onClick={() => handleSort(SORTING_KEYS.LAST_UPDATED_TIME)}
                        >
                            Last Modified Date {sortConfig.key === SORTING_KEYS.LAST_UPDATED_TIME ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((file, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">
                                <a
                                    href={file.publicUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-teal-700 hover:underline font-medium"
                                >
                                    {file.name}
                                </a>
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                                {new Date(file.lastUpdatedTime).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsTable;
