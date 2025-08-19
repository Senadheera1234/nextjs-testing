// app/(main)/apps/user-management/profile/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import type { Member } from '../../list/MemberDetail'; // corrected relative path

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
      <div className="card">
        <Card title={`${member.first_name} ${member.last_name}`} subTitle="Member Biography">
          <div className="grid formgrid">
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">Membership ID</div>
              <div className="text-900">{member.membership_id}</div>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">Status</div>
              <div className="text-900">{member.status}</div>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">Join Date</div>
              <div className="text-900">{formatDate(member.join_date)}</div>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">Gender</div>
              <div className="text-900">{member.gender}</div>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">Date of Birth</div>
              <div className="text-900">{formatDate(member.dob)}</div>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">Occupation</div>
              <div className="text-900">{member.occupation}</div>
            </div>
            <div className="col-12 mb-3">
              <div className="font-medium text-600 mb-1">Address</div>
              <div className="text-900">{member.address}</div>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">Phone</div>
              <div className="text-900">{member.phone}</div>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">Email</div>
              <div className="text-900">{member.email || '-'}</div>
            </div>
            <div className="col-12 mb-3">
              <div className="font-medium text-600 mb-1">Family Members</div>
              <div className="text-900">{member.family_members}</div>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">Emergency Contact Name</div>
              <div className="text-900">{member.emergency_name || '-'}</div>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <div className="font-medium text-600 mb-1">Emergency Contact Number</div>
              <div className="text-900">{member.emergency_number || '-'}</div>
            </div>
            <div className="col-12">
              <div className="font-medium text-600 mb-1">Notes</div>
              <div className="text-900" style={{ whiteSpace: 'pre-wrap' }}>
                {member.notes || '-'}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
