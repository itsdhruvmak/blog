import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 2) end = 4;
            if (currentPage >= totalPages - 1) start = totalPages - 3;

            if (start > 2) pages.push('...');
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            if (end < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-between mt-16 max-w-5xl mx-auto border-t border-black pt-8 px-2 md:px-0">
            {/* Previous Page */}
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-3 cursor-pointer group transition-colors ${currentPage === 1 ? 'text-gray-200' : 'text-gray-400 hover:text-black'
                    }`}
            >
                <span className="text-xl">←</span>
                <span className="font-serif italic text-lg hidden sm:inline">previous page</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNum, index) => {
                    if (pageNum === '...') {
                        return <span key={`dots-${index}`} className="px-2 text-black">...</span>;
                    }
                    return (
                        <button
                            key={pageNum}
                            onClick={() => onPageChange(pageNum)}
                            className={`w-10 h-10 flex items-center justify-center font-medium cursor-pointer transition-all ${currentPage === pageNum
                                ? "bg-black text-white"
                                : "border border-transparent hover:border-black text-black"
                                }`}
                        >
                            {pageNum}
                        </button>
                    );
                })}
            </div>

            {/* Next Page */}
            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-3 cursor-pointer group transition-opacity ${currentPage === totalPages ? 'text-gray-200' : 'text-black hover:opacity-60'
                    }`}
            >
                <span className="font-serif italic text-lg border-b-2 border-current pb-0.5 hidden sm:inline">
                    next page
                </span>
                <span className="text-xl">→</span>
            </button>
        </div>
    );
};

export default Pagination;