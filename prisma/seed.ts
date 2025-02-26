import { PrismaClient } from '@prisma/client'
import booksData from '../books.json'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')
  
  for (const book of booksData) {
    const { metadata, ...bookData } = book
    
    await prisma.book.create({
      data: {
        id: book.id,
        title: book.title,
        author: book.author,
        publicationYear: book.publicationYear,
        genre: book.genre,
        rating: book.rating,
        description: book.description,
        metadata: {
          create: {
            pages: metadata.pages,
            stockLeft: metadata.stockLeft,
            price: metadata.price,
            discount: metadata.discount,
            edition: metadata.edition,
          },
        },
      },
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 