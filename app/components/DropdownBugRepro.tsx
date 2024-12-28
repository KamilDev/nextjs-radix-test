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
import { Menu, X, User, Settings, LogOut } from "lucide-react";

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
        <li>Click &quot;User Menu&quot; to open the nested dropdown</li>
        <li>Close the nested dropdown</li>
        <li>
          Try using arrow keys again in the main menu - they won&apos;t work
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
                        "flex items-center justify-between"
                      )}
                    >
                      <span className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        User Menu
                      </span>
                      <span className="ml-2">→</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
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