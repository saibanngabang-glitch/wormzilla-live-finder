import './globals.css';
import type { Metadata } from 'next';
export const metadata:Metadata={title:'Wormzilla Live Finder',description:'Find verified Wormzilla livestreams across supported platforms',viewport:'width=device-width,initial-scale=1'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
