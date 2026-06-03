"use client";
import { ThemeToggle } from "@/components/shared/header/ThemeToggler";
import { useLogoutMutation } from "@/queries/auth.query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { tokenService } from "@/lib/axios/axios";
// import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { logout as logoutAction } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "../../../redux/hooks";

const Header = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { mutateAsync: logout, isSuccess: isLogoutSuccess } =
    useLogoutMutation();
  const isAuthenticated = !!user;
  console.log("user", user);

  useEffect(() => {
    if (isLogoutSuccess) {
      tokenService.clearAccessToken();
      dispatch(logoutAction()); // Call the logout function to perform any necessary cleanup
      // Redirect to login page or perform any other action after successful logout
      router.push("/login");
    }
  }, [isLogoutSuccess, router, dispatch, logout]);
  return (
    <header className="">
      <div className="flex justify-between p-4 container mx-auto">
        <TypographyH1
          className="text-xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
          label="Ecom Next App"
        />

        <div>
          <div className="flex items-center align-middle gap-4">
            <ThemeToggle />
            {!isAuthenticated && (
              <>
                <Button variant="outline" onClick={() => router.push("/login")}>
                  Login
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.push("/register")}
                >
                  Register
                </Button>
              </>
            )}

            {isAuthenticated && (
              <div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {/* <Button variant="outline">Open</Button> */}
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={user?.avatar?.url}
                          alt="user avatar"
                          className="grayscale"
                        />
                        <AvatarFallback>
                          {String(
                            user?.firstName?.charAt(0) +
                              user?.lastName?.charAt(0),
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => router.push("/dashboard/profile")}
                        >
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => logout()}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
