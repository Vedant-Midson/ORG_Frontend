import { apiFetch } from "./apiclient";

export const MembersService = {
  create: (payload) =>
    apiFetch("/members/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
