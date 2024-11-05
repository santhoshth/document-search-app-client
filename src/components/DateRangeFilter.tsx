interface DateRangeFilterProps {
    startDate: string;
    endDate: string;
    handleStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateRangeFilter = ({
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
}: DateRangeFilterProps) => {
    return (
        <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
                <label className="block text-gray-700 mb-1">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    max={endDate}
                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
            <div className="w-1/2">
                <label className="block text-gray-700 mb-1">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    min={startDate}
                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
        </div>
    );
};

export default DateRangeFilter;
