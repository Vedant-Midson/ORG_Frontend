import { useEffect, useState } from "react";
import { ClientsService } from "@/services/clients.service";

export function useClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await ClientsService.getAll();

        // ensure array
        const list = Array.isArray(data) ? data : data?.data ?? [];
        setClients(list);
      } catch (err) {
        console.error("Failed to load clients", err);
        setClients([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { clients, loading };
}
