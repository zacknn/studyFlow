"use client";
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import React from "react";

function chatbot() {
  return (
    <div className="flex h-screen">
      <aside className="w-56 border-r flex flex-col p-3 gap-2">
        <Button variant="outline" className="justify-start gap-2 ">
          + New chat
        </Button>
        <p className="text-xs text-muted-foreground px-2 mt-2">Recent</p>
      </aside>
    </div>
  );
}

export default chatbot;
