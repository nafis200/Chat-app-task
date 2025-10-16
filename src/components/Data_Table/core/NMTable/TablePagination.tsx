"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
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

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

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

  return (
    <div
      className="
        flex md:justify-end flex-col sm:flex-row 
        items-center sm:justify-between 
        w-full mt-6 gap-4 px-4 xl:gap-[2rem]
      "
    >
      {/* Pagination Center (Top in mobile, Left in large) */}
      <div className="flex items-center flex-wrap gap-2 order-1 sm:order-1">
        <Button
          onClick={handlePrev}
          disabled={page === 1}
          variant="outline"
          size="sm"
          className="w-8 h-8 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1 flex-wrap justify-center">
          {[...Array(totalPage)].map((_, index) => (
            <Button
              key={index}
              onClick={() => {
                setPage(index + 1);
                updateQueryParams(index + 1, limit);
              }}
              variant={page === index + 1 ? "default" : "outline"}
              size="sm"
              className="w-8 h-8 rounded-full flex items-center justify-center"
            >
              {index + 1}
            </Button>
          ))}
        </div>

        <Button
          onClick={handleNext}
          disabled={page === totalPage}
          variant="outline"
          size="sm"
          className="w-8 h-8 rounded-full flex items-center justify-center"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <span className="flex items-center gap-2 text-sm order-2 sm:order-">
        <span className="text-gray-600">Show:</span>
        <Select
          value={limit?.toString() || "10"}
          onValueChange={(value) => {
            const newLimit = parseInt(value, 10);
            setLimit(newLimit);
            updateQueryParams(1, newLimit);
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
