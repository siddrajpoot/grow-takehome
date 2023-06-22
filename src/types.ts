export type Article = {
  article: string
  rank: number
  views: number
}

type WikiItem = {
  access: string
  project: string
  articles: Article[]
  day: string
  month: string
  year: string
}

export type WikiData = {
  items: WikiItem[]
}

export type Pin = {
  [key: string]: string
}
