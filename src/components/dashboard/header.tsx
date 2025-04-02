import Image from "next/image"
import logo from "@/assets/praniclogo.png"

export function Header() {
  return (
    <header className="p-4 text-center">
      <div className="flex justify-center mb-2">
        <Image src={logo} alt="Pranic Healing Logo" width={80} height={80} className="h-16 w-auto" />
      </div>
      <h1 className="text-3xl font-bold">Atma Namaste!</h1>
    </header>
  )
}

