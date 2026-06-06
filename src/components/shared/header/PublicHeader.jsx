"use client";

import Link from "next/link";
import { Search, ShoppingCart, Heart, Menu, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { ThemeToggle } from "@/components/shared/header/ThemeToggler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function PublicHeader() {
  const isAuthenticated = false;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center gap-6 px-4">
        {/* Logo */}
        <Link href="/" className="shrink-0 text-2xl font-bold tracking-tight">
          ECOM
        </Link>

        {/* Categories */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/products" className="px-4 py-2 text-sm font-medium">
                Products
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="/categories"
                className="px-4 py-2 text-sm font-medium"
              >
                Categories
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/deals" className="px-4 py-2 text-sm font-medium">
                Deals
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search */}
        <div className="hidden flex-1 md:flex">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search for products, brands and more..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

          {!isAuthenticated && (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>

              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="border-t p-3 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input placeholder="Search products..." className="pl-10" />
        </div>
      </div>
    </header>
  );
}
