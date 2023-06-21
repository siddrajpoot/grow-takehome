import styles from '@/styles/Results.module.scss'
import { type Article } from '@/types'
import { formatArticleTitle } from '@/utils'

import { Pagination, Skeleton } from '@mantine/core'
import { useEffect, useState } from 'react'

const Results = ({
  articles,
  isLoading,
}: {
  articles: Article[] | null
  isLoading: boolean
}) => {
  const [activePage, setPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    setPage(1)
  }, [articles])

  if (!articles?.length) return null

  const totalPages = Math.ceil(articles?.length / ITEMS_PER_PAGE)

  const paginatedArticles = articles.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE
  )

  if (isLoading) {
    return (
      <div className={styles.resultsContainer}>
        <Skeleton height={72} mb={20} radius={12} />
        <Skeleton height={72} mb={20} radius={12} />
        <Skeleton height={72} mb={20} radius={12} />
        <Skeleton height={72} radius={12} />
      </div>
    )
  }

  return (
    <>
      <div className={styles.resultsContainer}>
        <ul className={styles.results}>
          {paginatedArticles?.map(({ article, rank, views }) => (
            <li className={styles.result} key={article}>
              <p className={styles.rank}>{rank}</p>
              <p className={styles.articleTitle}>
                {formatArticleTitle(article)}
              </p>
              <p className={styles.views}>{views.toLocaleString('en-US')}</p>
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        className={styles.pagination}
        classNames={{
          control: styles.paginationItem,
        }}
        value={activePage}
        onChange={setPage}
        total={totalPages}
      />
    </>
  )
}

export default Results