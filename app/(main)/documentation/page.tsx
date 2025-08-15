import React from 'react';

const Documentation = () => {
    return (
        <div className="card">
            <h2>Documentation</h2>
            <h4>Getting Started</h4>
            <p>
                Atlantis is an application template for React based on the popular{' '}
                <a href="https://nextjs.org/" className="font-medium hover:underline text-primary">
                    Next.js
                </a>{' '}
                framework with new{' '}
                <a href="https://nextjs.org/docs/app" className="font-medium hover:underline text-primary">
                    App Router
                </a>
                . Current versions are Next v13, React v18, Typescript with PrimeReact V10.
            </p>
            <p>To get started, extract the contents of the zip file, cd to the directory and install the dependencies with npm or yarn.</p>
            <pre className="app-code">
                <code>{`"npm install" or "yarn"`}</code>
            </pre>

            <p>
                Next step is running the application using the start script and navigate to <b>http://localhost:3000/</b> to view the application. That is it, you may now start with the development of your application using the Atlantis template.
            </p>

            <pre className="app-code">
                <code>{`"npm run dev" or "yarn dev"`}</code>
            </pre>

            <h5>Dependencies</h5>
            <p>Dependencies of Atlantis are listed below and needs to be defined at package.json.</p>

            <pre className="app-code">
                <code>
                    {`"primereact": "^10.2.1",                    //required: PrimeReact components
"primeicons": "^6.0.1",                    //required: Icons
"                     //required: Utility CSS classes`}
                </code>
            </pre>

            <h5>Structure</h5>
            <p>Atlantis consists of a couple folders, demos and core has been separated so that you can easily remove what is not necessary for your application.</p>
            <p>
                There are two{' '}
                <a href="https://nextjs.org/docs/app/building-your-application/routing/route-groups" className="font-medium hover:underline text-primary">
                    root groups
                </a>{' '}
                under the app folder; <span className="text-primary font-medium">{`(main)`}</span> represents the pages that reside in the main dashboard layout whereas <span className="text-primary font-medium">{`(full-page)`}</span> groups the
                pages with full page content such as landing page or a login page.
            </p>
            <ul className="line-height-3">
                <li>
                    <span className="text-primary font-medium">layout</span>: Main layout files, needs to be present
                </li>
                <li>
                    <span className="text-primary font-medium">demo</span>: Contains demo related utilities and helpers
                </li>
                <li>
                    <span className="text-primary font-medium">app</span>: Demo pages
                </li>
                <li>
                    <span className="text-primary font-medium">public/demo</span>: Assets used in demos
                </li>
                <li>
                    <span className="text-primary font-medium">public/layout</span>: Assets used in layout such as logo
                </li>
                <li>
                    <span className="text-primary font-medium">styles/demo</span>: CSS files only used in demos
                </li>
                <li>
                    <span className="text-primary font-medium">styles/layout</span>: SCSS files of the core layout
                </li>
            </ul>

            <h5>Root Groups</h5>
            <p>
                Root Layout is the main of the application and it is defined at <span className="text-primary font-medium">app/layout.tsx</span> file. It contains the style imports and layout context provider.
            </p>
            <pre className="app-code">
                <code>
                    {`"use client"
import { LayoutProvider } from "../layout/context/layoutcontext";
import { PrimeReactProvider } from "primereact/api";

import '../styles/layout/layout.scss';
...
import 'primereact/resources/primereact.css';
import '../styles/demo/Demos.scss';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          id="theme-link"
          href={\`/theme/theme-light/blue/theme.css\`}
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <PrimeReactProvider>
            <LayoutProvider>{children}</LayoutProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
`}
                </code>
            </pre>
            <p>
                The pages that are using the main dashboard layout need to be defined under the <span className="text-primary font-medium">app/{'(main)'}/</span> folder. Those pages use the{' '}
                <span className="text-primary font-medium">app/{'(main)'}/layout.tsx</span> as the root layout.
            </p>
            <pre className="app-code">
                <code>
                    {`import { Metadata } from "next";
import Layout from '../../layout/layout';
interface MainLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "PrimeReact Atlantis",
    ...
  };

export default function MainLayout({ children }: MainLayoutProps) {
    return <Layout>{children}</Layout>;
}
`}
                </code>
            </pre>
            <p>
                Only the full page content pages are required to be defined under the <span className="text-primary font-medium">app/{'(full-page)'}/</span> folder since they are outside of the dashboard layout. Those pages use the{' '}
                <span className="text-primary font-medium">app/{'(full-page)'}/layout.tsx</span> as the root layout.
            </p>
            <pre className="app-code">
                <code>
                    {`import { Metadata } from "next";
import AppConfig from '../../layout/AppConfig';
import React from 'react';

interface FullPageLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "PrimeReact Atlantis",
    ...
};

export default function FullPageLayout({ children }: FullPageLayoutProps) {
    return (
        <React.Fragment>
            {children}
            <AppConfig minimal />
        </React.Fragment>
    );
}

`}
                </code>
            </pre>

            <h5>Default Configuration</h5>
            <p>
                Initial layout configuration can be defined at the <span className="text-primary font-medium">layout/context/layoutcontext.js</span> file, this step is optional and only necessary when customizing the defaults.
            </p>

            <pre className="app-code">
                <code>
                    {`"use client"
import React, { useState } from 'react';
import Head from 'next/head';

export const LayoutContext = React.createContext();

export const LayoutProvider = (props) => {
    const [breadcrumbs, setBreadcrumbs] = useState({});
    const [layoutConfig, setLayoutConfig] = useState({
        ripple: false,                      //toggles ripple on and off
        inputStyle: 'outlined',             //default style for input elements
        menuMode: 'static',                 //layout mode of the menu, valid values are "static", "overlay", "slim", "compact", "reveal", "drawer" and "horizontal"
        colorScheme: 'dark',               //color scheme of the template, valid values are "light", "dim" and "dark"
        theme: 'magenta',                      //default component theme for PrimeNG, see theme section for available values  
        scale: 14                           //size of the body font size to scale the whole application
    });
}`}
                </code>
            </pre>

            <h5>Menu</h5>
            <p>
                Menu is a separate component defined in <span className="text-primary font-medium">layout/AppMenu.js</span> file. In order to define the menuitems, navigate to this file and define your own model as a nested structure.
            </p>

            <pre className="app-code">
                <code>
                    {`import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';

const AppMenu = () => {
    const model = [
        {
            label: 'Dashboards',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'E-Commerce',
                    icon: 'pi pi-fw pi-home',
                    to: '/'
                },
              
            ]
        },
            //...
        ];
}`}
                </code>
            </pre>
            <h5>Breadcrumb</h5>
            <p>The Breadcrumb component at the topbar section is dynamic and generates the current route information from the rendered menu items.</p>

            <h4>Theme</h4>
            <p>
                Atlantis provides 16 PrimeReact themes out of the box. Setup of a theme is simple by including the CSS of the theme to your bundle that are located inside <span className="text-primary font-medium">public/theme/</span>
                folder such as <span className="text-primary font-medium">public/theme/theme-light/blue/theme.css</span>.
            </p>

            <ul className="pl-5 line-height-3">
                <li>blue</li>
                <li>green</li>
                <li>indigo</li>
                <li>lightgreen</li>
                <li>orange</li>
                <li>pink</li>
                <li>purple</li>
                <li>teal</li>
            </ul>

            <p>A custom theme can be developed by the following steps.</p>
            <ul>
                <li className="line-height-4">Choose a custom theme name such as &ldquo;mytheme&ldquo;.</li>
                <li className="line-height-4">
                    Create a folder named &ldquo;mytheme&ldquo; under <span className="font-semibold">theme/theme-light/</span> folder.
                </li>
                <li className="line-height-4">Create a file such as theme.scss inside your &ldquo;mytheme&ldquo; folder.</li>
                <li className="line-height-4">Define the variables listed below in your file and import the dependencies.</li>
                <li className="line-height-4">Include the theme.scss to your application.</li>
            </ul>

            <p>Here are the variables required to create a theme.</p>
            <pre className="app-code">
                <code>
                    {`$primaryColor: #3B82F6 !default;
$primaryLightColor: #BFDBFE !default;
$primaryDarkColor: #2563eb !default;
$primaryDarkerColor: #1D4ED8 !default;
$primaryTextColor: #ffffff !default;
$primary500:#3B82F6 !default;

$highlightBg: #EFF6FF !default;
$highlightTextColor: $primaryDarkerColor !default;

@import '../_variables';
@import '../../theme-base/_components';
@import '../_extensions';`}
                </code>
            </pre>

            <h5>Theme Switcher</h5>
            <p>
                Dynamic theming is built-in to the template and implemented by including the theme via a link tag instead of bundling the theme along with a configurator component to switch it. In order to switch your theme dynamically as well, it
                needs to be compiled to css. An example sass command to compile the css would be;
            </p>

            <pre className="app-code">
                <code>{`sass --update public/theme/mytheme/theme.scss:public/theme/mytheme/theme.css`}</code>
            </pre>

            <p className="text-sm">*Note: The sass command above is supported by Dart Sass. Please use Dart Sass instead of Ruby Sass.</p>

            <h4>Figma Design</h4>
            <p>
                Figma design file of Atlantis is available at no extra cost at PrimeStore. The download dialog both displays the figma files and source code that are made accessible. The design file is{' '}
                <a href="https://www.figma.com/file/lKooXEoqqWz7PBYwJ7B8QS/Preview-%7C-Atlantis-2022?node-id=271%3A12531" className="font-medium text-primary hover:underline">
                    accessible
                </a>{' '}
                in preview mode for trial purposes.
            </p>

            <p>
                Please note that Atlantis design file mostly covers the layout and does not include the PrimeReact UI components design which is covered by the official{' '}
                <a href="https://www.primefaces.org/primereact/uikit" className="font-medium text-primary hover:underline">
                    UI Kit
                </a>{' '}
                that requires a separate license and purchase.
            </p>
            <h4>Migration</h4>
            <p>
                Every important change is included in <b>CHANGELOG.md</b> file at the root folder of the distribution along with the instructions to update. Migration process mainly requires updating the{' '}
                <span className="text-primary font-medium">layout</span> folder and <span className="text-primary font-medium">styles/layout</span> folders.
            </p>
        </div>
    );
};

export default Documentation;
