/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styles from '@/styles/index.module.scss'
import calIcon from 'public/cal.svg'
import arrowIcon from '/public/arrow.svg'
import { Group, Popover } from '@mantine/core'
import Image from 'next/image'
import { useState } from 'react'
import { DatePicker as Picker } from '@mantine/dates'

const DatePicker = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}) => {
  const [opened, setOpened] = useState(false)

  const handleClick = (date: Date) => {
    setSelectedDate(date)
    setOpened(o => !o)
  }

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position='bottom-start'
      offset={{
        mainAxis: 12,
      }}
      radius={24}
    >
      <Popover.Target>
        <div
          className={`${styles.picker} ${styles.datePicker}`}
          onClick={() => setOpened(o => !o)}
        >
          <div className={styles.pickerIcon}>
            <Image src={calIcon} alt='calendar icon' />
          </div>

          <div className={styles.textContainer}>
            <div className={styles.labelText}>
              Date <Image src={arrowIcon} alt='arrow icon' />
            </div>
            <p className={styles.dateText}></p>
          </div>
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Group position='center'>
          <Picker value={selectedDate} onChange={handleClick} />
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}

export default DatePicker
