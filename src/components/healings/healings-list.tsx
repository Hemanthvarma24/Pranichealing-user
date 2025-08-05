"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HealingCard } from "./healing-card";
import  HealingDetails  from "./healing-details";

const healings = [
  {
    healingId: "PH045",
    createdOn: {
      day: 12,
      month: "July",
      year: "2025",
    },
    startedOn: {
      day: 18,
      month: "July",
      year: "2025",
    },
    endedOn: {
      day: 24,
      month: "July",
      year: "2025",
    },
    sessions: 5,
    amount: 2500,
    healingFor: "Head Ache, Knee Pain, Cardiac Care...",
    status: "Completed" as const,
    coordinator: "Mr.Sathish Kumar",
    completedSessions: 5,
    pendingSessions: 0,
    amountPaid: 2500,
    toPay: 0,
  },
  {
    healingId: "PH046",
    createdOn: {
      day: 15,
      month: "July",
      year: "2025",
    },
    startedOn: {
      day: 20,
      month: "July",
      year: "2025",
    },
    endedOn: null,
    sessions: 5,
    amount: 2500,
    healingFor: "Head Ache, Knee Pain, Cardiac Care...",
    status: "Ongoing" as const,
    coordinator: "Mr.Sathish Kumar",
    completedSessions: 2,
    pendingSessions: 3,
    amountPaid: 1000,
    toPay: 1500,
  },
  {
    healingId: "PH047",
    createdOn: {
      day: 18,
      month: "July",
      year: "2025",
    },
    startedOn: null,
    endedOn: null,
    sessions: 5,
    amount: 2500,
    healingFor: "Head Ache, Knee Pain, Cardiac Care...",
    status: "Requested" as const,
    coordinator: "Mr.Sathish Kumar",
    completedSessions: 0,
    pendingSessions: 5,
    amountPaid: 0,
    toPay: 2500,
  },
];

// Header Component
const Header = () => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b shadow-sm bg-white">
      <ChevronLeft
        className="h-6 w-6 text-[#4ead91] cursor-pointer"
        onClick={() => router.back()}
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
      return <HealingDetails  />;
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Header />

      <Tabs defaultValue="ongoing" className="flex flex-col flex-1">
        <div className="sticky top-0 z-10 bg-white border-b">
          <TabsList className="grid grid-cols-3 h-12 p-0 rounded-none bg-white">
            <TabsTrigger
              value="request"
              className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4ead91] data-[state=active]:text-foreground data-[state=active]:font-medium"
            >
              Request
            </TabsTrigger>
            <TabsTrigger
              value="ongoing"
              className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4ead91] data-[state=active]:text-foreground data-[state=active]:font-medium"
            >
              Ongoing
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-[#4ead91] data-[state=active]:text-foreground data-[state=active]:font-medium"
            >
              Completed
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="request" className="mt-0 flex flex-col h-full">
            <div className="space-y-4 p-4 flex-1">
              {healings
                .filter((healing) => healing.status === "Requested")
                .map((healing) => (
                  <HealingCard
                    key={healing.healingId}
                    healing={healing}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              {healings.filter((healing) => healing.status === "Requested")
                .length === 0 && (
                <div className="flex justify-center items-center h-40 text-gray-500">
                  No requested healings found
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="ongoing" className="mt-0 flex flex-col h-full">
            <div className="space-y-4 p-4 flex-1">
              {healings
                .filter((healing) => healing.status === "Ongoing")
                .map((healing) => (
                  <HealingCard
                    key={healing.healingId}
                    healing={healing}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              {healings.filter((healing) => healing.status === "Ongoing")
                .length === 0 && (
                <div className="flex justify-center items-center h-40 text-gray-500">
                  No ongoing healings found
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-0 flex flex-col h-full">
            <div className="space-y-4 p-4 flex-1">
              {healings
                .filter((healing) => healing.status === "Completed")
                .map((healing) => (
                  <HealingCard
                    key={healing.healingId}
                    healing={healing}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              {healings.filter((healing) => healing.status === "Completed")
                .length === 0 && (
                <div className="flex justify-center items-center h-40 text-gray-500">
                  No completed healings found
                </div>
              )}
            </div>
          </TabsContent>
        </div>

        
      </Tabs>
    </div>
  );
}
