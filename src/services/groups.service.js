import { apiFetch } from "./apiclient";

export const GroupsService = {
  getAll: () => apiFetch("/groups/"),

  create: (data) =>
    apiFetch("/groups/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getMembers: (groupId) =>
    apiFetch(`/memberships/group/${groupId}`),
};
