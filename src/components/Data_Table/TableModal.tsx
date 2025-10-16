"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  name: string;
};

interface PaymentModalProps {
  payment: Payment;
  onClose: () => void;
}

const PaymentModal = ({ payment, onClose }: PaymentModalProps) => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] max-w-full">
        <h2 className="text-lg font-bold mb-4">Payment Details</h2>
        <p><strong>Name:</strong> {payment.name}</p>
        <p><strong>Email:</strong> {payment.email}</p>
        <p><strong>Status:</strong> {payment.status}</p>
        <p>
          <strong>Amount:</strong>{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(payment.amount)}
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={() => router.push(`/table/${payment.id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
