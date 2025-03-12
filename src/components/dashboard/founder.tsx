import Image from "next/image";
import founder from "@/assets/doctortwo.png"

export const Founder = () => {
  return (
    <section className="bg-[#4ead91] py-12 px-6 mb-8 text-white text-center flex flex-col items-center">
      <h3 className="text-sm font-semibold uppercase">Founder</h3>
      <h2 className="text-2xl md:text-3xl font-bold mt-2">Grand Master Choa Kok Sui</h2>
      <div className="mt-6 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-100 border-4 border-white">
        <Image
          src={founder}
          alt="Grand Master Choa Kok Sui"
          width={160}
          height={160}
          className="object-cover w-full h-full"
        />
      </div>
      <p className="mt-6 max-w-2xl text-xs md:text-base leading-relaxed">
        Grandmaster Choa Kok Sui is the world's foremost authority on Pranic Healing and Arhatic Yoga. His groundbreaking contribution to the healing arts has led to the widespread use of Pranic Healing to improve the quality of life for millions of people all over the world.
      </p>
      <p className="mt-4 max-w-2xl text-xs md:text-base leading-relaxed">
        He has spent decades studying exotic and esoteric principles and methods of healing and meditations and continuously experimenting, researching and validating their efficacy.
      </p>
    </section>
  );
};