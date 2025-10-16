"use client";

import { useParams } from "next/navigation";

const SingleTable = () => {
  const params = useParams();
  const { table } = params;
  console.log(table)
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
      <p>Payment ID: {table}</p>
    </div>
  );
};

export default SingleTable;
