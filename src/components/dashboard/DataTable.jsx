import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSort, FaSortUp, FaSortDown, FaSearch, FaFilter } from "react-icons/fa";
import { cn } from "../../utils/cn";

const DataTable = ({
    data = [],
    columns = [],
    title = "Data Table",
    searchable = true,
    sortable = true,
    filterable = false,
    filters = [],
    onRowClick = null,
    loading = false,
    emptyMessage = "No data available",
    className = ""
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [activeFilters, setActiveFilters] = useState({});

    // Search functionality
    const filteredData = data.filter(item => {
        if (!searchTerm) return true;
        return columns.some(column => {
            const value = getNestedValue(item, column.key);
            return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
    });

    // Filter functionality
    const doubleFilteredData = filteredData.filter(item => {
        return Object.entries(activeFilters).every(([filterKey, filterValue]) => {
            if (!filterValue || filterValue === 'all') return true;
            const itemValue = getNestedValue(item, filterKey);
            return itemValue === filterValue;
        });
    });

    // Sort functionality
    const sortedData = React.useMemo(() => {
        if (!sortConfig.key) return doubleFilteredData;

        return [...doubleFilteredData].sort((a, b) => {
            const aValue = getNestedValue(a, sortConfig.key);
            const bValue = getNestedValue(b, sortConfig.key);

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [doubleFilteredData, sortConfig]);

    const handleSort = (key) => {
        if (!sortable) return;

        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) return <FaSort className="opacity-50" />;
        return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    };

    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    };

    const renderCell = (item, column) => {
        const value = getNestedValue(item, column.key);

        if (column.render) {
            return column.render(value, item);
        }

        return value?.toString() || '-';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`
        bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl rounded-2xl 
        shadow-modern-lg dark:shadow-modern-2xl interactive-border
        overflow-hidden ${className}
      `}
        >
            {/* Header */}
            <div className="p-6 glass-border border-t-0 border-l-0 border-r-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h3 className="text-xl font-bold text-text-primary">{title}</h3>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search */}
                        {searchable && (
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="
                    pl-10 pr-4 py-2 rounded-lg interactive-border
                    bg-bg-tertiary/80 dark:bg-bg-tertiary/60 text-text-primary placeholder-text-muted
                    focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50
                    transition-all duration-300 w-full sm:w-64
                  "
                                />
                            </div>
                        )}

                        {/* Filters */}
                        {filterable && filters.map(filter => (
                            <div key={filter.key} className="relative">
                                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
                                <select
                                    value={activeFilters[filter.key] || 'all'}
                                    onChange={(e) => setActiveFilters(prev => ({
                                        ...prev,
                                        [filter.key]: e.target.value
                                    }))}
                                    className="
                    pl-10 pr-8 py-2 rounded-lg interactive-border
                    bg-bg-tertiary/80 dark:bg-bg-tertiary/60 text-text-primary
                    focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50
                    transition-all duration-300 appearance-none cursor-pointer
                  "
                                >
                                    <option value="all">All {filter.label}</option>
                                    {filter.options.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                        <p className="mt-4 text-text-muted">Loading...</p>
                    </div>
                ) : sortedData.length === 0 ? (
                    <div className="p-12 text-center text-text-muted">
                        {emptyMessage}
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-bg-tertiary/50 dark:bg-bg-tertiary/30">
                            <tr>
                                {columns.map((column, index) => (
                                    <th
                                        key={column.key}
                                        onClick={() => handleSort(column.key)}
                                        className={`
                      px-6 py-4 text-left text-sm font-semibold text-text-primary
                      ${sortable && column.sortable !== false ? 'cursor-pointer hover:bg-bg-tertiary/70 dark:hover:bg-bg-tertiary/50' : ''}
                      transition-colors duration-200
                    `}
                                    >
                                        <div className="flex items-center gap-2">
                                            {column.label}
                                            {sortable && column.sortable !== false && (
                                                <span className="text-xs">
                                                    {getSortIcon(column.key)}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-primary/10 dark:divide-border-primary/20">
                            {sortedData.map((item, index) => (
                                <motion.tr
                                    key={item.id || index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    onClick={() => onRowClick?.(item)}
                                    className={cn(
                                        "table-row-hover transition-colors duration-200",
                                        onRowClick && "cursor-pointer"
                                    )}
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={column.key}
                                            className="px-6 py-4 text-sm text-text-secondary whitespace-nowrap"
                                        >
                                            {renderCell(item, column)}
                                        </td>
                                    ))}
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Footer with pagination info */}
            {!loading && sortedData.length > 0 && (
                <div className="px-6 py-4 glass-border border-t-0 border-l-0 border-r-0">
                    <p className="text-sm text-text-muted">
                        Showing {sortedData.length} of {data.length} entries
                        {searchTerm && ` (filtered from ${data.length} total entries)`}
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default DataTable;