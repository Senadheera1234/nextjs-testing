'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { classNames } from 'primereact/utils';

const Login = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

    return (
        <React.Fragment>
            <div
                className={classNames('login-body', 'flex', 'min-h-screen', {
                    'layout-light': layoutConfig.colorScheme === 'light',
                    'layout-dark': layoutConfig.colorScheme === 'dark'
                })}
            >
                {' '}
                <div className="login-image w-6 hidden h-screen md:block" style={{ maxWidth: '490px' }}>
                    <img src={`/layout/images/pages/login-${layoutConfig.colorScheme === 'dark' ? 'ondark' : 'onlight'}.png`} alt="atlantis" className="h-screen w-full" />
                </div>
                <div className="login-panel w-full" style={{ background: 'var(--surface-ground)' }}>
                    <div
                        className="p-fluid min-h-screen bg-auto md:bg-contain bg-no-repeat text-center w-full flex align-items-center md:align-items-start justify-content-center flex-column bg-auto md:bg-contain bg-no-repeat"
                        style={{ padding: '20% 10% 20% 10%', background: 'var(--exception-pages-image)' }}
                    >
                        <div className="flex flex-column">
                            <div className="flex  align-items-center mb-6 logo-container">
                                <img src={`/layout/images/logo/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'light'}.png`} className="login-logo" style={{ width: '45px' }} alt="logo" />
                                <img src={`/layout/images/logo/appname-${layoutConfig.colorScheme === 'light' ? 'dark' : 'light'}.png`} className="login-appname ml-3" style={{ width: '100px' }} alt="appname" />
                            </div>
                            <div className="form-container">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-envelope"></i>
                                    <InputText type="text" placeholder="Email" className="block mb-3" style={{ maxWidth: '320px', minWidth: '270px' }} />
                                </span>
                                <span className="p-input-icon-left">
                                    <i className="pi pi-key"></i>
                                    <InputText type="password" placeholder="Password" className="block mb-3" style={{ maxWidth: '320px', minWidth: '270px' }} />
                                </span>
                                <a href="#" className="flex text-color-secondary mb-4 text-sm">
                                    Forgot your password?
                                </a>
                            </div>
                            <div className="button-container">
                                <Button type="button" onClick={() => router.push('/')} className="block" style={{ maxWidth: '320px', marginBottom: '32px' }}>
                                    Login
                                </Button>
                                <span className="flex text-sm text-color-secondary">
                                    Don’t have an account?<a className="cursor-pointer ml-1">Sign-up here</a>
                                </span>
                            </div>
                        </div>

                        <div className="login-footer flex align-items-center absolute" style={{ bottom: '75px' }}>
                            <div className="flex align-items-center login-footer-logo-container pr-4 mr-4 border-right-1 surface-border">
                                <img src="/layout/images/logo/logo-gray.png" className="login-footer-logo" style={{ width: '22px' }} alt="logo" />
                                <img src="/layout/images/logo/appname-gray.png" className="login-footer-appname ml-2" style={{ width: '45px' }} alt="appname" />
                            </div>
                            <span className="text-sm text-color-secondary mr-3">Copyright 2023</span>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;
