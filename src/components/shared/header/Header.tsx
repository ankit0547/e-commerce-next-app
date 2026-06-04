"use client";
import Link from "next/link";
import { Search, ShoppingCart, Heart, Menu, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogoutMutation } from "@/queries/auth.query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { tokenService } from "@/lib/axios/axios";
import { useAppDispatch } from "@/redux/hooks";
import { logoutAction } from "@/redux/features/auth/authSlice";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { ThemeToggle } from "@/components/shared/header/ThemeToggler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "../../../redux/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type Address = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type Avatar = {
  url: string;
};

type User = {
  address: Address;
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: Avatar;
  status: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";

function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center gap-6 px-4">
        {/* Logo */}
        <Skeleton className="h-8 w-16" />

        {/* Categories */}
        <div className="hidden gap-6 lg:flex">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
        </div>

        {/* Search */}
        <div className="hidden flex-1 md:flex">
          <Skeleton className="h-10 w-full max-w-2xl rounded-md" />
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-md" />

          <Skeleton className="h-9 w-9 rounded-md" />

          <Skeleton className="h-9 w-9 rounded-md" />

          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      {/* Mobile Search */}
      <div className="border-t p-3 md:hidden">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </header>
  );
}
export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const { mutateAsync: logout, isSuccess: isLogoutSuccess } =
    useLogoutMutation();

  useEffect(() => {
    if (isLogoutSuccess) {
      tokenService.clearAccessToken();
      dispatch(logoutAction()); // Call the logout function to perform any necessary cleanup
      // Redirect to login page or perform any other action after successful logout
      router.push("/login");
    }
  }, [isLogoutSuccess, router, dispatch, logout]);

  const { user } = useAppSelector((state) => state.auth);
  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    return <HeaderSkeleton />;
  }
  console.log("DDDD>>", isAuthenticated, pathname !== "/dashboard");
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center gap-6 px-4">
        {/* Logo */}
        <Link href="/" className="shrink-0 text-2xl font-bold tracking-tight">
          ECO
        </Link>

        {/* Categories */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                href="/dashboard/products"
                className="px-4 py-2 text-sm font-medium"
              >
                Products
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="/dashboard/categories"
                className="px-4 py-2 text-sm font-medium"
              >
                Categories
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="/dashboard/deals"
                className="px-4 py-2 text-sm font-medium"
              >
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

          {!isAuthenticated ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>

              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>

              {/* Avatar */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://www.gravatar.com/avatar/?d=identicon" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">Ankit Sharma</span>

                      <span className="text-xs text-muted-foreground">
                        ankit.ecom@gmail.com
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/orders">Orders</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => logout()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
