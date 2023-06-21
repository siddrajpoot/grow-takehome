/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import sharedStyles from '@/styles/ActionShared.module.scss'
import styles from '@/styles/DatePicker.module.scss'
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

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

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
          className={`${sharedStyles.picker} ${styles.datePicker} ${
            opened ? sharedStyles.isOpen : ''
          }`}
          onClick={() => setOpened(o => !o)}
        >
          <div className={`${sharedStyles.pickerIcon} ${styles.pickerIcon}`}>
            <Image src={calIcon} alt='calendar icon' />
          </div>

          <div className={styles.textContainer}>
            <div className={sharedStyles.labelText}>
              Date <Image src={arrowIcon} alt='arrow icon' />
            </div>
            <p className={sharedStyles.dateText}>{formattedDate}</p>
          </div>
        </div>
      </Popover.Target>
      <Popover.Dropdown className={styles.datePopover}>
        <Group position='center'>
          <Picker
            value={selectedDate}
            onChange={handleClick}
            maxDate={new Date()}
            className={styles.calender}
            classNames={{
              day: styles.calendarDay,
            }}
          />
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}

export default DatePicker
