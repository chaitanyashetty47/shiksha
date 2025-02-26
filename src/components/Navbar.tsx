'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun, PlusCircle } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Shiksha Books
        </Link>
        
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <Link href="/books/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Book
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
} 