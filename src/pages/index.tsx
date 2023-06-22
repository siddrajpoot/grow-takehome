/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styles from '@/styles/index.module.scss'
import { type Article, type WikiData } from '@/types'
import { getFormattedDate } from '@/utils'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import ActionBar from '@/components/ActionBar'
import Results from '@/components/Results'
import { useFetch } from '@/useFetch'

const YESTERDAY_DATE = new Date(new Date().setDate(new Date().getDate() - 1))

export default function Home() {
  const [limit, setLimit] = useState(100)
  const [selectedDate, setSelectedDate] = useState(YESTERDAY_DATE)

  const { data, isLoading, error, fetchData } = useFetch(selectedDate, limit)

  return (
    <>
      <Head>
        <title>Top Wiki Articles</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.header} />

        <h1 className={styles.title}>Top Wikipedia Articles</h1>

        <ActionBar
          handleSearch={() => fetchData()}
          limit={limit}
          setLimit={(value: number) => setLimit(value)}
          selectedDate={selectedDate}
          setSelectedDate={(date: Date) => setSelectedDate(date)}
        />

        <Results articles={data} isLoading={isLoading} error={error} />
      </main>
    </>
  )
}
