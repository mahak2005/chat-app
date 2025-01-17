"use client"  // Ensures this component is client-side rendered

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SocketProvider } from '@/app/context/SocketProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            {/* This SocketProvider will provide the state variable to all the children */}
            <SocketProvider>
                <body className={inter.className}>{children}</body>
            </SocketProvider>
        </html>
    )
}
