"use client";

import { useEffect, useState } from "react";

import Section from "@/components/ui/Section";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import NotificationModal from "@/components/ui/NotificationModal";

import { useClients } from "@/hooks/useClient";
import { userGroups } from "@/hooks/userGroups";
import { useCreateMembership } from "@/hooks/useCreateMembership";

export default function CreateMembershipPage() {
  const { clients = [], loading: membersLoading } = useClients();
  const groups = userGroups();
  const { createMembership, loading } = useCreateMembership();
  console.log(">>>>>>>>>>>>>>groups", groups);

  const [form, setForm] = useState({
    min_number: "",
    group_code: "",
    ticket_number: "",
  });

  const [notification, setNotification] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createMembership({
        min_number: form.min_number,
        group_code: form.group_code,
        ticket_number: Number(form.ticket_number),
      });

      setNotification({
        open: true,
        type: "success",
        title: "Membership Created",
        message: "Member successfully linked to the group.",
      });

      setForm({
        min_number: "",
        group_code: "",
        ticket_number: "",
      });
    } catch (err) {
      setNotification({
        open: true,
        type: "error",
        title: "Error",
        message: err.message || "Failed to create membership",
      });
    }
  }

  useEffect(() => {
    if (!notification.open) return;
    const timer = setTimeout(
      () => setNotification((n) => ({ ...n, open: false })),
      2500,
    );
    return () => clearTimeout(timer);
  }, [notification.open]);

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Create Membership</h1>
        <p className="text-sm text-gray-400 mt-1">
          Link a member to a chit group
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#111827] border border-white/10 rounded-xl p-8 space-y-6"
      >
        <Section title="Membership Details">
          <Select
            label="Member"
            name="min_number"
            value={form.min_number}
            onChange={handleChange}
            required
            disabled={membersLoading}
            options={clients.map((m) => ({
              value: m.min_number,
              label: `${m.full_name} (${m.min_number})`,
            }))}
          />

      <Select
  label="Group"
  name="group_code"
  value={form.group_code}
  onChange={handleChange}
  required
  options={Array.isArray(groups) ? groups.map((g) => g.code) : []}
/>


          <Input
            label="Ticket Number"
            name="ticket_number"
            value={form.ticket_number}
            onChange={handleChange}
            required
          />
        </Section>

        <div className="flex justify-end pt-6 border-t border-white/10">
          <button
            type="submit"
            disabled={loading}
            className="
              bg-gradient-to-r from-blue-600 to-orange-500
              px-6 py-2 rounded-lg text-sm font-medium
              hover:opacity-90 transition
              disabled:opacity-50
            "
          >
            {loading ? "Saving..." : "Create Membership"}
          </button>
        </div>
      </form>

      <NotificationModal
        open={notification.open}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() => setNotification((n) => ({ ...n, open: false }))}
      />
    </div>
  );
}
