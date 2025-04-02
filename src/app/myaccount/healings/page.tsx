"use client"

import  HealingsList  from "@/components/healings/healings-list";
import { BottomNav } from "@/components/fotter";
import { NavHeader } from "@/components/topnav.tsx";

export default function HealingsPage() {
  return (
    <>
      <NavHeader />

      <div className="mt-[80px] pb-[80px]">
        <HealingsList />
      </div>

      <BottomNav />
    </>
  );
}
