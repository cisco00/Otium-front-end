import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface PreAuthHeaderProps {
  onNavigate: (view: string) => void;
}

export function PreAuthHeader({ onNavigate }: PreAuthHeaderProps) {
  const [selectedCurrency, setSelectedCurrency] = useState("NGN");
  const [selectedCountry, setSelectedCountry] = useState("NG");

  const currencies = [
    { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "EUR", symbol: "€", name: "Euro" },
  ];

  const countries = [
    { code: "NG", name: "Nigeria", flag: "🇳🇬" },
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "FR", name: "France", flag: "🇫🇷" },
  ];

  return (
    <header className="w-full bg-[#0F5257] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Left Side - Currency and Country Selectors */}
          <div className="flex items-center gap-3">
            {/* Currency Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 font-semibold px-3 h-9"
                >
                  {selectedCurrency}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {currencies.map((currency) => (
                  <DropdownMenuItem
                    key={currency.code}
                    onClick={() => setSelectedCurrency(currency.code)}
                  >
                    <span className="font-semibold">{currency.code}</span>
                    <span className="ml-2 text-muted-foreground">
                      {currency.symbol} {currency.name}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Country/Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 h-9 w-9 p-0"
                >
                  <span className="text-xl">
                    {countries.find((c) => c.code === selectedCountry)?.flag}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {countries.map((country) => (
                  <DropdownMenuItem
                    key={country.code}
                    onClick={() => setSelectedCountry(country.code)}
                  >
                    <span className="mr-2">{country.flag}</span>
                    <span>{country.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Help Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 h-9 w-9"
              onClick={() => {
                // Could open a help dialog or navigate to help page
                alert("Help center coming soon!");
              }}
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center gap-3">
            {/* Register Button */}
            <Button
              variant="secondary"
              className="bg-white text-teal-700 hover:bg-gray-100 font-semibold"
              onClick={() => onNavigate("signup-selection")}
            >
              Register
            </Button>

            {/* Sign in Button */}
            <Button
              variant="secondary"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-semibold"
              onClick={() => onNavigate("auth")}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}