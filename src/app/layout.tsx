import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import Nav from '@/components/Nav';

import { Web3Modal } from '@/context/Web3Modal';
import { AppContext } from '@/context/AppContext';

import './globals.css';

const openSans = Open_Sans({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata: Metadata = {
    title: 'Airdrop Tracker',
    description: 'An Airdrop Tracker',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <AppContext>
                <Web3Modal>
                    <body className={openSans.className}>
                        <Nav />
                        {children}
                    </body>
                </Web3Modal>
            </AppContext>
        </html>
    );
}
