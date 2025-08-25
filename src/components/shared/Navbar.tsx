"use client";

import { ModeToggle } from "../sidebar/mode-toggle";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-black text-white w-full sticky top-0 z-10 p-2">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="block">
            <SidebarTrigger>
              <Button variant="ghost" size="icon" className="">
                <Menu className="w-5 h-5" />
              </Button>
            </SidebarTrigger>
          </div>
          <div className="flex items-center justify-end">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
