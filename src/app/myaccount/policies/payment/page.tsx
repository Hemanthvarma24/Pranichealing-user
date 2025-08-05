import { BottomNav } from "@/components/fotter";
import { NavHeader } from "@/components/topnav";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PaymentPolicy() {
  return (
    <><NavHeader /><div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg relative pt-[100px] mb-20">
      {/* Header Section */}
      <div className="flex items-center w-full mb-6">
        <Link
          href="/myaccount/policies"
          className="p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition duration-200 flex items-center"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-xl font-semibold ml-4 text-gray-800">
          Payment Policy
        </h2>
      </div>

      {/* Introductory Paragraph */}
      <p className="text-gray-600 mb-6 text-center leading-relaxed">
        Our Payment Policy outlines the terms and conditions related to payments
        made on our platform. By making a payment, you agree to the following
        terms and conditions.
      </p>

      {/* Accepted Payment Methods */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Accepted Payment Methods
        </h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Credit/Debit Cards (Visa, MasterCard, AMEX)</li>
          <li>UPI & Net Banking</li>
          <li>Google Pay & PhonePe</li>
          <li>Cash on Delivery (where applicable)</li>
        </ul>
      </section>

      {/* Payment Processing */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Payment Processing
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Payments are securely processed through our payment partners.
          Transactions are encrypted to ensure security and privacy. Any failed
          transactions will be automatically refunded within 5-7 business days.
        </p>
      </section>

      {/* Refund & Cancellation Policy */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Refund & Cancellation Policy
        </h2>
        <p className="text-gray-600 leading-relaxed">
          If you wish to request a refund or cancel your order, please refer to
          our Refund Policy page for detailed guidelines. Refunds are processed
          within 7-10 business days.
        </p>
      </section>

      {/* Contact Us */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Contact Us</h2>
        <p className="text-gray-600 leading-relaxed">
          For any payment-related queries, feel free to reach out to our support
          team at
          <a
            href="mailto:support@example.com"
            className="font-semibold text-blue-600 ml-1"
          >
            support@example.com
          </a>
          .
        </p>
      </section>

      {/* Bottom Navigation */}
      <BottomNav />
    </div></>
  );
}
