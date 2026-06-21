"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import React from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(true); // Default to true so it starts open

  return (
    <div className="flex h-screen w-full">
      {/* 1. Dynamic Width: Changes between w-56 and w-16 based on isOpen */}
      <aside 
        className={`border-r flex flex-col p-3 gap-2 transition-all duration-300 ${
          isOpen ? "w-56" : "w-16 items-center"
        }`}
      >
        {/* Toggle Button */}
        <Button 
          onClick={() => setIsOpen(!isOpen)} 
          variant="outline" 
          className="justify-start gap-2 w-full"
        >
          {/* 2. Dynamic Rotation: Flips the arrow 180 degrees when closed */}
          <ArrowBigLeft className={`w-4 h-4 transition-transform duration-300 ${!isOpen ? "rotate-180" : ""}`} />
          {isOpen && <span>Collapse</span>}
        </Button>

        {/* New Chat Button - Text hides when sidebar is closed */}
        <Button variant="outline" className="justify-start gap-2 w-full">
          <span>+</span>
          {isOpen && <span>New chat</span>}
        </Button>

        {isOpen && <p className="text-xs text-muted-foreground px-2 mt-2">Recent</p>}
      </aside>

      
    </div>
  );
}

export default Chatbot;