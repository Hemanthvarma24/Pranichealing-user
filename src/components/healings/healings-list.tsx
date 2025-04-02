"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HealingCard } from "@/components/healings/healing-card";
import { HealingDetails } from "@/components/healings/healing-details";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Updated import for App Router

const healings = [
  {
    healingId: "PH045",
    date: "2023-07-12",
    time: "5:00 PM",
    healer: "Dr. Sarah Wilson",
    sessions: 3,
    name: "John Doe",
  },
  {
    healingId: "PH065",
    date: "2023-07-19",
    time: "4:00 PM",
    healer: "Dr. Michael",
    sessions: 5,
    name: "Jane Doe",
  },
];

// Header Component (Moved outside HealingsList for cleaner code)
const Header = () => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 p-4 border-b">
      <ChevronLeft
        className="h-6 w-6 text-[#4ead91] cursor-pointer"
        onClick={() => router.back()} // Navigates to the previous page
      />
      <h1 className="text-xl font-semibold">Healings</h1>
    </div>
  );
};

export default function HealingsList() {
  const [selectedHealing, setSelectedHealing] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = (healingId: string) => {
    setSelectedHealing(healingId);
    setShowDetails(true);
  };

  const handleBack = () => {
    setSelectedHealing(null);
    setShowDetails(false);
  };

  // Show HealingDetails if a healing is selected
  if (showDetails && selectedHealing) {
    const healing = healings.find((h) => h.healingId === selectedHealing);
    if (healing) {
      return <HealingDetails healing={healing} onBack={handleBack} />;
    }
  }

  return (
    <div className="w-full">
      <Header /> {/* Reusable Header Component */}

      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList className="w-full justify-start h-12 p-0 border-b rounded-none">
          <TabsTrigger
            value="ongoing"
            className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4ead91] data-[state=active]:text-foreground"
          >
            Ongoing
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4ead91] data-[state=active]:text-foreground"
          >
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ongoing" className="mt-0">
          <div className="space-y-4 p-4">
            {healings.map((healing) => (
              <HealingCard
                key={healing.healingId}
                healing={healing}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          <div className="p-4 pt-2 sticky bottom-0 bg-white">
            <Link href="/appointment">
              <Button className="w-full bg-[#4ead91] hover:bg-[#3d9c80] text-white py-6">
                Book Appointment
              </Button>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <div className="p-4 text-center text-gray-500">
            No completed healings found.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
