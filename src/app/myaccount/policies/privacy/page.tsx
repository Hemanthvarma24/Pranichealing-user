"use client";

import { BottomNav } from "@/components/fotter";
import { NavHeader } from "@/components/topnav.tsx";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <NavHeader />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg relative pt-[100px] mb-16">
        {/* Header with Back Button */}
        <div className="flex items-center w-full mb-6">
          <Link
            href="/myaccount/policies"
            className="p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-xl font-semibold ml-4 text-gray-800">
            Privacy Policy
          </h2>
        </div>

        {/* Policy Introduction */}
        <p className="text-gray-600 mb-6">
          We are committed to protecting your privacy. This Privacy Policy
          explains how we collect, use, and safeguard your personal information
          when you use our services.
        </p>

        {/* Information We Collect */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Information We Collect
          </h3>
          <ul className="list-disc pl-6 text-gray-600 mb-6">
            <li>Personal Information (Name, Email, Phone Number, Address)</li>
            <li>Payment Information (if applicable)</li>
            <li>Usage Data (IP Address, Browser Type, Device Information)</li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            How We Use Your Information
          </h3>
          <p className="text-gray-600 mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 text-gray-600 mb-6">
            <li>Provide and maintain our services</li>
            <li>Process transactions securely</li>
            <li>Improve user experience and website functionality</li>
            <li>
              Send updates, promotional offers, and service-related
              communications
            </li>
          </ul>
        </section>

        {/* Data Security */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Data Security
          </h3>
          <p className="text-gray-600 mb-6">
            We implement security measures to protect your personal data from
            unauthorized access, alteration, or disclosure. However, no method
            of data transmission over the Internet is 100% secure.
          </p>
        </section>

        {/* Cookies and Tracking Technologies */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Cookies and Tracking Technologies
          </h3>
          <p className="text-gray-600 mb-6">
            We use cookies to enhance your browsing experience, analyze site
            traffic, and personalize content. You can choose to disable cookies
            in your browser settings.
          </p>
        </section>

        {/* Third-Party Services */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Third-Party Services
          </h3>
          <p className="text-gray-600 mb-6">
            We may share your data with third-party service providers to improve
            our platform, process payments, or provide analytics.
          </p>
        </section>

        {/* Your Rights */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Your Rights
          </h3>
          <p className="text-gray-600 mb-6">
            You have the right to access, update, or delete your personal data.
            If you wish to exercise these rights, please contact us.
          </p>
        </section>

        {/* Contact Us */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Contact Us
          </h3>
          <p className="text-gray-600">
            If you have any questions regarding our Privacy Policy, please reach
            out to us at
            <span className="font-semibold text-blue-600">
              {" "}
              privacy@example.com
            </span>
            .
          </p>
        </section>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </>
  );
}
