/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styles from '@/styles/index.module.scss'
import { type Article, type WikiData } from '@/types'
import { formatArticleTitle, getFormattedDate } from '@/utils'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import calIcon from 'public/cal.svg'
import listIcon from 'public/list.svg'
import arrowIcon from '/public/arrow.svg'
import { ActionIcon, Pagination } from '@mantine/core'

const DatePicker = () => {
  return (
    <div className={`${styles.picker} ${styles.datePicker}`}>
      <div className={styles.pickerIcon}>
        <Image src={calIcon} alt='calendar icon' />
      </div>

      <div className={styles.textContainer}>
        <div className={styles.labelText}>
          Date <Image src={arrowIcon} alt='arrow icon' />
        </div>
        <p className={styles.dateText}>January 12, 2023</p>
      </div>
    </div>
  )
}

const FilterPicker = () => {
  return (
    <div className={`${styles.picker} ${styles.filterPicker}`}>
      <div className={styles.pickerIcon}>
        <Image src={listIcon} alt='list icon' />
      </div>

      <div className={styles.textContainer}>
        <div className={styles.labelText}>
          Num results <Image src={arrowIcon} alt='arrow icon' />
        </div>
        <p className={styles.dateText}>100</p>
      </div>
    </div>
  )
}

const ActionBar = () => {
  return (
    <div className={styles.actionContainer}>
      <DatePicker />

      <div className={styles.divider} />

      <FilterPicker />

      <button className={styles.searchButton}>Search</button>
    </div>
  )
}

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

export default function Home() {
  const [limit, setLimit] = useState(95)

  const [data, setData] = useState<Article[] | null>(null)
  useEffect(() => {
    const yesterdayDate = new Date(new Date().setDate(new Date().getDate() - 1))
    const { year, month, day } = getFormattedDate(yesterdayDate)

    fetch(
      `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}`
    )
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw res
      })
      .then((wikiData: WikiData) => {
        if (wikiData?.items[0]) {
          setData(wikiData.items[0].articles.slice(0, limit))
        }
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div className={styles.header} />

        <h1 className={styles.title}>Top Wikipedia Articles</h1>

        <ActionBar />

        <Results articles={data} />
      </main>
    </>
  )
}
