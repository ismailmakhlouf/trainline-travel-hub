/**
 * LANDING PAGE — Trainline-style home page with route search
 */

import { useState } from "react";
import { Search, Calendar, Users, Clock, MapPin, ArrowLeftRight } from "lucide-react";

interface LandingPageProps {
  onSearch: (searchParams: {
    from: string;
    to: string;
    departDate: string;
    departTime: string;
    returnDate?: string;
    adults: number;
    children: number;
    tripType: "one-way" | "return" | "open-return" | "multi-city";
  }) => void;
  onSignIn: () => void;
}

const STATIONS = [
  "London St Pancras International",
  "London Heathrow",
  "London King's Cross",
  "London Euston",
  "London Paddington",
  "Paris Gare du Nord",
  "Paris Gare de Lyon",
  "Berlin Hauptbahnhof",
  "Zürich HB",
  "Dubai International",
  "Mumbai Chhatrapati Shivaji International",
  "Amsterdam Centraal",
  "Brussels Midi",
  "Manchester Piccadilly",
  "Edinburgh Waverley",
  "Birmingham New Street",
  "Glasgow Central"
];

export function LandingPage({ onSearch, onSignIn }: LandingPageProps) {
  const [from, setFrom] = useState("London St Pancras International");
  const [to, setTo] = useState("Paris Gare du Nord");
  const [tripType, setTripType] = useState<"one-way" | "return" | "open-return" | "multi-city">("return");
  const [departDate, setDepartDate] = useState("2026-03-15");
  const [departTime, setDepartTime] = useState("10:00");
  const [returnDate, setReturnDate] = useState("2026-03-22");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const handleSearch = () => {
    onSearch({
      from,
      to,
      departDate,
      departTime,
      returnDate: tripType === "return" ? returnDate : undefined,
      adults,
      children,
      tripType
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const swapStations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Trainline Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                {/* Trainline Heart-Checkmark Logo */}
                <svg width="36" height="36" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 15C85 15 72 25 65 40C58 25 45 15 30 15C10 15 0 30 0 50C0 85 40 120 65 145L100 180L135 145C160 120 200 85 200 50C200 30 190 15 170 15C155 15 142 25 135 40C128 25 115 15 100 15Z" fill="#0AC18E"/>
                  <path d="M75 90L60 105L85 130L140 75L125 60L85 100L75 90Z" fill="white" strokeWidth="8" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-[#0AC18E] leading-none" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 700 }}>trainline</span>
                  <span className="text-xs text-slate-400 leading-none mt-0.5">Travel Hub</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => alert('Railcards feature coming soon!')}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Railcards
                </button>
                <button
                  onClick={() => alert('Business travel feature coming soon!')}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Business
                </button>
                <button
                  onClick={() => alert('Basket is empty')}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Basket
                </button>
                <button
                  onClick={() => alert('My Bookings feature coming soon!')}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  My Bookings
                </button>
              </nav>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => alert('Registration feature coming soon!')}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Register
              </button>
              <button
                onClick={onSignIn}
                className="text-sm font-medium text-[#23C2A6] hover:text-[#1da889] transition-colors flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full border-2 border-[#23C2A6] flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Book trains, flights & hotels
            </h1>
            <p className="text-lg text-slate-300">
              Search and compare. Find the best deals on your journey.
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-6">
            {/* From/To Section */}
            <div className="grid md:grid-cols-[1fr,auto,1fr] gap-3 mb-4">
              {/* From */}
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-300 mb-2">From</label>
                <div className="relative">
                  <button
                    onClick={() => setShowFromDropdown(!showFromDropdown)}
                    className="w-full px-4 py-3 text-left rounded-lg border border-slate-600 hover:border-[#23C2A6] focus:border-[#23C2A6] focus:ring-2 focus:ring-[#23C2A6]/20 transition-all bg-slate-700"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-white truncate">{from}</span>
                    </div>
                  </button>
                  {showFromDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-slate-700 border border-slate-600 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
                      {STATIONS.map((station) => (
                        <button
                          key={station}
                          onClick={() => {
                            setFrom(station);
                            setShowFromDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-white hover:bg-slate-600 transition-colors"
                        >
                          {station}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex items-end pb-3">
                <button
                  onClick={swapStations}
                  className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <ArrowLeftRight className="w-5 h-5 text-slate-300" />
                </button>
              </div>

              {/* To */}
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-300 mb-2">To</label>
                <div className="relative">
                  <button
                    onClick={() => setShowToDropdown(!showToDropdown)}
                    className="w-full px-4 py-3 text-left rounded-lg border border-slate-600 hover:border-[#23C2A6] focus:border-[#23C2A6] focus:ring-2 focus:ring-[#23C2A6]/20 transition-all bg-slate-700"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-white truncate">{to}</span>
                    </div>
                  </button>
                  {showToDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-slate-700 border border-slate-600 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
                      {STATIONS.filter(s => s !== from).map((station) => (
                        <button
                          key={station}
                          onClick={() => {
                            setTo(station);
                            setShowToDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-white hover:bg-slate-600 transition-colors"
                        >
                          {station}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Trip Type */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setTripType("one-way")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tripType === "one-way"
                    ? "bg-[#23C2A6] text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                One-way
              </button>
              <button
                onClick={() => setTripType("return")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tripType === "return"
                    ? "bg-[#23C2A6] text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                Return
              </button>
              <button
                onClick={() => setTripType("open-return")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tripType === "open-return"
                    ? "bg-[#23C2A6] text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                Open Return
              </button>
              <button
                onClick={() => setTripType("multi-city")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tripType === "multi-city"
                    ? "bg-[#23C2A6] text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                Multi-city
              </button>
            </div>

            {/* Date/Time and Passengers */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {/* Outbound Date/Time */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Out</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      value={departDate}
                      onChange={(e) => setDepartDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-600 focus:border-[#23C2A6] focus:ring-2 focus:ring-[#23C2A6]/20 transition-all text-sm bg-slate-700 text-white"
                    />
                  </div>
                  <div className="w-28 relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="time"
                      value={departTime}
                      onChange={(e) => setDepartTime(e.target.value)}
                      className="w-full pl-10 pr-2 py-3 rounded-lg border border-slate-600 focus:border-[#23C2A6] focus:ring-2 focus:ring-[#23C2A6]/20 transition-all text-sm bg-slate-700 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Return Date (if return trip) */}
              {tripType === "return" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Return</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-600 focus:border-[#23C2A6] focus:ring-2 focus:ring-[#23C2A6]/20 transition-all text-sm bg-slate-700 text-white"
                    />
                  </div>
                </div>
              )}

              {/* Passengers */}
              {tripType !== "return" && tripType !== "multi-city" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Passengers</label>
                  <div className="space-y-2">
                    {/* Adults */}
                    <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-slate-600 bg-slate-700">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium text-white">Adults</span>
                        <span className="text-xs text-slate-400">(16+)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-8 h-8 rounded-lg bg-slate-600 hover:bg-slate-500 text-white font-bold transition-colors"
                        >
                          −
                        </button>
                        <span className="text-sm font-bold text-white w-6 text-center">{adults}</span>
                        <button
                          onClick={() => setAdults(Math.min(9, adults + 1))}
                          className="w-8 h-8 rounded-lg bg-slate-600 hover:bg-slate-500 text-white font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* Children */}
                    <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-slate-600 bg-slate-700">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium text-white">Children</span>
                        <span className="text-xs text-slate-400">(0-15)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-8 h-8 rounded-lg bg-slate-600 hover:bg-slate-500 text-white font-bold transition-colors"
                        >
                          −
                        </button>
                        <span className="text-sm font-bold text-white w-6 text-center">{children}</span>
                        <button
                          onClick={() => setChildren(Math.min(9, children + 1))}
                          className="w-8 h-8 rounded-lg bg-slate-600 hover:bg-slate-500 text-white font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Passengers (for return trips) */}
            {tripType === "return" && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-300 mb-2">Passengers</label>
                <div className="space-y-2">
                  {/* Adults */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-slate-600 bg-slate-700">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-white">Adults</span>
                      <span className="text-xs text-slate-400">(16+)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 rounded-lg bg-slate-600 hover:bg-slate-500 text-white font-bold transition-colors"
                      >
                        −
                      </button>
                      <span className="text-sm font-bold text-white w-6 text-center">{adults}</span>
                      <button
                        onClick={() => setAdults(Math.min(9, adults + 1))}
                        className="w-8 h-8 rounded-lg bg-slate-600 hover:bg-slate-500 text-white font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {/* Children */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-slate-600 bg-slate-700">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-white">Children</span>
                      <span className="text-xs text-slate-400">(0-15)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 rounded-lg bg-slate-600 hover:bg-slate-500 text-white font-bold transition-colors"
                      >
                        −
                      </button>
                      <span className="text-sm font-bold text-white w-6 text-center">{children}</span>
                      <button
                        onClick={() => setChildren(Math.min(9, children + 1))}
                        className="w-8 h-8 rounded-lg bg-slate-600 hover:bg-slate-500 text-white font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Multi-city passengers and routes */}
            {tripType === "multi-city" && (
              <div className="mb-4 p-6 rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/50">
                <div className="text-center space-y-3">
                  <h3 className="text-lg font-bold text-white">Multi-City Booking</h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    Split passengers across multiple routes and destinations. Perfect for complex itineraries with different travel groups.
                  </p>
                  <button
                    onClick={() => alert('Multi-city builder coming soon! This will allow you to:\n\n• Add multiple route segments\n• Split passengers across routes\n• Mix rail and flights\n• Create complex itineraries')}
                    className="px-6 py-3 bg-[#23C2A6] hover:bg-[#1da889] text-white font-medium rounded-lg transition-colors"
                  >
                    Configure Multi-City Journey
                  </button>
                </div>
              </div>
            )}

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="w-full py-4 bg-[#23C2A6] hover:bg-[#1da889] text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Find cheap tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
