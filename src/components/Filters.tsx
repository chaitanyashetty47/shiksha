'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const GENRES = [
  'All',
  'Classic',
  'Fiction',
  'Fantasy',
  'Dystopian',
  'Thriller',
  'Science Fiction',
  'Historical Fiction',
  'Post-Apocalyptic',
  'Memoir',
  'Non-fiction',
]

const SORT_OPTIONS = [
  { label: 'Title (A-Z)', value: 'title.asc' },
  { label: 'Title (Z-A)', value: 'title.desc' },
  { label: 'Author (A-Z)', value: 'author.asc' },
  { label: 'Author (Z-A)', value: 'author.desc' },
  { label: 'Rating (High-Low)', value: 'rating.desc' },
  { label: 'Rating (Low-High)', value: 'rating.asc' },
  { label: 'Year (New-Old)', value: 'publicationYear.desc' },
  { label: 'Year (Old-New)', value: 'publicationYear.asc' },
]

export function Filters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const genre = searchParams.get('genre') || 'All'
  const minRating = Number(searchParams.get('minRating')) || 0
  const sortBy = searchParams.get('sortBy') || 'title'
  const sortOrder = searchParams.get('sortOrder') || 'asc'
  const sort = `${sortBy}.${sortOrder}`

  // Add local state for rating
  const [localRating, setLocalRating] = useState(minRating)

  // Sync local state with URL params
  useEffect(() => {
    setLocalRating(minRating)
  }, [minRating])

  const createQueryString = (params: Record<string, string | number | null>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key)
      } else {
        newSearchParams.set(key, String(value))
      }
    })

    return newSearchParams.toString()
  }

  const handleRatingChange = (value: number[]) => {
    // Update local state immediately
    setLocalRating(value[0])
    
    // Debounce the URL update
    const timeoutId = setTimeout(() => {
      const query = createQueryString({
        minRating: value[0] === 0 ? null : value[0],
      })
      router.push(`${pathname}?${query}`, { scroll: false })
    }, 100)

    return () => clearTimeout(timeoutId)
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg sticky top-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Genre</label>
        <Select
          value={genre}
          onValueChange={(value) => {
            const query = createQueryString({
              genre: value === 'All' ? null : value,
            })
            router.push(`${pathname}?${query}`)
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            {GENRES.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Minimum Rating</label>
        <div className="pt-2">
          <Slider
            value={[localRating]}
            min={0}
            max={5}
            step={0.5}
            onValueChange={handleRatingChange}
            className="w-full"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {localRating.toFixed(1)} out of 5
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Sort By</label>
        <Select
          value={sort}
          onValueChange={(value) => {
            const [field, order] = value.split('.')
            const query = createQueryString({
              sortBy: field,
              sortOrder: order,
            })
            router.push(`${pathname}?${query}`)
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue>
              {SORT_OPTIONS.find(option => option.value === sort)?.label || 'Sort by...'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          router.push(pathname)
        }}
      >
        Reset Filters
      </Button>
    </div>
  )
} 