import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import Nav from '@/components/Nav';

import { Web3Modal } from '@/context/Web3Modal';

import './globals.css';

const openSans = Open_Sans({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
    title: 'Airdrop Tracker',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <Web3Modal>
                <body className={openSans.className}>
                    <Nav />
                    {children}
                </body>
            </Web3Modal>
        </html>
    );
}
