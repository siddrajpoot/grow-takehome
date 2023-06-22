/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styles from '@/styles/Results.module.scss'
import { type Article } from '@/types'
import { formatArticleTitle } from '@/utils'

import { Pagination, Skeleton } from '@mantine/core'
import { useEffect, useState } from 'react'

import pinOutlineIcon from 'public/pin-outline.svg'
import pinFilledIcon from 'public/pin-filled.svg'
import Image from 'next/image'
import useArticles from '@/styles/useArticles'

const Results = ({
  articles,
  isLoading,
  error,
}: {
  articles: Article[] | null
  isLoading: boolean
  error: Error | undefined
}) => {
  const [activePage, setPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    setPage(1)
  }, [articles])

  const { filteredArticles, pinnedArticles, addPin, removePin } =
    useArticles(articles)

  const totalPages = Math.ceil(filteredArticles?.length / ITEMS_PER_PAGE)

  const paginatedArticles = filteredArticles.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE
  )

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error.message}</div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Skeleton height={72} mb={20} radius={12} />
        <Skeleton height={72} mb={20} radius={12} />
        <Skeleton height={72} mb={20} radius={12} />
        <Skeleton height={72} radius={12} />
      </div>
    )
  }

  const renderResults = () => {
    return filteredArticles.length ? (
      <div className={styles.container}>
        <ul className={styles.results}>
          {paginatedArticles?.map(article => renderArticle(article))}
        </ul>
      </div>
    ) : null
  }

  const renderPinned = () => {
    return pinnedArticles.length ? (
      <div className={styles.container}>
        <ul className={styles.results}>
          {pinnedArticles.map(article => renderArticle(article, true))}
        </ul>
      </div>
    ) : null
  }

  const renderArticle = (article: Article, isPinned = false) => {
    return (
      <li className={styles.result} key={article.article}>
        <p className={styles.rank}>{article.rank}</p>
        <p className={styles.articleTitle}>
          {formatArticleTitle(article.article)}
        </p>
        <p className={styles.views}>{article.views.toLocaleString('en-US')}</p>
        <button
          className={styles.pinButton}
          onClick={() =>
            isPinned ? removePin(article.article) : addPin(article.article)
          }
        >
          <Image
            src={isPinned ? pinFilledIcon : pinOutlineIcon}
            alt='pin outline icon'
          />
        </button>
      </li>
    )
  }

  return (
    <>
      {renderPinned()}
      {renderResults()}
      <Pagination
        className={styles.pagination}
        classNames={{
          control: styles.paginationItem,
          dots: styles.paginationDots,
        }}
        value={activePage}
        onChange={setPage}
        total={totalPages}
      />
    </>
  )
}

export default Results
