import './globals.css'
import LeftSidebar from './ui/left-sidebar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex justify-center min-h-screen bg-light bg-dark text-primary-light text-primary-dark transition-colors">
          <div className="flex w-full max-w-7xl h-screen">
            <div className="w-64 h-screen overflow-y-auto border-r border-gray-700">
              <LeftSidebar />
            </div>
            <main className="flex-1 p-8 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
