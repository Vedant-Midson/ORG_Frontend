// src/hooks/useCreateMembership.js
"use client";

import { useState } from "react";
import { createMembershipService } from "@/services/membershipService";

export function useCreateMembership() {
  const [loading, setLoading] = useState(false);

  async function createMembership(payload) {
    setLoading(true);
    try {
      const data = await createMembershipService(payload);
      return data;
      console.log("Membership created:", data);
    } finally {
      setLoading(false);
    }
  }

  return {
    createMembership,
    loading,
  };
}
