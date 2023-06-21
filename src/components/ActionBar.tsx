import styles from '@/styles/ActionBar.module.scss'
import DatePicker from './DatePicker'
import FilterPicker from './FilterPicker'

const ActionBar = ({
  handleSearch,
  limit,
  setLimit,
  selectedDate,
  setSelectedDate,
}: {
  handleSearch: () => void
  limit: number
  setLimit: (value: number) => void
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}) => {
  return (
    <div className={styles.actionContainer}>
      <DatePicker
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />

      <div className={styles.divider} />

      <FilterPicker limit={limit} setLimit={setLimit} />

      <button className={styles.searchButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  )
}

export default ActionBar
