import { apiFetch } from "./apiclient";

export const ClientsService = {
  getAll: () => apiFetch("/members"),
};
