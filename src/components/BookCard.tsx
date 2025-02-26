import { Book } from '@/types/book'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StarIcon } from 'lucide-react'
import Link from 'next/link'

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const discountedPrice = book.metadata?.price 
    ? book.metadata.price * (1 - (book.metadata.discount || 0) / 100)
    : 0

  return (
    <Link href={`/books/${book.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{book.title}</CardTitle>
              <CardDescription className="text-sm mt-1">
                by {book.author} ({book.publicationYear})
              </CardDescription>
            </div>
            <Badge variant="secondary">{book.genre}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm line-clamp-3 text-muted-foreground">
            {book.description}
          </p>
          <div className="flex items-center mt-4 space-x-1">
            <StarIcon className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="font-medium">{book.rating.toFixed(1)}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm">
            <p>Stock: {book.metadata?.stockLeft || 0}</p>
            {book.metadata?.discount && book.metadata.discount > 0 && (
              <div className="flex items-center space-x-2">
                <span className="line-through text-muted-foreground">
                  ${book.metadata.price.toFixed(2)}
                </span>
                <span className="text-green-600 font-medium">
                  ${discountedPrice.toFixed(2)}
                </span>
              </div>
            )}
            {(!book.metadata?.discount || book.metadata.discount === 0) && book.metadata?.price && (
              <span className="font-medium">${book.metadata.price.toFixed(2)}</span>
            )}
          </div>
          <Badge variant="outline">Edition {book.metadata?.edition || 1}</Badge>
        </CardFooter>
      </Card>
    </Link>
  )
} 