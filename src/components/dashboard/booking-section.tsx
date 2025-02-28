import Link from "next/link";

export function CTASection() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-[#4ead91] text-white rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-lg font-bold">Like to Heal Yourself? Having a Health Issue?</h2>
        <p className="text-sm mt-2">
          Book an appointment, we will guide you, connect you with a perfect healer.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Link href="//appointment">
            <button className="bg-white text-[#4ead91] font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-[#4ead91] hover:text-white transition">
              Book Appointment
            </button>
          </Link>
          <button className="bg-white text-[#4ead91] font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-[#4ead91] hover:text-white transition">
            Make an Enquiry
          </button>
        </div>
      </div>
    </div>
  );
}
