import styles from '@/styles/index.module.scss'
import { type Article } from '@/types'
import { formatArticleTitle } from '@/utils'

import { Pagination } from '@mantine/core'
import { useState } from 'react'

const Results = ({ articles }: { articles: Article[] | null }) => {
  const [activePage, setPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  if (!articles?.length) return null

  const totalPages = Math.ceil(articles?.length / ITEMS_PER_PAGE)

  const paginatedArticles = articles.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE
  )

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
