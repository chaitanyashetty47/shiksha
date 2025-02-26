export interface BookMetadata {
  id: string
  pages: number
  stockLeft: number
  price: number
  discount: number
  edition: number
  bookId: string
  createdAt: Date
  updatedAt: Date
}

export interface Book {
  id: string
  title: string
  author: string
  publicationYear: number
  genre: string
  rating: number
  description: string
  metadata: BookMetadata | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateBookInput {
  title: string
  author: string
  publicationYear: number
  genre: string
  rating: number
  description: string
  metadata: {
    pages: number
    stockLeft: number
    price: number
    discount: number
    edition: number
  }
}

// Make all fields from CreateBookInput optional for update operations
export type UpdateBookInput = Partial<CreateBookInput> 