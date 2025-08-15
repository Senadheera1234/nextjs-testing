'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Ripple } from 'primereact/ripple';
import { InputText } from 'primereact/inputtext';
import { StyleClass } from 'primereact/styleclass';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { PrimeReactContext } from 'primereact/api';
import { classNames } from 'primereact/utils';

// Local type to avoid the missing export issue
type Scheme = 'light' | 'dark';

export default function LandingPage() {
  const { layoutConfig, setLayoutConfig } = useContext(LayoutContext);
  const { changeTheme } = useContext(PrimeReactContext);
  const router = useRouter();

  const homeRef = useRef<HTMLDivElement | null>(null);
  const homeButtonRef = useRef<HTMLAnchorElement | null>(null);
  const timesRef = useRef<HTMLAnchorElement | null>(null);
  const menu = useRef<HTMLUListElement | null>(null);
  const meetButtonRef = useRef<HTMLAnchorElement | null>(null);
  const meetRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const pricingRef = useRef<HTMLDivElement | null>(null);
  const pricingButtonRef = useRef<HTMLAnchorElement | null>(null);
  const buyRef = useRef<HTMLAnchorElement | null>(null);
  const featuresButtonRef = useRef<HTMLAnchorElement | null>(null);

  const goHome = () => router.push('/');

  const scrollToElement = (el: React.MutableRefObject<HTMLElement | null>) => {
    setTimeout(() => el.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' }), 200);
  };

  const changeColorScheme = (colorScheme: Scheme) => {
    changeTheme?.(layoutConfig.colorScheme, colorScheme, 'theme-link', () => {
      setLayoutConfig(prev => ({
        ...prev,
        colorScheme,
        menuTheme: colorScheme === 'dark' ? 'dark' : 'light'
      }));
    });
  };

  useEffect(() => {
    changeColorScheme('light');
    setLayoutConfig(prev => ({ ...prev, menuTheme: 'light' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={homeRef} className="landing-container" style={{ background: '#100e23' }}>
      {/* --- rest of your JSX unchanged --- */}
    </div>
  );
}
