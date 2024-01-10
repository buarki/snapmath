import type { Metadata } from 'next'
import './globals.css'
import { defaultMetadata } from '@snapmath/metadata'
import { MenuBar } from '@snapmath/components/menu-bar.component'

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
      <body className='min-h-screen flex flex-col'>
        <MenuBar />
        {children}
        <footer className='flex justify-center my-2'>
          <p>Made with love by<a target='blank' className='hover:bg-gray-400 p-1' href='https://buarki.com'>buarki.com.</a></p>
        </footer>
      </body>
    </html>
  )
}
