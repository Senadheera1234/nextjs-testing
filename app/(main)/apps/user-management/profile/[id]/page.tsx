'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import MemberDetail, { Member } from '../../list/MemberDetail';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://127.0.0.1:8000';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (loading) {
    return <div className="card p-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="card p-4 text-center">
        <p className="mb-3">Error loading member.</p>
        <Button label="Retry" icon="pi pi-refresh" onClick={fetchMember} />
      </div>
    );
  }

  if (!member) {
    return null;
  }

  return (
    <div className="card">
      <div className="flex justify-content-between align-items-center mb-4">
        <Button
          label="Back"
          icon="pi pi-arrow-left"
          onClick={() => router.push('/apps/user-management/list')}
          aria-label="Back to list"
        />
        <h2 className="m-0 text-xl">Member Bio</h2>
      </div>
      <h3 className="text-2xl mb-4">
        {member.first_name} {member.last_name}
      </h3>
      <MemberDetail member={member} />
    </div>
  );
}

