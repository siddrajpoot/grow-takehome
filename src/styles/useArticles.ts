import { type Pin, type Article } from '@/types'
import { useEffect, useState } from 'react'

export default function useArticles(articles: Article[] | null) {
  const [pinned, setPinned] = useState<Pin | null>(null)

  useEffect(() => {
    if (pinned === null && typeof window !== 'undefined') {
      const savedPins = localStorage.getItem('pinnedArticles')
      if (savedPins) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const initialData: Pin = JSON.parse(savedPins)
        setPinned(initialData)
      } else {
        setPinned({})
      }
    }

    if (pinned !== null) {
      localStorage.setItem('pinnedArticles', JSON.stringify(pinned))
    }
  }, [pinned])

  const filteredArticles =
    articles?.filter(article => (pinned ? !pinned[article.article] : true)) ??
    []

  const pinnedArticles =
    articles?.filter(article => (pinned ? pinned[article.article] : false)) ??
    []

  const addPin = (articleTitle: Article['article']) => {
    setPinned(prev => ({
      ...prev,
      [articleTitle]: articleTitle,
    }))
  }

  const removePin = (articleTitle: Article['article']) => {
    setPinned(prev => {
      if (prev) {
        const updated = { ...prev }
        delete updated[articleTitle]
        return updated
      } else {
        return prev
      }
    })
  }

  return {
    filteredArticles,
    pinnedArticles,
    addPin,
    removePin,
  }
}
