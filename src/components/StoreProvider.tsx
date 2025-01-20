"use client";

import { authSuccess } from "@/lib/store/features/user/userSlice";
import { AppStore, makeStore } from "@/lib/store/store";
import React, { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<AppStore | null>(null);

  useEffect(() => {
    // Create the store instance when the component mounts
    const initializedStore = makeStore();

    // Retrieve the user from localStorage and dispatch the authSuccess action
    const user = JSON.parse(
      localStorage.getItem("user") || '{"id":"","name":"","email":""}'
    );
    initializedStore.dispatch(authSuccess(user));

    setStore(initializedStore);
  }, []);

  if (!store) {
    // Optionally, you can show a loading state or fallback while the store initializes
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
