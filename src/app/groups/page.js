"use client";

import { useState } from "react";
import { userGroups } from "../../hooks/userGroups";
import { useGroupMembers } from "../../hooks/userGroupMembers";
import Link from "next/link";

import SummaryCard from "../../components/ui/SummaryCard";
import GroupsTable from "../../components/groups/GroupsTable";
import GroupMembersModal from "../../components/groups/GroupMembersModal";
import CreateGroupButton from "../../components/groups/CreateGroupButton";

export default function GroupsPage() {
  const groups = userGroups();
  console.log("GroupsPage render, groups:", groups);
  const { members, loading, fetchMembers } = useGroupMembers();

  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);

  function openGroup(group) {
    setSelectedGroup(group);
    fetchMembers(group.id);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Groups</h1>
        <Link href="/membership">
          <button
            className="
          bg-gradient-to-r from-blue-600 to-orange-500
          px-5 py-2 rounded-lg text-sm font-medium
          hover:opacity-90 transition
        "
          >
            + Create Membership
          </button>
        </Link>
        <CreateGroupButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <input
          placeholder="Search group"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:col-span-2 bg-[#111827] border border-white/10
            rounded-lg px-4 py-3 text-sm
            placeholder-gray-500 focus:outline-none
            focus:border-blue-500
          "
        />
        <SummaryCard title="Active Groups" value="12" />
        <SummaryCard title="Completed Groups" value="5" />
      </div>

      <GroupsTable groups={groups} search={search} onView={openGroup} />

      {selectedGroup && (
        <GroupMembersModal
          group={selectedGroup}
          members={members}
          loading={loading}
          onClose={() => setSelectedGroup(null)}
        />
      )}
    </div>
  );
}
