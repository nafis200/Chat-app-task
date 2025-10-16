"use client";

import React, { useEffect } from "react";
import { NMTable } from "@/components/Data_Table/core/NMTable";
import TablePagination from "@/components/Data_Table/core/NMTable/TablePagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  name: string;
};

interface TableProps {
  payments: Payment[];
}

const Table = ({ payments }: TableProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("limit", "10");
    router.push(`${pathname}?${params.toString()}`);
  }, []);

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="font-medium">{formatted}</div>;
      },
    },
  ];

  return (
    <div className="mt-5">
      <NMTable data={payments} columns={columns} />
      <TablePagination totalPage={50} />
    </div>
  );
};

export default Table;
