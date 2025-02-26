import { prisma } from '@/lib/prisma'
import { CreateBookInput } from '@/types/book'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const genre = searchParams.get('genre')
    const minRating = searchParams.get('minRating')
    const sortBy = searchParams.get('sortBy')
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc'

    const where = {
      ...(genre && { genre }),
      ...(minRating && { rating: { gte: parseFloat(minRating) } }),
    }

    const orderBy = sortBy ? {
      [sortBy]: sortOrder || 'asc',
    } : undefined

    const books = await prisma.book.findMany({
      where,
      orderBy,
      include: {
        metadata: true,
      },
    })

    return NextResponse.json(books)
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateBookInput = await request.json()

    const book = await prisma.book.create({
      data: {
        title: body.title,
        author: body.author,
        publicationYear: body.publicationYear,
        genre: body.genre,
        rating: body.rating,
        description: body.description,
        metadata: {
          create: body.metadata,
        },
      },
      include: {
        metadata: true,
      },
    })

    return NextResponse.json(book, { status: 201 })
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    )
  }
} 