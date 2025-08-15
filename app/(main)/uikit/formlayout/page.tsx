'use client';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';

function ProfileCreate() {
    const [formData, setFormData] = useState({
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
        notes: ''
    });

    const genderOptions = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' }
    ];

    const statusOptions = [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
        { label: 'Suspended', value: 'Suspended' }
    ];

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        console.log("Submitting form data:", formData);
        try {
            const response = await fetch('https://dummyapi.com/members', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("API Response:", data);
            alert('Member created successfully (dummy)');
        } catch (error) {
            console.error("Error creating member:", error);
            alert('Error creating member');
        }
    };

    return (
        <div className="card">
            <span className="text-900 text-xl font-bold mb-4 block">Create Member</span>
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
                            <label htmlFor="firstName" className="font-medium text-900">First Name *</label>
                            <InputText id="firstName" type="text" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} required />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="lastName" className="font-medium text-900">Last Name *</label>
                            <InputText id="lastName" type="text" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} required />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="gender" className="font-medium text-900">Gender *</label>
                            <Dropdown id="gender" options={genderOptions} value={formData.gender} onChange={(e) => handleChange('gender', e.value)} placeholder="Select Gender" required />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="nic" className="font-medium text-900">NIC *</label>
                            <InputText id="nic" type="text" value={formData.nic} onChange={(e) => handleChange('nic', e.target.value)} required />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="dob" className="font-medium text-900">Date of Birth *</label>
                            <Calendar id="dob" showIcon dateFormat="yy-mm-dd" value={formData.dob} onChange={(e) => handleChange('dob', e.value)} required />
                        </div>

                        {/* Contact Info */}
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="email" className="font-medium text-900">Email Address</label>
                            <InputText id="email" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="phone" className="font-medium text-900">Phone Number *</label>
                            <InputText id="phone" type="text" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} required />
                        </div>
                        <div className="field mb-4 col-12">
                            <label htmlFor="address" className="font-medium text-900">Address *</label>
                            <InputTextarea id="address" rows={3} value={formData.address} onChange={(e) => handleChange('address', e.target.value)} required />
                        </div>

                        {/* Membership Info */}
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="membershipId" className="font-medium text-900">Membership ID *</label>
                            <InputText id="membershipId" type="text" value={formData.membershipId} onChange={(e) => handleChange('membershipId', e.target.value)} required />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="joinDate" className="font-medium text-900">Join Date *</label>
                            <Calendar id="joinDate" showIcon dateFormat="yy-mm-dd" value={formData.joinDate} onChange={(e) => handleChange('joinDate', e.value)} required />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="status" className="font-medium text-900">Status *</label>
                            <Dropdown id="status" options={statusOptions} value={formData.status} onChange={(e) => handleChange('status', e.value)} placeholder="Select Status" required />
                        </div>

                        {/* Additional Info */}
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="occupation" className="font-medium text-900">Occupation *</label>
                            <InputText id="occupation" type="text" value={formData.occupation} onChange={(e) => handleChange('occupation', e.target.value)} required />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="familyMembers" className="font-medium text-900">Family Members *</label>
                            <InputText id="familyMembers" type="text" value={formData.familyMembers} onChange={(e) => handleChange('familyMembers', e.target.value)} required />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="emergencyName" className="font-medium text-900">Emergency Contact Name </label>
                            <InputText id="emergencyName" type="text" value={formData.emergencyName} onChange={(e) => handleChange('emergencyName', e.target.value)} />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label htmlFor="emergencyNumber" className="font-medium text-900">Emergency Contact Number </label>
                            <InputText id="emergencyNumber" type="text" value={formData.emergencyNumber} onChange={(e) => handleChange('emergencyNumber', e.target.value)} />
                        </div>
                        <div className="field mb-4 col-12">
                            <label htmlFor="notes" className="font-medium text-900">Notes</label>
                            <InputTextarea id="notes" rows={3} value={formData.notes} onChange={(e) => handleChange('notes', e.target.value)} />
                        </div>

                        <div className="col-12">
                            <Button label="Create User" className="w-auto mt-3" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCreate;
