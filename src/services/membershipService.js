import { apiFetch } from "./apiclient";

export async function createMembershipService(payload) {
  try {
    const data = await apiFetch("/memberships/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // ✅ success
    return data;

  } catch (err) {
    // ✅ backend error message
    throw new Error(
      err?.detail || err?.message || "Failed to create membership"
    );
  }
}
