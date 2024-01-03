import Navbar from './components/Navbar'
import './globals.css'

export const metadata = {
  title: 'WikiRocker',
  description: 'WikiRocker is a wiki for rock music.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-slate-800'>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
