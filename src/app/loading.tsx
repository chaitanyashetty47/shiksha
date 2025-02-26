import { BookList } from '@/components/BookList'

export default function Loading() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="space-y-4">
        <div className="h-9 w-64 bg-muted rounded-lg animate-pulse" />
        <div className="h-6 w-48 bg-muted rounded-lg animate-pulse" />
      </div>
      <div className="mt-8">
        <BookList books={[]} isLoading={true} />
      </div>
    </main>
  )
} 