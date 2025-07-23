"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { SunIcon, MoonIcon, SunMoon } from "lucide-react";
import { useEffect, useState } from "react";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(()=>{
    setIsMounted(true);
  },[])

  if(!isMounted){
    return null;
  }

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            {theme === "system" ? (
              <SunMoon />
            ) : theme === "light" ? (
              <SunIcon />
            ) : (
              <MoonIcon />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem onClick={() => setTheme("system")} checked={theme === "system"}>
            System
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem onClick={() => setTheme("dark")} checked={theme === "dark"}>
            Dark
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem onClick={() => setTheme("light")} checked={theme === "light"}>
            Light
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
};

export default ModeToggle;