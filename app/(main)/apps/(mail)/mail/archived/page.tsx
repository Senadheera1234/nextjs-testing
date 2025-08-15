'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Toast } from 'primereact/toast';
import { MailContext } from '../../../../../../demo/components/apps/mail/context/mailcontext';
import AppMailTable from '../../../../../../demo/components/apps/mail/AppMailTable';

export default function MailArchived() {
    const [archivedMails, setArchivedMails] = useState<any[]>([]);
    const { mails } = useContext(MailContext);

    useEffect(() => {
        const _mails = mails.filter((d: any) => d.archived);
        setArchivedMails(_mails);
    }, [mails]);

    return (
        <>
            <Toast />
            <AppMailTable mails={archivedMails} />
        </>
    );
}
