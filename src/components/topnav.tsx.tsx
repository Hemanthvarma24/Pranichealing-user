"use client";

import { Menu, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NavHeader() {
  return (
    <header className="w-full h-18 bg-[#4ead91] rounded-lg px-6 py-4  fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between max-w-7xl pt-2 mx-auto">
        <Button variant="ghost" size="icon" className="text-white hover:bg-[#45987c]">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>

        <h1 className="text-white text-lg font-medium flex-1 text-center">
          Pranic Healing
        </h1>

        <Button variant="ghost" size="icon" className="text-white hover:bg-[#45987c]">
          <Stethoscope className="h-6 w-6" />
          <span className="sr-only">Doctor Chat/Shop</span>
        </Button>
      </div>
    </header>
  );
}
