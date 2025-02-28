import { BottomNav } from "@/components/fotter";
import { NavHeader } from "@/components/topnav.tsx";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <>
      <NavHeader />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg relative mb-16  pt-[100px]">
        {/* Header Section */}
        <div className="flex items-center w-full mb-6">
          <Link
            href="/myaccount/policies"
            className="p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-xl font-semibold ml-4 text-gray-800">
            Terms & Conditions
          </h2>
        </div>

        {/* Introductory Paragraph */}
        <p className="text-gray-600 mb-6 text-center leading-relaxed">
          Welcome to our Pranic Healing platform. By accessing or using our
          services, you agree to comply with the following Terms & Conditions.
          Please read them carefully.
        </p>

        {/* Terms Sections */}
        {terms.map((term, index) => (
          <section key={index} className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {term.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">{term.content}</p>
          </section>
        ))}

        {/* Contact Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            8. Contact Us
          </h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about these Terms & Conditions, please
            contact us at
            <span className="font-semibold text-blue-600">
              {" "}
              support@pranichealing.com
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

const terms = [
  {
    title: "1. Nature of Services",
    content:
      "Our platform provides educational resources, healing sessions, and guidance related to Pranic Healing. These services are complementary and should not replace medical or professional healthcare advice.",
  },
  {
    title: "2. Personal Responsibility",
    content:
      "Pranic Healing is an energy-based healing modality. By using our services, you acknowledge that any healing sessions, courses, or consultations are intended for spiritual and well-being purposes only.",
  },
  {
    title: "3. Health Disclaimer",
    content:
      "Pranic Healing is not a substitute for medical diagnosis, treatment, or professional healthcare. If you have a medical condition, please consult a licensed physician before participating in healing sessions.",
  },
  {
    title: "4. Payment and Refund Policy",
    content:
      "Payments for healing sessions, courses, and consultations must be made in advance. Refunds are subject to our cancellation policy, and no refunds will be provided after the completion of a session.",
  },
  {
    title: "5. Code of Conduct",
    content:
      "Users are expected to interact respectfully with practitioners and other members. Any form of harassment, misconduct, or disruption may result in account suspension.",
  },
  {
    title: "6. Intellectual Property",
    content:
      "All content, materials, and teachings on this platform are copyrighted and the intellectual property of their respective authors. Unauthorized reproduction, sharing, or distribution is strictly prohibited.",
  },
  {
    title: "7. Changes to Terms",
    content:
      "We reserve the right to update or modify these Terms & Conditions at any time. Continued use of our platform implies acceptance of the revised terms.",
  },
];
