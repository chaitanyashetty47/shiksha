import { prisma } from '@/lib/prisma'
import { UpdateBookInput } from '@/types/book'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: params.id },
      include: { metadata: true },
    })

    if (!book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(book)
  } catch (error) {
    console.error('Error fetching book:', error)
    return NextResponse.json(
      { error: 'Failed to fetch book' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body: UpdateBookInput = await request.json()

    const book = await prisma.book.update({
      where: { id: params.id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.author && { author: body.author }),
        ...(body.publicationYear && { publicationYear: body.publicationYear }),
        ...(body.genre && { genre: body.genre }),
        ...(body.rating && { rating: body.rating }),
        ...(body.description && { description: body.description }),
        ...(body.metadata && {
          metadata: {
            update: body.metadata,
          },
        }),
      },
      include: { metadata: true },
    })

    return NextResponse.json(book)
  } catch (error) {
    console.error('Error updating book:', error)
    return NextResponse.json(
      { error: 'Failed to update book' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.book.delete({
      where: { id: params.id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting book:', error)
    return NextResponse.json(
      { error: 'Failed to delete book' },
      { status: 500 }
    )
  }
} 