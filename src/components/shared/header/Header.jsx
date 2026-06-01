"use client";
import { ThemeToggle } from "@/components/shared/header/ThemeToggler";
import { useLogoutMutation } from "@/queries/auth.query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { tokenService } from "@/lib/axios/axios";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { logout as logoutAction } from "@/redux/features/auth/authSlice";

const Header = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { mutateAsync: logout, isSuccess: isLogoutSuccess } =
    useLogoutMutation();

  console.log("Logout Success:", isLogoutSuccess);

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
        <div className="text-xl font-bold">Ecom Next App</div>
        <div>
          <ThemeToggle />
          {isAuthenticated && (
            <div className="ml-4 inline-block">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={() => logout() /* Placeholder for logout function */}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
