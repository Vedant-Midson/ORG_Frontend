"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = "http://127.0.0.1:8000";

export default function CreateGroupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    group_code: "",
    group_value: "",
    total_members: 15,
    duration_months: 15,
    monthly_amount: "",
    start_date: "",
    pnp: 0,
    trasury: 0, // ⚠️ keeping same key as backend
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/groups/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          group_value: Number(form.group_value),
          total_members: Number(form.total_members),
          duration_months: Number(form.duration_months),
          monthly_amount: Number(form.monthly_amount),
          pnp: Number(form.pnp),
          trasury: Number(form.trasury),
        }),
      });

      if (!res.ok) throw new Error("Failed to create group");

      router.push("/groups");
    } catch (err) {
      alert("Error creating group");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8 max-w-3xl">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold">Create Group</h1>
        <p className="text-sm text-gray-400 mt-1">
          Create a new chit fund group
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#111827] border border-white/10 rounded-xl p-6 space-y-6"
      >
        {/* GROUP CODE */}
        <Field
          label="Group Code"
          name="group_code"
          placeholder="10C1"
          value={form.group_code}
          onChange={handleChange}
        />

        {/* VALUE + MONTHLY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            label="Group Value"
            name="group_value"
            type="number"
            placeholder="300000"
            value={form.group_value}
            onChange={handleChange}
          />
          <Field
            label="Monthly Amount"
            name="monthly_amount"
            type="number"
            placeholder="30000"
            value={form.monthly_amount}
            onChange={handleChange}
          />
        </div>

        {/* MEMBERS + DURATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            label="Total Members"
            name="total_members"
            type="number"
            value={form.total_members}
            onChange={handleChange}
          />
          <Field
            label="Duration (Months)"
            name="duration_months"
            type="number"
            value={form.duration_months}
            onChange={handleChange}
          />
        </div>

        {/* DATE */}
        <Field
          label="Start Date"
          name="start_date"
          type="date"
          value={form.start_date}
          onChange={handleChange}
        />

        {/* PNP + TREASURY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            label="PNP"
            name="pnp"
            type="number"
            value={form.pnp}
            onChange={handleChange}
          />
          <Field
            label="Treasury"
            name="trasury"
            type="number"
            value={form.trasury}
            onChange={handleChange}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
              px-6 py-2 rounded-lg text-sm font-medium
              bg-gradient-to-r from-blue-600 to-orange-500
              hover:opacity-90 transition
              disabled:opacity-50
            "
          >
            {loading ? "Creating..." : "Create Group"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------- REUSABLE FIELD ---------- */

function Field({ label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        {...props}
        className="
          w-full bg-[#0f172a] border border-white/10
          rounded-lg px-4 py-3 text-sm
          placeholder-gray-500
          focus:outline-none focus:border-blue-500
        "
      />
    </div>
  );
}
