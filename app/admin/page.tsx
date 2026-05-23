"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  guests: number;
  check_in: string;
  check_out: string;
  room_type: string;
  message: string;
  created_at: string;
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authenticated) {
      fetchBookings();
    }
  }, [authenticated]);

  async function fetchBookings() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
      } else {
        setError(data.message);
      }
    } catch {
      setError("Failed to fetch bookings");
    }
    setLoading(false);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === "admin@123") {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this booking?")) return;
    const res = await fetch("/api/admin/bookings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.success) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06080D] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0C101A] border border-white/10 p-8 rounded-lg w-full max-w-sm"
        >
          <h1 className="text-2xl font-['Playfair_Display'] text-white mb-2">Admin Login</h1>
          <p className="text-white text-sm mb-6">Enter password to access bookings</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:border-[#C9A962] focus:outline-none transition-colors"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full gold-gradient text-white px-8 py-3 text-sm font-semibold tracking-wider"
            >
              LOGIN
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06080D] pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-['Playfair_Display'] text-white">Booking Admin Panel</h1>
            <p className="text-white/70 text-sm mt-1">{bookings.length} total booking{bookings.length !== 1 ? "s" : ""}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={fetchBookings}
            className="border border-[#C9A962] text-[#C9A962] px-6 py-2 text-sm tracking-wider hover:bg-[#C9A962] hover:text-black transition-all duration-300"
          >
            REFRESH
          </motion.button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-[#C9A962] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/70">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/70 text-lg">No bookings yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking, i) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#0C101A] border border-white/10 p-6 rounded-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{booking.name}</h3>
                    <p className="text-white/60 text-xs">{new Date(booking.created_at).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-[#C9A962]/20 text-[#C9A962] text-xs px-3 py-1 rounded-full">
                      ID: #{booking.id}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(booking.id)}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-white/60 block">Phone</span>
                    <span className="text-white">{booking.phone}</span>
                  </div>
                  {booking.email && (
                    <div>
                      <span className="text-white/60 block">Email</span>
                      <span className="text-white">{booking.email}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-white/60 block">Guests</span>
                    <span className="text-white">{booking.guests}</span>
                  </div>
                  <div>
                    <span className="text-white/60 block">Room Type</span>
                    <span className="text-white">{booking.room_type || "—"}</span>
                  </div>
                  <div>
                    <span className="text-white/60 block">Check-in</span>
                    <span className="text-white">{booking.check_in || "—"}</span>
                  </div>
                  <div>
                    <span className="text-white/60 block">Check-out</span>
                    <span className="text-white">{booking.check_out || "—"}</span>
                  </div>
                </div>

                {booking.message && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-white/60 text-xs block mb-1">Message</span>
                    <p className="text-white/80 text-sm">{booking.message}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
