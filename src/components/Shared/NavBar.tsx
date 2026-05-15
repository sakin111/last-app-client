import { Menu, User, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import LogoutButton from "./LogoutButton";
import { getCookie } from "@/services/Auth/tokenHandler";
import { ModeToggle } from "../modeToggle";
import { Dropdown } from "./Dropdown";

const Navbar = async () => {
  const navItems = [
    { href: "/travel", label: "Find Partners" },
    { href: "/destinations", label: "Destinations" },
    { href: "/safety", label: "Safety" },
  ];

  const accessToken = await getCookie("accessToken");

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-black text-[#1B2E4B] dark:text-white tracking-tighter">
            Travel Buddy
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-500 hover:text-[#1B2E4B] dark:hover:text-white text-sm font-bold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <ModeToggle />
          {accessToken ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="font-bold text-gray-500">Dashboard</Button>
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="font-bold text-gray-500 hover:text-[#1B2E4B]">Sign in</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 font-bold shadow-lg shadow-orange-500/20 transition-all">
                  Join for Free
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6">
              <SheetTitle className="text-left font-black text-xl mb-8">Menu</SheetTitle>
              <nav className="flex flex-col space-y-6">
                {navItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex flex-col space-y-4">
                  {accessToken ? (
                    <>
                      <Link href="/dashboard" className="text-xl font-bold">Dashboard</Link>
                      <LogoutButton />
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="text-xl font-bold">Sign in</Link>
                      <Link href="/register">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-6 text-lg font-bold">
                          Join for Free
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;