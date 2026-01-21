import { useState } from "react";
import { MembersService } from "@/services/member.service";

export function useCreateMember() {
  const [loading, setLoading] = useState(false);

  async function createMember(form) {
    setLoading(true);
    try {
      await MembersService.create(form);
    } finally {
      setLoading(false);
    }
  }

  return { createMember, loading };
}
