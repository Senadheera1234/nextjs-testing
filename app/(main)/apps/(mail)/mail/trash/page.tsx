'use client';

import React, { useState, useEffect, useContext } from 'react';
import { MailContext } from '../../../../../../demo/components/apps/mail/context/mailcontext';
import AppMailTable from '../../../../../../demo/components/apps/mail/AppMailTable';

const MailTrash = () => {
    const [trashMails, setTrashMails] = useState<Demo.Mail[]>([]);
    const { mails } = useContext(MailContext);
    useEffect(() => {
        const _mails = mails.filter((d) => d.trash);
        setTrashMails(_mails);
    }, [mails]);

    return (
        <React.Fragment>
            <AppMailTable mails={trashMails} />
        </React.Fragment>
    );
};

export default MailTrash;
