"use client";

import { useState } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function DropdownBugRepro() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <div className="p-8">
      <h1 className="mb-4 text-lg font-bold">
        Radix DropdownMenu Bug Reproduction
      </h1>
      <p className="mb-4 text-sm text-gray-600">Steps to reproduce:</p>
      <ol className="mb-4 text-sm text-gray-600 list-decimal list-inside">
        <li>Click the menu button to open the main dropdown</li>
        <li>Try using arrow keys to navigate the main menu items</li>
        <li>
          Select &quot;Dropdown Menu&quot; and press enter to open the nested
          dropdown
        </li>
        <li>Press escape to close the nested dropdown</li>
        <li>
          Try using arrow keys again in the main menu - they won&apos;t work.
          Pressing up arrow won&apos;t do anything, pressing down arrow will
          open the nested dropdown.
        </li>
        <li>
          Using <code>DropdownMenuSub</code> instead would work, but it lacks
          the ability to choose which side it opens on?
        </li>
      </ol>

      {/* Main Menu - Using Radix Primitive */}
      <DropdownMenuPrimitive.Root
        open={isMenuOpen}
        onOpenChange={setIsMenuOpen}
      >
        <DropdownMenuPrimitive.Trigger asChild>
          <button
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            className={cn(
              "min-w-[220px] bg-background rounded-md shadow-lg p-1",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[side=bottom]:slide-in-from-top-2",
              "origin-top"
            )}
            sideOffset={8}
            align="start"
            side="bottom"
          >
            <nav className="flex flex-col p-4 space-y-3">
              <DropdownMenuPrimitive.Item
                className={cn(
                  "w-full px-4 py-2 hover:bg-accent rounded-md transition-colors outline-none",
                  "cursor-pointer",
                  "data-[highlighted]:bg-accent"
                )}
                onSelect={(event) => {
                  event.preventDefault();
                  console.log("Home clicked");
                }}
              >
                Home
              </DropdownMenuPrimitive.Item>

              <DropdownMenuPrimitive.Item
                className={cn(
                  "w-full px-4 py-2 hover:bg-accent rounded-md transition-colors outline-none",
                  "cursor-pointer",
                  "data-[highlighted]:bg-accent"
                )}
                onSelect={(event) => {
                  event.preventDefault();
                  console.log("Settings clicked");
                }}
              >
                Settings
              </DropdownMenuPrimitive.Item>

              {/* Nested User Menu - Using shadcn Dropdown */}
              <DropdownMenuPrimitive.Item
                className={cn(
                  "w-full outline-none",
                  "data-[highlighted]:bg-accent data-[highlighted]:rounded-md"
                )}
                onSelect={(event) => {
                  event.preventDefault();
                  setIsUserMenuOpen(true);
                }}
              >
                <DropdownMenu
                  open={isUserMenuOpen}
                  onOpenChange={setIsUserMenuOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "w-full px-4 py-2 hover:bg-accent rounded-md transition-colors outline-none",
                        "cursor-pointer text-left",
                        "flex items-center justify-between",
                        "text-blue-500"
                      )}
                    >
                      Dropdown Menu
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="flex items-center">
                      Item 1
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center">
                      Item 2
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center">
                      Item 3
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuPrimitive.Item>

              <DropdownMenuPrimitive.Item
                className={cn(
                  "w-full px-4 py-2 hover:bg-accent rounded-md transition-colors outline-none",
                  "cursor-pointer",
                  "data-[highlighted]:bg-accent"
                )}
                onSelect={(event) => {
                  event.preventDefault();
                  console.log("Other clicked");
                }}
              >
                Other
              </DropdownMenuPrimitive.Item>
            </nav>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  );
}
