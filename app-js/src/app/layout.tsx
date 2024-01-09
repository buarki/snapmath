import type { Metadata } from 'next'
import './globals.css'
import { defaultMetadata } from '@snapmath/metadata'

export const metadata: Metadata = {
  ...defaultMetadata,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='min-h-screen'>
        {children}
        <footer className='flex justify-center mt-1'>
          <p>Made with love by<a target='blank' className='hover:bg-gray-400 p-1' href='https://buarki.com'>buarki.com.</a></p>
        </footer>
      </body>
    </html>
  )
}
