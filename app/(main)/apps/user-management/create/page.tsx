'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

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
  familyMembers: string; // names string, not a number
  emergencyName: string;
  emergencyNumber: string;
  notes: string;
}

// const API_BASE =
//   (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || 'https://es-back-uaj2.onrender.com').replace(/\/$/, '');

export default function ProfileCreate() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    gender: '',
    nic: '',
    dob: null,
    email: '',
    phone: '',
    address: '',
    membershipId: '',
    joinDate: null,
    status: '',
    occupation: '',
    familyMembers: '',
    emergencyName: '',
    emergencyNumber: '',
    notes: '',
  });

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

  const handleChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toYMD = (d: DateLike) => (d ? new Date(d).toISOString().slice(0, 10) : null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        // keep camelCase keys (serializer expects these names)
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
        familyMembers: formData.familyMembers, // string of names
        emergencyName: formData.emergencyName,
        emergencyNumber: formData.emergencyNumber,
        notes: formData.notes,
      };

      console.log('POST payload', payload);

      const res = await fetch(`${API_BASE}/api/members/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Create member failed:', res.status, text);
        alert('Failed to create member. See console for details.');
        return;
      }

      // success
      // const data = await res.json();
      alert('Member created successfully!');
      router.push('/apps/user-management/list');
    } catch (err) {
      console.error('Error creating member:', err);
      alert('Error creating member. See console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="flex align-items-center justify-content-between mb-4">
        <span className="text-900 text-xl font-bold">Create Member</span>
        <Button
          label="Back"
          icon="pi pi-arrow-left"
          outlined
          onClick={() => router.push('/apps/user-management/list')}
        />
      </div>

      <div className="grid">
        <div className="col-12 lg:col-2">
          <div className="text-900 font-medium text-xl mb-3">Member Info</div>
          <p className="m-0 p-0 text-600 line-height-3 mr-3">
            Fill in the member details below. All fields marked with * are required.
          </p>
        </div>

        <div className="col-12 lg:col-10">
          <div className="grid formgrid p-fluid">
            {/* Personal Info */}
            <div className="field mb-4 col-12 md:col-6">
              <label htmlFor="firstName" className="font-medium text-900">
                First Name *
              </label>
              <InputText id="firstName" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} required />
            </div>

            <div className="field mb-4 col-12 md:col-6">
              <label htmlFor="lastName" className="font-medium text-900">
                Last Name *
              </label>
              <InputText id="lastName" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} required />
            </div>

            <div className="field mb-4 col-12 md:col-6">
              <label htmlFor="gender" className="font-medium text-900">
                Gender *
              </label>
              <Dropdown id="gender" options={genderOptions} value={formData.gender} onChange={(e) => handleChange('gender', (e as any).value)} placeholder="Select Gender" required />
            </div>

            <div className="field mb-4 col-12 md:col-6">
              <label htmlFor="nic" className="font-medium text-900">
                NIC *
              </label>
              <InputText id="nic" value={formData.nic} onChange={(e) => handleChange('nic', e.target.value)} required />
            </div>

            <div className="field mb-4 col-12 md:col-6">
              <label htmlFor="dob" className="font-medium text-900">
                Date of Birth *
              </label>
              <Calendar id="dob" showIcon dateFormat="yy-mm-dd" value={formData.dob} onChange={(e) => handleChange('dob', (e as any).value as DateLike)} required />
            </div>

            {/* Contact Info */}
            <div className="field mb-4 col-12 md:col-6">
              <label htmlFor="email" className="font-medium text-900">
                Email Address
              </label>
              <InputText id="email" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>

            <div className="field mb-4 col-12 md:col-6">
              <label htmlFor="phone" className="font-medium text-900">
                Phone Number *
              </label>
              <InputText id="phone" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} required />
            </div>

            <div className="field mb-4 col-12">
              <label htmlFor="address" className="font-medium text-900">
                Address *
              </label>
              <InputTextarea id="address" rows={3} value={formData.address} onChange={(e) => handleChange('address', e.target.value)} required />
            </div>

            {/* Membership Info */}
            <div className="field mb-4 col-12 md:col-6">
              <label htmlFor="membershipId" className="font-medium text-900">
                Membership ID *
              </label>
              <InputText id="membershipId" value={formData.membershipId} onChange={(e) => handleChange('membershipId', e.target.value)} required />
            </div>

            <div className="field mb-4 col-12 md:col-6">
              <label htmlFor="joinDate" className="font-medium text-900">
                Join Date *
              </label>
              <Calendar id="joinDate" showIcon dateFormat="yy-mm-dd" value={formData.joinDate} onChange={(e) => handleChange('joinDate', (e as any).value as DateLike)} required />
            </div>

            <div className="field mb-4 col-12 md:col-6">
              <label htmlFor="status" className="font-medium text-900">
                Status *
              </label>
              <Dropdown id="status" options={statusOptions} value={formData.status} onChange={(e) => handleChange('status', (e as any).value)} placeholder="Select Status" required />
            </div>

            {/* Additional Info */}
            <div className="field mb-4 col-12 md:col-6">
              <label htmlFor="occupation" className="font-medium text-900">
                Occupation *
              </label>
              <InputText id="occupation" value={formData.occupation} onChange={(e) => handleChange('occupation', e.target.value)} required />
            </div>

            <div className="field mb-4 col-12 md:col-6">
              <label htmlFor="familyMembers" className="font-medium text-900">
                Family Members (names) *
              </label>
              <InputText id="familyMembers" value={formData.familyMembers} onChange={(e) => handleChange('familyMembers', e.target.value)} placeholder="e.g. Father, Mother, Sister" required />
            </div>

            <div className="field mb-4 col-12 md:col-6">
              <label htmlFor="emergencyName" className="font-medium text-900">
                Emergency Contact Name
              </label>
              <InputText id="emergencyName" value={formData.emergencyName} onChange={(e) => handleChange('emergencyName', e.target.value)} />
            </div>

            <div className="field mb-4 col-12 md:col-6">
              <label htmlFor="emergencyNumber" className="font-medium text-900">
                Emergency Contact Number
              </label>
              <InputText id="emergencyNumber" value={formData.emergencyNumber} onChange={(e) => handleChange('emergencyNumber', e.target.value)} />
            </div>

            <div className="field mb-4 col-12">
              <label htmlFor="notes" className="font-medium text-900">
                Notes
              </label>
              <InputTextarea id="notes" rows={3} value={formData.notes} onChange={(e) => handleChange('notes', e.target.value)} />
            </div>

            <div className="col-12">
              <Button label={loading ? 'Saving…' : 'Create User'} className="w-auto mt-3" onClick={handleSubmit} disabled={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
