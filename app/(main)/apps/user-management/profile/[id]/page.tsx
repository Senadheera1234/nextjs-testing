'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://127.0.0.1:8000';

interface Member {
  id: number;
  membership_id: string;
  first_name: string;
  last_name: string;
  nic: string;
  phone: string;
  status: string;
  join_date: string;
  gender: string;
  dob: string;
  address: string;
  occupation: string;
  family_members: string;
  emergency_name: string;
  emergency_number: string;
  email: string;
  notes: string;
}

export default function MemberBioPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Member>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchMember = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/members/${params.id}/`);
      if (!res.ok) throw new Error('Failed to fetch member');
      const data: Member = await res.json();
      setMember(data);
      setForm(data);
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to load member' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleChange = (field: keyof Member, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const onEdit = () => {
    setEdit(true);
    setForm(member || {});
    setErrors({});
  };

  const onCancel = () => {
    setEdit(false);
    setForm(member || {});
    setErrors({});
  };

  const save = async () => {
    const required: (keyof Member)[] = [
      'first_name',
      'last_name',
      'nic',
      'phone',
      'address',
      'membership_id',
      'join_date',
      'occupation',
      'status',
    ];
    const newErrors: Record<string, string> = {};
    required.forEach((f) => {
      if (!form[f]) newErrors[f] = 'Required';
    });
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setSaving(true);
    try {
      const payload: Partial<Member> = {};
      Object.keys(form).forEach((k) => {
        if ((form as any)[k] !== (member as any)?.[k]) {
          (payload as any)[k] = (form as any)[k];
        }
      });
      const res = await fetch(`${API_BASE}/api/members/${params.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setErrors(err);
        throw new Error('Failed to save');
      }
      const updated: Member = await res.json();
      setMember(updated);
      setEdit(false);
      toast.current?.show({ severity: 'success', summary: 'Saved', detail: 'Member updated' });
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Could not save member' });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = () => {
    confirmDialog({
      message: `Are you sure you want to delete member ${member?.membership_id} — ${member?.first_name} ${member?.last_name}? This action cannot be undone.`,
      header: 'Delete Member',
      icon: 'pi pi-exclamation-triangle',
      accept: delMember,
    });
  };

  const delMember = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/members/${params.id}/`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.current?.show({ severity: 'success', summary: 'Deleted', detail: 'Member removed' });
      router.push('/apps/user-management/list');
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Could not delete member' });
    }
  };

  const formatDate = (d: string) => (d ? new Date(d).toISOString().slice(0, 10) : '');

  if (loading) {
    return (
      <div className="card flex justify-content-center p-6">
        <ProgressSpinner />
      </div>
    );
  }

  if (!member) return null;

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="flex justify-content-between align-items-center mb-4">
        <Button
          label="Back"
          icon="pi pi-arrow-left"
          className="p-button-text"
          onClick={() => router.push('/apps/user-management/list')}
          aria-label="Back to list"
        />
        <h2 className="m-0">
          {member.first_name} {member.last_name}
        </h2>
        <div className="flex gap-2">
          {!edit && (
            <>
              <Button
                label="Edit"
                icon="pi pi-pencil"
                onClick={onEdit}
                aria-label="Edit member"
              />
              <Button
                label="Delete"
                icon="pi pi-trash"
                className="p-button-danger"
                onClick={confirmDelete}
                aria-label="Delete member"
              />
            </>
          )}
        </div>
      </div>
      <Card>
        {edit ? (
          <div className="formgrid grid p-fluid">
            <div className="field col-12 md:col-6">
              <label htmlFor="membership_id">Membership ID</label>
              <InputText
                id="membership_id"
                value={form.membership_id || ''}
                onChange={(e) => handleChange('membership_id', e.target.value)}
              />
              {errors.membership_id && <small className="p-error">{errors.membership_id}</small>}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="first_name">First Name</label>
              <InputText
                id="first_name"
                value={form.first_name || ''}
                onChange={(e) => handleChange('first_name', e.target.value)}
              />
              {errors.first_name && <small className="p-error">{errors.first_name}</small>}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="last_name">Last Name</label>
              <InputText
                id="last_name"
                value={form.last_name || ''}
                onChange={(e) => handleChange('last_name', e.target.value)}
              />
              {errors.last_name && <small className="p-error">{errors.last_name}</small>}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="nic">NIC</label>
              <InputText
                id="nic"
                value={form.nic || ''}
                onChange={(e) => handleChange('nic', e.target.value)}
              />
              {errors.nic && <small className="p-error">{errors.nic}</small>}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="phone">Phone</label>
              <InputText
                id="phone"
                value={form.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
              {errors.phone && <small className="p-error">{errors.phone}</small>}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                value={form.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
            <div className="field col-12">
              <label htmlFor="address">Address</label>
              <InputTextarea
                id="address"
                rows={3}
                value={form.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
              />
              {errors.address && <small className="p-error">{errors.address}</small>}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="occupation">Occupation</label>
              <InputText
                id="occupation"
                value={form.occupation || ''}
                onChange={(e) => handleChange('occupation', e.target.value)}
              />
              {errors.occupation && <small className="p-error">{errors.occupation}</small>}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="status">Status</label>
              <Dropdown
                id="status"
                options={['Active', 'Inactive']}
                value={form.status || ''}
                onChange={(e) => handleChange('status', e.value)}
                placeholder="Select"
              />
              {errors.status && <small className="p-error">{errors.status}</small>}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="gender">Gender</label>
              <InputText
                id="gender"
                value={form.gender || ''}
                onChange={(e) => handleChange('gender', e.target.value)}
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="join_date">Join Date</label>
              <Calendar
                id="join_date"
                value={form.join_date ? new Date(form.join_date) : undefined}
                onChange={(e) =>
                  handleChange(
                    'join_date',
                    (e.value as Date | null)?.toISOString().slice(0, 10) || ''
                  )
                }
                dateFormat="yy-mm-dd"
                showIcon
              />
              {errors.join_date && <small className="p-error">{errors.join_date}</small>}
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="dob">DOB</label>
              <Calendar
                id="dob"
                value={form.dob ? new Date(form.dob) : undefined}
                onChange={(e) =>
                  handleChange(
                    'dob',
                    (e.value as Date | null)?.toISOString().slice(0, 10) || ''
                  )
                }
                dateFormat="yy-mm-dd"
                showIcon
              />
            </div>
            <div className="field col-12">
              <label htmlFor="family_members">Family Members</label>
              <InputTextarea
                id="family_members"
                rows={2}
                value={form.family_members || ''}
                onChange={(e) => handleChange('family_members', e.target.value)}
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="emergency_name">Emergency Name</label>
              <InputText
                id="emergency_name"
                value={form.emergency_name || ''}
                onChange={(e) => handleChange('emergency_name', e.target.value)}
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="emergency_number">Emergency Number</label>
              <InputText
                id="emergency_number"
                value={form.emergency_number || ''}
                onChange={(e) => handleChange('emergency_number', e.target.value)}
              />
            </div>
            <div className="field col-12">
              <label htmlFor="notes">Notes</label>
              <InputTextarea
                id="notes"
                rows={3}
                value={form.notes || ''}
                onChange={(e) => handleChange('notes', e.target.value)}
              />
            </div>
            <div className="col-12 flex justify-content-end gap-2 mt-3">
              <Button
                label="Save"
                icon="pi pi-check"
                onClick={save}
                disabled={saving}
                aria-label="Save member"
              />
              <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-outlined"
                onClick={onCancel}
                aria-label="Cancel edit"
              />
            </div>
          </div>
        ) : (
          <div className="grid">
            <div className="col-12 md:col-6">
              <strong>Membership ID:</strong> {member.membership_id}
            </div>
            <div className="col-12 md:col-6">
              <strong>First Name:</strong> {member.first_name}
            </div>
            <div className="col-12 md:col-6">
              <strong>Last Name:</strong> {member.last_name}
            </div>
            <div className="col-12 md:col-6">
              <strong>NIC:</strong> {member.nic}
            </div>
            <div className="col-12 md:col-6">
              <strong>Phone:</strong> {member.phone}
            </div>
            <div className="col-12 md:col-6">
              <strong>Email:</strong> {member.email || '-'}
            </div>
            <div className="col-12">
              <strong>Address:</strong> {member.address}
            </div>
            <div className="col-12 md:col-6">
              <strong>Join Date:</strong> {formatDate(member.join_date)}
            </div>
            <div className="col-12 md:col-6">
              <strong>Status:</strong> {member.status}
            </div>
            <div className="col-12 md:col-6">
              <strong>Occupation:</strong> {member.occupation}
            </div>
            <div className="col-12 md:col-6">
              <strong>Gender:</strong> {member.gender}
            </div>
            <div className="col-12 md:col-6">
              <strong>DOB:</strong> {formatDate(member.dob)}
            </div>
            <div className="col-12">
              <strong>Family Members:</strong> {member.family_members}
            </div>
            <div className="col-12 md:col-6">
              <strong>Emergency Name:</strong> {member.emergency_name}
            </div>
            <div className="col-12 md:col-6">
              <strong>Emergency Number:</strong> {member.emergency_number}
            </div>
            <div className="col-12">
              <strong>Notes:</strong> {member.notes || '-'}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

