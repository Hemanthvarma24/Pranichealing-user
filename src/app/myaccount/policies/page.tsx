import PoliciesPage from "@/app/myaccount/policies/policies";
import { BottomNav } from "@/components/fotter";
import { NavHeader } from "@/components/topnav.tsx";

export default function Policies() {
  return (
    <>
    <NavHeader /> 
      <PoliciesPage />
      <BottomNav />
    </>
  );
}
