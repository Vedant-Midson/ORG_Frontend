"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Field from "../../../components/ui/Field";
import { userCreateGroup } from "../../../hooks/userCreateGroup";

export default function CreateGroupPage() {
  const router = useRouter();
  const { createGroup, loading } = userCreateGroup();

  const [form, setForm] = useState({
    group_code: "",
    group_value: "",
    duration_months: 15,
    monthly_amount: "",
    start_date: "",
    pnp: 0,
    treasury: 0, // backend key preserved
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createGroup(form);
    router.push("/groups");
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
        <Field
          label="Group Code"
          name="group_code"
          placeholder="10C1"
          value={form.group_code}
          onChange={handleChange}
        />

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     
          <Field
            label="Duration (Months)"
            name="duration_months"
            type="number"
            value={form.duration_months}
            onChange={handleChange}
          />
        </div>

        <Field
          label="Start Date"
          name="start_date"
          type="date"
          value={form.start_date}
          onChange={handleChange}
        />

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
            value={form.treasury}
            onChange={handleChange}
          />
        </div>

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
