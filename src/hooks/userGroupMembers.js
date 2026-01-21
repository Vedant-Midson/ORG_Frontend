import { useState } from "react";
import { GroupsService } from "../services/groups.service";

export function useGroupMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchMembers(groupId) {
    setLoading(true);
    const data = await GroupsService.getMembers(groupId);
    console.log("Fetched members for group", groupId, data);
    setMembers(data);
    setLoading(false);
  }

  return { members, loading, fetchMembers };
}
