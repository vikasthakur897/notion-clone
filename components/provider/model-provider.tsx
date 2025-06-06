"use client";

import { useState, useEffect } from "react";
import { SettingsModel } from "../models/setting-model";

export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <>
      <SettingsModel />
    </>
  );
};
