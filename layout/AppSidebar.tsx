'use client';

import Link from 'next/link';
import { useContext, useEffect } from 'react';
import AppMenu from './AppMenu';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { classNames } from 'primereact/utils';

const AppSidebar = (props: { sidebarRef: React.RefObject<HTMLDivElement> }) => {
    const { setLayoutState, layoutConfig, layoutState } = useContext(LayoutContext);
    const anchor = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            anchored: !prevLayoutState.anchored
        }));
    };

    useEffect(() => {
        return () => {
            resetOverlay();
        };
    }, []);

    const resetOverlay = () => {
        if (layoutState.overlayMenuActive) {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                overlayMenuActive: false
            }));
        }
    };

    let timeout = null;

    const onMouseEnter = () => {
        if (!layoutState.anchored) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                sidebarActive: true
            }));
        }
    };

    const onMouseLeave = () => {
        if (!layoutState.anchored) {
            if (!timeout) {
                timeout = setTimeout(
                    () =>
                        setLayoutState((prevLayoutState) => ({
                            ...prevLayoutState,
                            sidebarActive: false
                        })),
                    300
                );
            }
        }
    };

    return (
        <>
            <div ref={props.sidebarRef} className="layout-sidebar" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <div className="sidebar-header">
                    <Link href="/" className="app-logo">
                        {/* Use a single custom logo for both small and normal modes */}
                        <div className="h-2rem flex align-items-center">
                            {/* The logo must be placed in public/layout/images/paththinigama_logo.png */}
                            <img
                                src="/layout/images/paththinigama_logo.png"
                                alt="Paththinigama logo"
                                className="h-2rem"
                            />
                        </div>
                    </Link>
                    <button className="layout-sidebar-anchor p-link z-2" type="button" onClick={anchor}></button>
                </div>
                <div className="layout-menu-container">
                    <MenuProvider>
                        <AppMenu />
                    </MenuProvider>
                </div>
            </div>
        </>
    );
};

export default AppSidebar;
