import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { StarIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface BookPageProps {
  params: {
    id: string
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const book = await prisma.book.findUnique({
    where: { id: params.id },
    include: { metadata: true },
  })

  if (!book) {
    notFound()
  }

  if (!book.metadata) {
    return <div>Book metadata not found</div>
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-[2/3] bg-muted rounded-lg" />
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{book.title}</h1>
              <p className="text-lg text-muted-foreground">by {book.author}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <Badge>{book.genre}</Badge>
              <div className="flex items-center gap-1">
                <StarIcon className="w-5 h-5 text-yellow-400" />
                <span>{book.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="prose dark:prose-invert">
              <p>{book.description}</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Pages</p>
                <p className="font-medium">{book.metadata.pages}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Edition</p>
                <p className="font-medium">{book.metadata.edition}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stock</p>
                <p className="font-medium">{book.metadata.stockLeft}</p>
              </div>
            </div>
            
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold">
                ${(book.metadata.price * (1 - book.metadata.discount / 100)).toFixed(2)}
              </p>
              {book.metadata.discount > 0 && (
                <p className="text-lg text-muted-foreground line-through">
                  ${book.metadata.price.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 