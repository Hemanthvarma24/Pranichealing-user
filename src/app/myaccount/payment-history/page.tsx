"use client";

import { SetStateAction, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  CheckCircle,
  Clock
} from "lucide-react";
import { BottomNav } from "@/components/fotter";
import { NavHeader } from "@/components/topnav";

export default function PaymentHistory() {
  // Sample payment data with status and session information
  const [allPayments, setAllPayments] = useState([
    { 
      id: "PAY-1234", 
      date: "2025-05-01", 
      amount: 249.99, 
      status: "completed", 
      session: { id: "SES-6789", date: "2025-04-29" }
    },
    { 
      id: "PAY-1235", 
      date: "2025-04-25", 
      amount: 99.5, 
      status: "completed", 
      session: { id: "SES-6755", date: "2025-04-23" }
    },
    { 
      id: "PAY-1236", 
      date: "2025-04-15", 
      amount: 350.0, 
      status: "completed", 
      session: { id: "SES-6721", date: "2025-04-15" }
    },
    { 
      id: "PAY-1237", 
      date: "2025-04-02", 
      amount: 124.75, 
      status: "completed", 
      session: { id: "SES-6682", date: "2025-04-01" }
    },
    { 
      id: "PAY-1238", 
      date: "2025-03-28", 
      amount: 75.25, 
      status: "pending", 
      session: { id: "SES-6670", date: "2025-03-28" }
    },
    { 
      id: "PAY-1239", 
      date: "2025-03-15", 
      amount: 199.99, 
      status: "pending", 
      session: { id: "SES-6635", date: "2025-03-14" }
    },
    { 
      id: "PAY-1240", 
      date: "2025-03-01", 
      amount: 84.5, 
      status: "pending", 
      session: { id: "SES-6590", date: "2025-03-01" }
    },
  ]);

  const [activeTab, setActiveTab] = useState("completed");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 5;

  // Filter payments based on active tab and search term
  const filteredPayments = allPayments.filter(
    (payment) =>
      payment.status === activeTab &&
      (payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       payment.date.includes(searchTerm) ||
       payment.amount.toString().includes(searchTerm) ||
       payment.session.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       payment.session.date.includes(searchTerm))
  );

  // Calculate pagination
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  // Reset page when tab changes
  const handleTabChange = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Format date to be more readable
  const formatDate = (dateString: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format currency
  const formatCurrency = (amount: string | number | bigint) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(amount));
  };

  return (
    <>
      <NavHeader />
      <div className="min-h-screen bg-gray-50 p-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Payment History
          </h1>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === "completed"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => handleTabChange("completed")}
            >
              <CheckCircle size={18} className="mr-2" />
              Completed
            </button>
            <button
              className={`flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === "pending"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => handleTabChange("pending")}
            >
              <Clock size={18} className="mr-2" />
              Pending
            </button>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-lg shadow mb-6 p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search payments..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Payment ID
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Session
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentPayments.length > 0 ? (
                    currentPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {payment.id}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(payment.date)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          <div>{payment.session.id}</div>
                          <div className="text-xs text-gray-500">{formatDate(payment.session.date)}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-medium">
                          {formatCurrency(payment.amount)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-8 text-center text-sm text-gray-500"
                      >
                        No {activeTab} payment records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredPayments.length > 0 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">
                        {indexOfFirstPayment + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(indexOfLastPayment, filteredPayments.length)}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {filteredPayments.length}
                      </span>{" "}
                      payments
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </button>

                      {/* Page numbers - simplified for example */}
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        {currentPage} / {totalPages || 1}
                      </span>

                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages || 1)
                          )
                        }
                        disabled={currentPage === (totalPages || 1)}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === (totalPages || 1)
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </nav>
                  </div>
                </div>

                {/* Mobile pagination */}
                <div className="flex items-center justify-between w-full sm:hidden">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      currentPage === 1
                        ? "text-gray-300 bg-gray-100"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages || 1}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))
                    }
                    disabled={currentPage === (totalPages || 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      currentPage === (totalPages || 1)
                        ? "text-gray-300 bg-gray-100"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}