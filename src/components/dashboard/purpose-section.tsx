"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Leaf, Heart } from "lucide-react";

export function PurposeSection() {
  return (
    <div className="px-4 mb-14">
     <div className="flex items-center justify-between mb-6">
  <div>
    <h2 className="text-xl font-semibold text-black">Purpose of</h2>
    <h1 className="text-xl font-bold text-emerald-600">Pranic Healing</h1>
  </div>
  <button className="text-sm pt-4 text-black font-medium">View All</button>
</div>


      <Swiper
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
        }}
        className="w-full"
      >
        <SwiperSlide>
          <div className="flex items-center p-4 border rounded-xl shadow-sm">
            <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-lg mr-4">
              <Leaf className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Spirituality</h3>
              <p className="text-sm text-gray-600">Achieving oneness with higher soul</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center p-4 border rounded-xl shadow-sm">
            <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-lg mr-4">
              <Heart className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Healing</h3>
              <p className="text-sm text-gray-600">Basic Pranic Healing, Advanced Pranic Healing...</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
