'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import { MemberService, Member } from '../../../../../../demo/service/MemberService';

export default function List() {
    const [members, setMembers] = useState<Member[]>([]);
    const router = useRouter();

    useEffect(() => {
        MemberService.getMembers().then((data) => setMembers(data));
    }, []);

    const imageBodyTemplate = (member: Member) => (
        <img
            alt={member.name}
            src={`/demo/images/avatar/${member.image}`}
            className="w-2rem h-2rem"
        />
    );

    const header = (
        <div className="flex justify-content-end">
            <Button
                type="button"
                icon="pi pi-user-plus"
                label="Add New"
                onClick={() => router.push('/apps/user-management/create')}
            />
        </div>
    );

    return (
        <div className="card">
            <DataTable value={members} header={header} responsiveLayout="scroll">
                <Column field="id" header="ID" style={{ width: '20%' }} />
                <Column field="name" header="Name" style={{ width: '40%' }} />
                <Column header="Avatar" body={imageBodyTemplate} style={{ width: '40%' }} />
            </DataTable>
        </div>
    );
}
