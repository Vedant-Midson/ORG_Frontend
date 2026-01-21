import { useState } from "react";
import { GroupsService } from "../services/groups.service";

export function userCreateGroup() {
  const [loading, setLoading] = useState(false);

  async function createGroup(form) {
    setLoading(true);

    try {
      await GroupsService.create({
        ...form,
        group_value: Number(form.group_value),
        total_members: Number(form.total_members),
        duration_months: Number(form.duration_months),
        monthly_amount: Number(form.monthly_amount),
        pnp: Number(form.pnp),
        trasury: Number(form.trasury),
      });
    } finally {
      setLoading(false);
    }
  }

  return { createGroup, loading };
}
