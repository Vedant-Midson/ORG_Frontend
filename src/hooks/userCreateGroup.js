import { useState } from "react";
import { GroupsService } from "../services/groups.service";

export function userCreateGroup() {
  const [loading, setLoading] = useState(false);

  async function createGroup(form) {
    console.log("Creating group with form data:", form);
    setLoading(true);

    try {
      await GroupsService.create({
        ...form,
        group_value: Number(form.group_value),
        
        duration_months: Number(form.duration_months),
        monthly_amount: Number(form.monthly_amount),
        pnp: Number(form.pnp),
        treasury: Number(form.treasury),
      });
    } finally {
      setLoading(false);
    }
  }

  return { createGroup, loading };
}
