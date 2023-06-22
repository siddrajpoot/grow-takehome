/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react'
import useSWR from 'swr'
import { getFormattedDate } from './utils'
import { type WikiData } from './types'

async function fetcher<JSON>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    throw new Error('Network error')
  }

  return res.json() as Promise<JSON>
}

const createFetchUrl = (date: Date) => {
  const { year, month, day } = getFormattedDate(date)
  return `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}`
}

export function useFetch(date: Date, limit: number) {
  const [refetchKey, setRefetchKey] = useState(0)

  const memoizedDate = useMemo(() => date, [refetchKey])
  const memoizedLimit = useMemo(() => limit, [refetchKey])

  const { data, error, isValidating } = useSWR<WikiData, Error>(
    createFetchUrl(memoizedDate),
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: true,
    }
  )

  const slicedData = data?.items?.length
    ? data.items[0].articles.slice(0, memoizedLimit)
    : null

  const fetchData = () => {
    setRefetchKey(prev => prev + 1)
  }

  return {
    data: slicedData,
    isLoading: isValidating,
    error,
    fetchData,
  }
}
