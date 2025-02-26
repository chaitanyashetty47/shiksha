import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-bold">Book Not Found</h2>
        <p className="text-muted-foreground">
          Sorry, we couldn&apos;t find the book you&apos;re looking for.
        </p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </main>
  )
} 