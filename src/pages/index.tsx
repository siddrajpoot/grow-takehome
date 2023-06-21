/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styles from '@/styles/index.module.scss'
import { type Article, type WikiData } from '@/types'
import { getFormattedDate } from '@/utils'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import ActionBar from '@/components/ActionBar'
import Results from '@/components/Results'

const YESTERDAY_DATE = new Date(new Date().setDate(new Date().getDate() - 1))

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [limit, setLimit] = useState(100)
  const [selectedDate, setSelectedDate] = useState(YESTERDAY_DATE)
  const [shouldFetch, setShouldFetch] = useState(true)
  const [data, setData] = useState<Article[] | null>(null)

  useEffect(() => {
    if (shouldFetch) {
      const { year, month, day } = getFormattedDate(selectedDate)

      setIsLoading(true)

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
            console.log('test')
          }
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          setShouldFetch(false)
          setIsLoading(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetch])

  return (
    <>
      <Head>
        <title>Top Wiki Articles</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.header} />

        <h1 className={styles.title}>Top Wikipedia Articles</h1>

        <ActionBar
          handleSearch={() => setShouldFetch(true)}
          limit={limit}
          setLimit={(value: number) => setLimit(value)}
          selectedDate={selectedDate}
          setSelectedDate={(date: Date) => setSelectedDate(date)}
        />

        <Results articles={data} isLoading={isLoading} />
      </main>
    </>
  )
}
