import AppointmentForm from "@/components/appointment-form";
import { BottomNav } from "@/components/fotter";
import { NavHeader } from "@/components/topnav.tsx";

export default function Page() {
  return (
    <>
     <NavHeader /> 
      <AppointmentForm />
      <BottomNav />
    </>
  );
}
