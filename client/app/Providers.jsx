"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { createContext } from "react";
import { Toaster } from "react-hot-toast";

export const UserContext = createContext();


const Providers = ({ children }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  const [user, setUser] = React.useState(null);

  // Load user info from localStorage when app starts
  React.useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Update user info and save it to localStorage
  const updateUser = (newUser) => {
    console.log('context', newUser)
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <>
      <UserContext.Provider value={{ user, updateUser }}>
        <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
          {children}
        </QueryClientProvider>
      </UserContext.Provider>
    </>
  );
};

export default Providers;
