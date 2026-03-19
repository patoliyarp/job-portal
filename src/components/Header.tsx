import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Menu, X } from "lucide-react";

const navigation = [
  { name: "Jobs", href: "/jobs" },
  { name: "Dashboard", href: "/dashboard" },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLogin, userEmail, setUserEmail } = useAuth();
  const { theme, ToggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserEmail(null);
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
      <nav
        role="navigation"
        aria-label="Global"
        className="flex items-center justify-between px-6 py-4 lg:px-8 max-w-7xl mx-auto"
      >
        {/* logo */}
        <div className="flex lg:flex-1">
          <Link
            to="/"
            className="text-lg font-bold text-zinc-900 dark:text-white"
          >
            JobPortal
          </Link>
        </div>

        {/* mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-zinc-600 dark:text-zinc-300"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* desktop nav */}
        <div className="hidden md:flex items-center gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white "
            >
              {item.name}
            </Link>
          ))}

          {/* theme toggle */}
          <button
            onClick={ToggleTheme}
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 "
            aria-label="Toggle theme"
          >
            {theme.theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* auth */}
          {isLogin ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 hidden lg:block">
                {userEmail}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-400 "
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
            >
              Log in
            </Link>
          )}
        </div>
      </nav>

      {/* mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="md:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/20" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-xs overflow-y-auto bg-white dark:bg-zinc-900 p-6 border-l border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-bold text-zinc-900 dark:text-white">
              JobPortal
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-zinc-600 dark:text-zinc-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white"
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={ToggleTheme}
              className="flex items-center gap-2 text-base font-semibold text-zinc-700 dark:text-zinc-200"
            >
              {theme.theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
              {theme.theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <hr className="border-gray-200 dark:border-zinc-700" />
            {isLogin ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-base font-semibold text-red-500"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-emerald-600 dark:text-emerald-400"
              >
                Log in &rarr;
              </Link>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default Header;
