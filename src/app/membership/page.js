"use client";

import { useEffect, useState } from "react";

import Section from "@/components/ui/Section";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import NotificationModal from "@/components/ui/NotificationModal";

export default function CreateMembershipPage() {
  /* ---------------- DUMMY DATA ---------------- */

  const members = [
    { id: 1, name: "Rakesh Kapoor", min: "198" },
    { id: 2, name: "Manoj Batra", min: "158" },
    { id: 3, name: "Kapil Arora", min: "144" },
  ];

  const groups = [
    { id: 1, code: "10C1" },
    { id: 2, code: "12B2" },
    { id: 3, code: "15A1" },
  ];

  /* ---------------- FORM STATE ---------------- */

  const [form, setForm] = useState({
    member_id: "",
    group_id: "",
    ticket_number: "",
    status: "ACTIVE",
  });

  /* ---------------- NOTIFICATION ---------------- */

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

  function handleSubmit(e) {
    e.preventDefault();

    // Simulate success
    setNotification({
      open: true,
      type: "success",
      title: "Membership Created",
      message: "Member successfully linked to the group.",
    });

    setForm({
      member_id: "",
      group_id: "",
      ticket_number: "",
      status: "ACTIVE",
    });
  }

  /* ---------------- AUTO CLOSE ---------------- */

  useEffect(() => {
    if (!notification.open) return;
    const timer = setTimeout(
      () => setNotification((n) => ({ ...n, open: false })),
      2500
    );
    return () => clearTimeout(timer);
  }, [notification.open]);

  return (
    <div className="max-w-3xl space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold">Create Membership</h1>
        <p className="text-sm text-gray-400 mt-1">
          Link a member to a chit group
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#111827] border border-white/10 rounded-xl p-8 space-y-6"
      >
        <Section title="Membership Details">

          <Select
            label="Member"
            name="member_id"
            value={form.member_id}
            onChange={handleChange}
            options={members.map((m) => ({
              value: m.id,
              label: `${m.name} (${m.min})`,
            }))}
          />

          <Select
            label="Group"
            name="group_id"
            value={form.group_id}
            onChange={handleChange}
            options={groups.map((g) => ({
              value: g.id,
              label: g.code,
            }))}
          />

          <Input
            label="Ticket Number"
            name="ticket_number"
            value={form.ticket_number}
            onChange={handleChange}
            required
          />

          <Select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={[
              { value: "ACTIVE", label: "ACTIVE" },
              { value: "INACTIVE", label: "INACTIVE" },
            ]}
          />
        </Section>

        <div className="flex justify-end pt-6 border-t border-white/10">
          <button
            type="submit"
            className="
              bg-gradient-to-r from-blue-600 to-orange-500
              px-6 py-2 rounded-lg text-sm font-medium
              hover:opacity-90 transition
            "
          >
            Create Membership
          </button>
        </div>
      </form>

      {/* NOTIFICATION */}
      <NotificationModal
        open={notification.open}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() =>
          setNotification((n) => ({ ...n, open: false }))
        }
      />
    </div>
  );
}
