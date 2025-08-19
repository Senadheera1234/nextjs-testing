'use client';

import React from 'react';

export interface Member {
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

const formatDate = (d: string) => (d ? new Date(d).toISOString().slice(0, 10) : '-');

export default function MemberDetail({ member }: { member: Member }) {
  return (
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
  );
}

