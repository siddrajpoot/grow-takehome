const padBy2 = (num: number) => {
  return num.toString().padStart(2, '0')
}

export const getFormattedDate = (date: Date) => {
  const year = date.getFullYear()
  const month = padBy2(date.getMonth() + 1)
  const day = padBy2(date.getDate())

  return { year, month, day }
}

export const formatArticleTitle = (title: string) => {
  return title.replace(/_/g, ' ')
}
