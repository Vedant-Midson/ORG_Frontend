import { useEffect, useState } from "react";
import { GroupsService } from "../services/groups.service";

export function userGroups() {
  const [groups, setGroups] = useState([]); // ✅ always array

  useEffect(() => {
    async function load() {
      try {
        const data = await GroupsService.getAll();

        // ✅ ensure array
        const list = Array.isArray(data) ? data : (data?.data ?? []);

        setGroups(
          list.map((g) => ({
            id: g.id,
            code: g.group_code,
            value: g.group_value,
            startDate: g.start_date,
            status: g.status || "Active",
            installment_done: g.installments_done || 0,
            pnp: g.pnp || 0,
            treasury: g.treasury || 0,
          })),
        );
      } catch (err) {
        console.error("Failed to load groups", err);
        setGroups([]);
      }
    }

    load();
  }, []);

  return groups;
}
