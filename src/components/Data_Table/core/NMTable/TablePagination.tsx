"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TablePaginationProps = {
  totalPage: number;
  currentPage?: number;
  onPageChange?: (page: number, limit: number) => void;
};

const TablePagination = ({
  totalPage,
  currentPage = 1,
  onPageChange,
}: TablePaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(currentPage);
  const [limit, setLimit] = useState<number>(
    parseInt(searchParams.get("limit") || "10", 10)
  );
  const [startPage, setStartPage] = useState<number>(1); 

  const [maxVisible, setMaxVisible] = useState<number>(5); // default

useEffect(() => {
  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setMaxVisible(3); 
    } else if (width >= 640 && width < 1024) {
      setMaxVisible(3); 
    } else {
      setMaxVisible(10); 
    }
  };

  handleResize(); 
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (page < startPage) setStartPage(page);
    if (page >= startPage + maxVisible) setStartPage(page - maxVisible + 1);
  }, [page]);

  const updateQueryParams = (newPage: number, newLimit: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    params.set("limit", newLimit.toString());

    router.push(`${pathname}?${params.toString()}`);
    onPageChange?.(newPage, newLimit);
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      updateQueryParams(page - 1, limit);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
      updateQueryParams(page + 1, limit);
    }
  };

  const handleFirst = () => {
    setStartPage(1);
    setPage(1);
    updateQueryParams(1, limit);
  };

  const handleLast = () => {
    const lastStart = Math.max(totalPage - maxVisible + 1, 1);
    setStartPage(lastStart);
    setPage(totalPage);
    updateQueryParams(totalPage, limit);
  };

  const visiblePages = [];
  for (let i = startPage; i < Math.min(startPage + maxVisible, totalPage + 1); i++) {
    visiblePages.push(i);
  }

  return (
    <div className="flex md:justify-end flex-col sm:flex-row items-center sm:justify-between w-full mt-6 gap-4 px-4 xl:gap-[5rem]">
      {/* Pagination Buttons */}
      <div className="flex items-center gap-2 flex-wrap order-1 sm:order-1">
        {/* First Page */}
        <Button
          onClick={handleFirst}
          variant="outline"
          size="lg"
          className="w-12 h-12 rounded-full flex items-center justify-center"
        >
          <ChevronsLeft className="h-6 w-6" />
        </Button>

        {/* Previous Page */}
        <Button
          onClick={handlePrev}
          disabled={page === 1}
          variant="outline"
          size="lg"
          className="w-12 h-12 rounded-full flex items-center justify-center"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Page Numbers */}
        {visiblePages.map((num) => (
          <Button
            key={num}
            onClick={() => {
              setPage(num);
              updateQueryParams(num, limit);
            }}
            variant={num === page ? "default" : "outline"}
            size="lg"
            className="w-12 h-12 rounded-full flex items-center justify-center"
          >
            {num}
          </Button>
        ))}

        {/* Next Page */}
        <Button
          onClick={handleNext}
          disabled={page === totalPage}
          variant="outline"
          size="lg"
          className="w-12 h-12 rounded-full flex items-center justify-center"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Last Page */}
        <Button
          onClick={handleLast}
          variant="outline"
          size="lg"
          className="w-12 h-12 rounded-full flex items-center justify-center"
        >
          <ChevronsRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Limit Selector */}
      <span className="flex items-center gap-2 text-sm order-2 sm:order-2">
        <span className="text-gray-600">Show:</span>
        <Select
          value={limit?.toString() || "10"}
          onValueChange={(value) => {
            const newLimit = parseInt(value, 10);
            setLimit(newLimit);
            updateQueryParams(1, newLimit);
            setStartPage(1);
            setPage(1)
            
          }}
        >
          <SelectTrigger className="w-[130px] border-gray-300 text-sm rounded-xl focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Select limit" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 30, 50].map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option} per page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </span>
    </div>
  );
};

export default TablePagination;
