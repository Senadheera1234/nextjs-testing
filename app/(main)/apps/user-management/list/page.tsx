// app/(main)/apps/user-management/list/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import type { Member } from './MemberDetail';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ||
  'http://127.0.0.1:8000';

export default function MemberListPage() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch members from the backend
  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/members/`);
      if (!res.ok) throw new Error('Failed to fetch members');
      const data: Member[] = await res.json();
      setMembers(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Format dates to YYYY-MM-DD
  const formatDate = (d: string) => (d ? new Date(d).toISOString().slice(0, 10) : '');

  // Action buttons: View and Edit
  const actionBodyTemplate = (member: Member) => (
    <div className="flex gap-2">
      <Button
        label="View"
        icon="pi pi-eye"
        className="p-button-sm"
        onClick={() => router.push(`/apps/user-management/profile/${member.id}`)}
        aria-label={`View ${member.first_name} ${member.last_name}`}
      />
      <Button
        label="Edit"
        icon="pi pi-pencil"
        className="p-button-sm p-button-outlined"
        onClick={() => router.push(`/apps/user-management/edit/${member.id}`)}
        aria-label={`Edit ${member.first_name} ${member.last_name}`}
      />
    </div>
  );

  return (
    <div className="card">
      <div className="mb-3 flex align-items-center justify-content-between">
        <h2 className="m-0">Members</h2>
        <Button
          label="Create Member"
          icon="pi pi-plus"
          onClick={() => router.push('/apps/user-management/create')}
          aria-label="Create member"
        />
      </div>

      {loading && (
        <div className="flex justify-content-center my-5">
          <ProgressSpinner style={{ width: '40px', height: '40px' }} />
        </div>
      )}

      {!loading && error && (
        <div className="my-5 text-center text-red-500">Error loading members.</div>
      )}

      {!loading && !error && (
        <DataTable
          value={members}
          tableStyle={{ minWidth: '60rem' }}
          responsiveLayout="stack"
        >
          <Column field="membership_id" header="Membership ID" />
          <Column field="first_name" header="First Name" />
          <Column field="last_name" header="Last Name" />
          <Column field="phone" header="Phone" />
          <Column field="status" header="Status" />
          <Column
            field="join_date"
            header="Join Date"
            body={(m) => formatDate((m as Member).join_date)}
          />
          <Column body={actionBodyTemplate} header="Actions" />
        </DataTable>
      )}
    </div>
  );
}
