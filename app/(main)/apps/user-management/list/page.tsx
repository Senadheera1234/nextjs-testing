'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import MemberDetail, { Member } from '../MemberDetail';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://127.0.0.1:8000';

export default function MemberListPage() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [selected, setSelected] = useState<Member | null>(null);
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const formatDate = (d: string) => (d ? new Date(d).toISOString().slice(0, 10) : '');
  const viewMember = (member: Member) => {
    setSelected(member);
    setDisplay(true);
  };

  const actionBodyTemplate = (member: Member) => (
    <div className="flex gap-1">
      <Button
        label="View"
        icon="pi pi-eye"
        className="p-button-text"
        onClick={() => viewMember(member)}
        aria-label={`View member ${member.first_name} ${member.last_name}`}
      />
      <Button
        label="Bio"
        icon="pi pi-user"
        className="p-button-text"
        onClick={() => router.push(`/apps/user-management/profile/${member.id}`)}
        aria-label={`Open bio for ${member.first_name} ${member.last_name}`}
      />
    </div>
  );

  const membershipBodyTemplate = (member: Member) => (
    <Button
      label={member.membership_id}
      className="p-button-link p-0"
      onClick={() => router.push(`/apps/user-management/profile/${member.id}`)}
      aria-label={`Open bio for ${member.first_name} ${member.last_name}`}
    />
  );

  return (
    <div className="card">
      <div className="flex justify-content-between align-items-center mb-3">
        <h2 className="m-0 text-xl">Members</h2>
        <Button
          label="Create Member"
          icon="pi pi-plus"
          onClick={() => router.push('/apps/user-management/create')}
          aria-label="Create member"
        />
      </div>

      {loading && (
        <div className="flex justify-content-center p-4">
          <ProgressSpinner />
        </div>
      )}

      {!loading && error && (
        <div className="p-4 text-center">
          <p className="mb-3">Error loading members.</p>
          <Button label="Retry" icon="pi pi-refresh" onClick={fetchMembers} />
        </div>
      )}

      {!loading && !error && (
        <DataTable value={members} responsiveLayout="scroll" emptyMessage="No members found.">
          <Column
            field="membership_id"
            header="Membership ID"
            body={membershipBodyTemplate}
            style={{ minWidth: '12rem' }}
          />
          <Column field="first_name" header="First Name" />
          <Column field="last_name" header="Last Name" />
          <Column field="phone" header="Phone" />
          <Column field="status" header="Status" />
          <Column
            field="join_date"
            header="Join Date"
            body={(m: Member) => formatDate(m.join_date)}
          />
          <Column
            header="Actions"
            body={actionBodyTemplate}
            style={{ minWidth: '6rem' }}
          />
        </DataTable>
      )}
      <Dialog
        header={`Member: ${selected?.membership_id} — ${selected?.first_name} ${selected?.last_name}`}
        visible={display}
        style={{ width: '50vw' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        onHide={() => setDisplay(false)}
      >
        {selected && <MemberDetail member={selected} />}
      </Dialog>
    </div>
  );
}

