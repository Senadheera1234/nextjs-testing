// app/(main)/apps/user-management/profile/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';
import type { Member } from '../../list/MemberDetail';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ||
  'http://127.0.0.1:8000';

export default function MemberBioPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMember = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/members/${params.id}/`);
      if (!res.ok) throw new Error('Failed to fetch member');
      const data: Member = await res.json();
      setMember(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch member');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMember();
  }, [params.id]);

  const formatDate = (d: string) => (d ? new Date(d).toISOString().slice(0, 10) : '-');

  // Derive initials for the avatar and map status to tag severity
  const initials =
    member?.first_name && member.last_name
      ? `${member.first_name.charAt(0)}${member.last_name.charAt(0)}`.toUpperCase()
      : '';
  const statusSeverity =
    member?.status?.toLowerCase() === 'active'
      ? 'success'
      : member?.status?.toLowerCase() === 'inactive'
        ? 'danger'
        : 'info';

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center min-h-screen">
        <ProgressSpinner style={{ width: '40px', height: '40px' }} />
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="p-4">
        <Button
          label="Back to List"
          icon="pi pi-arrow-left"
          className="mb-3 p-button-text"
          onClick={() => router.push('/apps/user-management/list')}
        />
        <div className="text-red-500">Error loading member.</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Button
        label="Back to List"
        icon="pi pi-arrow-left"
        className="mb-3 p-button-text"
        onClick={() => router.push('/apps/user-management/list')}
      />
      {/* Outer wrapper to distinguish card background */}
      <div className="card">
        <Card className="p-4">
          {/* Header with avatar, name, status tag, and future action buttons */}
          <div className="flex flex-column md:flex-row md:align-items-center justify-content-between gap-4 mb-4">
            <div className="flex align-items-center gap-3">
              {/* Avatar uses initials; fallback icon if missing */}
              <Avatar
                label={initials}
                icon={!initials ? 'pi pi-user' : undefined}
                size="xlarge"
                shape="circle"
              />
              <div>
                <h2 className="m-0 text-900">
                  {member.first_name} {member.last_name}
                </h2>
                <Tag
                  value={member.status}
                  severity={statusSeverity}
                  className="mt-1 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {/* Edit and Delete are placeholders for future functionality */}
              <Button
                label="Edit"
                icon="pi pi-pencil"
                className="p-button-text"
                onClick={() => router.push(`/apps/user-management/edit/${member.id}`)}
              />
              <Button
                label="Delete"
                icon="pi pi-trash"
                className="p-button-text p-button-danger"
                disabled
              />
            </div>
          </div>

          {/* Personal Information Section */}
          <h3 className="text-xl font-semibold mt-0 mb-2 text-900">
            Personal Information
          </h3>
          <div className="grid formgrid mb-3">
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">Membership ID</div>
              <div className="text-900">{member.membership_id}</div>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">Join Date</div>
              <div className="text-900">{formatDate(member.join_date)}</div>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">Date of Birth</div>
              <div className="text-900">{formatDate(member.dob)}</div>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">Gender</div>
              <div className="text-900">{member.gender}</div>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">Occupation</div>
              <div className="text-900">{member.occupation}</div>
            </div>
            <div className="col-12 mb-3">
              <div className="font-medium text-600 mb-1">Family Members</div>
              <div className="text-900">{member.family_members}</div>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">NIC</div>
              <div className="text-900">{member.nic}</div>
            </div>
          </div>

          {/* Contact Information Section */}
          <h3 className="text-xl font-semibold mt-4 mb-2 text-900">
            Contact Information
          </h3>
          <div className="grid formgrid mb-3">
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">Address</div>
              <div className="text-900">{member.address}</div>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">Phone</div>
              <div className="text-900">{member.phone}</div>
            </div>
            <div className="col-12 md:col-6">
              <div className="font-medium text-600 mb-1">Email</div>
              <div className="text-900">{member.email || '-'}</div>
            </div>
          </div>

          {/* Emergency Details Section */}
          <h3 className="text-xl font-semibold mt-4 mb-2 text-900">
            Emergency Details
          </h3>
          <div className="grid formgrid mb-3">
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">
                Emergency Contact Name
              </div>
              <div className="text-900">{member.emergency_name || '-'}</div>
            </div>
            <div className="col-12 md:col-6">
              <div className="font-medium text-600 mb-1">
                Emergency Contact Number
              </div>
              <div className="text-900">{member.emergency_number || '-'}</div>
            </div>
          </div>

          {/* Notes Section */}
          <h3 className="text-xl font-semibold mt-4 mb-2 text-900">Notes</h3>
          <div className="text-900" style={{ whiteSpace: 'pre-wrap' }}>
            {member.notes || '-'}
          </div>
        </Card>
      </div>
    </div>
  );
}
