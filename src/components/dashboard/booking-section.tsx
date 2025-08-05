"use client"
import { useState } from "react";
import Link from "next/link";

export function CTASection() {
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // Validate inputs
    if (!name.trim() || !message.trim()) {
      alert("Please enter both your name and message.");
      return;
    }

    // Prepare the WhatsApp message
    const whatsappMessage = `Hello, my name is ${name}. ${message}`;
    
    // Remove any non-digit characters from the phone number
    const phoneNumber = "917382020254".replace(/\D/g, '');
    
    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    try {
      // Attempt to open WhatsApp directly
      window.location.href = whatsappUrl;
      
      // Reset form and close popup
      setName("");
      setMessage("");
      setShowPopup(false);
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      alert("Could not open WhatsApp. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center p-4 mb-4">
      <div className="bg-[#4ead91] text-white rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-lg font-bold">Like to Heal Yourself? Having a Health Issue?</h2>
        <p className="text-sm mt-2">
          Book an appointment, we will guide you, connect you with a perfect healer.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Link href="/login">
            <button className="bg-white text-[#4ead91] font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-[#4ead91] hover:text-white transition">
              Book Appointment
            </button>
          </Link>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-white text-[#4ead91] font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-[#4ead91] hover:text-white transition"
          >
            Make an Enquiry
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h3 className="text-lg font-semibold text-gray-800">Make an Enquiry</h3>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-3 p-2 border rounded-lg"
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mt-3 p-2 border rounded-lg h-32"
              rows={4}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#4ead91] text-white rounded-lg hover:bg-[#3c8b72]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}