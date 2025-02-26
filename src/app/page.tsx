import { BookList } from '@/components/BookList'
import { Filters } from '@/components/Filters'
import { prisma } from '@/lib/prisma'
import { Suspense } from 'react'

interface HomeProps {
  searchParams: {
    genre?: string
    minRating?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const { genre, minRating, sortBy = 'title', sortOrder = 'asc' } = searchParams

  const books = await prisma.book.findMany({
    where: {
      ...(genre && genre !== 'All' && { genre }),
      ...(minRating && { rating: { gte: parseFloat(minRating) } }),
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      metadata: true,
    },
  })

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Shiksha Book Store
        </h1>
        <p className="text-muted-foreground">
          Discover our collection of {books.length} books
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Suspense fallback={<div className="h-[400px] rounded-lg bg-muted animate-pulse" />}>
            <Filters />
          </Suspense>
        </div>
        <div className="lg:col-span-3">
          <BookList books={books} />
        </div>
      </div>
    </main>
  )
}
