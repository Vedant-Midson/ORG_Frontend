"use client";

import { useEffect, useState } from "react";

import Section from "@/components/ui/Section";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import NotificationModal from "@/components/ui/NotificationModal";
import { useCreateMember } from "@/hooks/useCreateMember";

export default function AddMemberPage() {
  const { createMember, loading } = useCreateMember();

  /* ---------------- FORM STATE ---------------- */
  const [form, setForm] = useState({
    min_number: "",
    full_name: "",
    mobile: "",
    profile: "",
    reference_code: "",
    nature_of_business: "",
    address: "",
    pincode: "",
    status: "ACTIVE",
  });

  /* ---------------- NOTIFICATION STATE ---------------- */
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
      const result=await createMember(form);
      console.log("Member created:", result);


      // ✅ SUCCESS NOTIFICATION
      setNotification({
        open: true,
        type: "success",
        title: "Member Created",
        message: "The member has been added successfully.",
      });

      // Reset form
      setForm({
        min_number: "",
        full_name: "",
        mobile: "",
        profile: "",
        reference_code: "",
        nature_of_business: "",
        address: "",
        pincode: "",
        status: "ACTIVE",
      });
    } catch (err) {
      // ❌ ERROR NOTIFICATION
      setNotification({
        open: true,
        type: "error",
        title: "Error",
        message: "Failed to create member. Please try again.",
      });
    }
  }

  /* ---------------- AUTO CLOSE NOTIFICATION ---------------- */
  useEffect(() => {
    if (!notification.open) return;

    const timer = setTimeout(() => {
      setNotification((prev) => ({ ...prev, open: false }));
    }, 2500);

    return () => clearTimeout(timer);
  }, [notification.open]);

  return (
    <div className="max-w-4xl space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold">Add Member</h1>
        <p className="text-sm text-gray-400 mt-1">
          Register a new member in Organized Group System
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#111827] border border-white/10 rounded-xl p-8 space-y-6"
      >
        <Section title="Basic Details">
          <Input
            label="MIN Number"
            name="min_number"
            value={form.min_number}
            onChange={handleChange}
            required
          />
          <Input
            label="Full Name"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
          />
          <Input
            label="Mobile Number"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            required
          />
        </Section>

        <Section title="Profile & Reference">
          <Select
            label="Profile"
            name="profile"
            value={form.profile}
            onChange={handleChange}
            options={[
              "Service Provider",
              "Trader",
              "Manufacturer",
              "Retailer",
              "Other",
            ]}
          />
          <Input
            label="Reference Code"
            name="reference_code"
            placeholder="AG / DS / RT"
            value={form.reference_code}
            onChange={handleChange}
          />
        </Section>

        <Section title="Business Details">
          <Textarea
            label="Nature of Business"
            name="nature_of_business"
            value={form.nature_of_business}
            onChange={handleChange}
          />
          <Textarea
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
          <Input
            label="Pincode"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
          />
        </Section>

        <Section title="Status">
          <Select
            label="Member Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={["ACTIVE", "INACTIVE"]}
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
            {loading ? "Saving..." : "Create Member"}
          </button>
        </div>
      </form>

      {/* 🔔 NOTIFICATION MODAL */}
      <NotificationModal
        open={notification.open}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() =>
          setNotification((prev) => ({ ...prev, open: false }))
        }
      />
    </div>
  );
}
