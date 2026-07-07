"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

const DashboardShell = ({ children }) => (
  <div className="flex min-h-screen bg-background">
    <div className="md:hidden fixed top-0 w-full h-16 bg-card border-b border-border flex items-center px-4 z-40">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <span className="ml-4 text-muted-foreground font-bold">Admin / Dashboard</span>
    </div>

    <aside className="hidden md:block fixed inset-y-0 left-0 w-64 z-50">
      <Sidebar />
    </aside>

    <div className="flex-1 md:pl-64 pt-16 md:pt-0 w-full">
      <main className="p-4 md:p-6 w-full max-w-full overflow-hidden">
        {children}
      </main>
    </div>
  </div>
);

export default DashboardShell;
