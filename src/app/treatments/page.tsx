import { BottomNav } from "@/components/fotter";
import { NavHeader } from "@/components/topnav.tsx";
import { TreatmentsScreen } from "@/components/treatments";

export default function Home() {
  return (
    <>
     <NavHeader /> 
      <TreatmentsScreen />
      <BottomNav />
    </>
  );
}
