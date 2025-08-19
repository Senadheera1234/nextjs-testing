// app/(main)/apps/user-management/edit/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { ProgressSpinner } from 'primereact/progressspinner';
import type { Member } from '../../list/MemberDetail';

type DateLike = Date | null;

interface FormState {
  firstName: string;
  lastName: string;
  gender: string;
  nic: string;
  dob: DateLike;
  email: string;
  phone: string;
  address: string;
  membershipId: string;
  joinDate: DateLike;
  status: string;
  occupation: string;
  familyMembers: string;
  emergencyName: string;
  emergencyNumber: string;
  notes: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ||
  'http://127.0.0.1:8000';

export default function MemberEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  const statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Suspended', value: 'Suspended' },
  ];

  // Fetch the existing member and pre-populate the form
  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/members/${params.id}/`);
        if (!res.ok) throw new Error('Failed to fetch member');
        const data: Member = await res.json();
        setFormData({
          firstName: data.first_name,
          lastName: data.last_name,
          gender: data.gender,
          nic: data.nic,
          dob: data.dob ? new Date(data.dob) : null,
          email: data.email || '',
          phone: data.phone,
          address: data.address,
          membershipId: data.membership_id,
          joinDate: data.join_date ? new Date(data.join_date) : null,
          status: data.status,
          occupation: data.occupation,
          familyMembers: data.family_members || '',
          emergencyName: data.emergency_name || '',
          emergencyNumber: data.emergency_number || '',
          notes: data.notes || '',
        });
      } catch (err: any) {
        setError(err.message || 'Error fetching member');
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [params.id]);

  const handleChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const toYMD = (d: DateLike) => (d ? new Date(d).toISOString().slice(0, 10) : null);

  const handleSubmit = async () => {
    if (!formData) return;
    setSaving(true);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        nic: formData.nic,
        dob: toYMD(formData.dob),
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        membershipId: formData.membershipId,
        joinDate: toYMD(formData.joinDate),
        status: formData.status,
        occupation: formData.occupation,
        familyMembers: formData.familyMembers,
        emergencyName: formData.emergencyName,
        emergencyNumber: formData.emergencyNumber,
        notes: formData.notes,
      };

      const res = await fetch(`${API_BASE}/api/members/${params.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Update failed:', res.status, text);
        alert('Failed to update member. See console for details.');
        return;
      }

      alert('Member updated successfully!');
      router.push('/apps/user-management/list');
    } catch (err) {
      console.error('Error updating member:', err);
      alert('Error updating member. See console.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/members/${params.id}/`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        alert('Failed to delete member.');
        return;
      }
      alert('Member deleted successfully.');
      router.push('/apps/user-management/list');
    } catch (err) {
      console.error('Error deleting member:', err);
      alert('Error deleting member. See console.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center min-h-screen">
        <ProgressSpinner style={{ width: '40px', height: '40px' }} />
      </div>
    );
  }

  if (error || !formData) {
    return (
      <div className="p-4">
        <Button
          label="Back to List"
          icon="pi pi-arrow-left"
          className="mb-3 p-button-text"
          onClick={() => router.push('/apps/user-management/list')}
        />
        <div className="text-red-500">Error loading member for edit.</div>
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
        <Card>
          <h2 className="m-0 mb-3">Edit Member</h2>
          <p className="text-600 mb-4">
            Modify member details below. All fields marked with * are required.
          </p>

          {/* Personal Info */}
          <h3 className="text-lg font-semibold mb-2">Personal Info</h3>
          <div className="grid formgrid">
            <div className="col-12 md:col-6 mb-3">
              <span className="p-float-label">
                <InputText
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  required
                />
                <label htmlFor="firstName">First Name *</label>
              </span>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <span className="p-float-label">
                <InputText
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  required
                />
                <label htmlFor="lastName">Last Name *</label>
              </span>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <span className="p-float-label">
                <Dropdown
                  id="gender"
                  value={formData.gender}
                  options={genderOptions}
                  onChange={(e) => handleChange('gender', (e as any).value)}
                  placeholder="Select Gender"
                  required
                  style={{ width: '100%' }}
                />
                <label htmlFor="gender">Gender *</label>
              </span>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <span className="p-float-label">
                <InputText
                  id="nic"
                  value={formData.nic}
                  onChange={(e) => handleChange('nic', e.target.value)}
                  required
                />
                <label htmlFor="nic">NIC *</label>
              </span>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <span className="p-float-label">
                <Calendar
                  id="dob"
                  value={formData.dob}
                  onChange={(e) => handleChange('dob', (e as any).value as DateLike)}
                  dateFormat="yy-mm-dd"
                  showIcon
                  required
                  style={{ width: '100%' }}
                />
                <label htmlFor="dob">Date of Birth *</label>
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <h3 className="text-lg font-semibold mt-4 mb-2">Contact Info</h3>
          <div className="grid formgrid">
            <div className="col-12 md:col-6 mb-3">
              <span className="p-float-label">
                <InputText
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                <label htmlFor="email">Email Address</label>
              </span>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <span className="p-float-label">
                <InputText
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  required
                />
                <label htmlFor="phone">Phone Number *</label>
              </span>
            </div>
            <div className="col-12 mb-3">
              <span className="p-float-label">
                <InputTextarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  rows={3}
                  required
                />
                <label htmlFor="address">Address *</label>
              </span>
            </div>
          </div>

          {/* Membership Info */}
          <h3 className="text-lg font-semibold mt-4 mb-2">Membership Info</h3>
          <div className="grid formgrid">
            <div className="col-12 md:col-6 mb-3">
              <span className="p-float-label">
                <InputText
                  id="membershipId"
                  value={formData.membershipId}
                  onChange={(e) => handleChange('membershipId', e.target.value)}
                  required
                />
                <label htmlFor="membershipId">Membership ID *</label>
              </span>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <span className="p-float-label">
                <Calendar
                  id="joinDate"
                  value={formData.joinDate}
                  onChange={(e) => handleChange('joinDate', (e as any).value as DateLike)}
                  dateFormat="yy-mm-dd"
                  showIcon
                  required
                  style={{ width: '100%' }}
                />
                <label htmlFor="joinDate">Join Date *</label>
              </span>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <span className="p-float-label">
                <Dropdown
                  id="status"
                  value={formData.status}
                  options={statusOptions}
                  onChange={(e) => handleChange('status', (e as any).value)}
                  placeholder="Select Status"
                  required
                  style={{ width: '100%' }}
                />
                <label htmlFor="status">Status *</label>
              </span>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <span className="p-float-label">
                <InputText
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => handleChange('occupation', e.target.value)}
                  required
                />
                <label htmlFor="occupation">Occupation *</label>
              </span>
            </div>
          </div>

          {/* Additional Info */}
          <h3 className="text-lg font-semibold mt-4 mb-2">Additional Info</h3>
          <div className="grid formgrid">
            <div className="col-12 mb-3">
              <span className="p-float-label">
                <InputText
                  id="familyMembers"
                  value={formData.familyMembers}
                  onChange={(e) => handleChange('familyMembers', e.target.value)}
                  required
                />
                <label htmlFor="familyMembers">Family Members (names) *</label>
              </span>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <span className="p-float-label">
                <InputText
                  id="emergencyName"
                  value={formData.emergencyName}
                  onChange={(e) => handleChange('emergencyName', e.target.value)}
                />
                <label htmlFor="emergencyName">Emergency Contact Name</label>
              </span>
            </div>
            <div className="col-12 md:col-6 mb-3">
              <span className="p-float-label">
                <InputText
                  id="emergencyNumber"
                  value={formData.emergencyNumber}
                  onChange={(e) => handleChange('emergencyNumber', e.target.value)}
                />
                <label htmlFor="emergencyNumber">Emergency Contact Number</label>
              </span>
            </div>
            <div className="col-12 mb-3">
              <span className="p-float-label">
                <InputTextarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={4}
                />
                <label htmlFor="notes">Notes</label>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              label={saving ? 'Saving...' : 'Update Member'}
              icon={saving ? 'pi pi-spin pi-spinner' : 'pi pi-check'}
              onClick={handleSubmit}
              disabled={saving}
            />
            <Button
              label="Delete"
              icon="pi pi-trash"
              className="p-button-danger"
              onClick={handleDelete}
              disabled={saving}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
