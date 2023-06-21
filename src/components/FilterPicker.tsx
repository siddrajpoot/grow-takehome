/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styles from '@/styles/index.module.scss'

import { Popover } from '@mantine/core'
import Image from 'next/image'
import { useState } from 'react'
import calIcon from 'public/cal.svg'
import listIcon from 'public/list.svg'
import arrowIcon from '/public/arrow.svg'

const RESULTS_FILTER_VALUES = [25, 50, 75, 100, 200]

const FilterPicker = ({
  limit,
  setLimit,
}: {
  limit: number
  setLimit: (number: number) => void
}) => {
  const [opened, setOpened] = useState(false)
  const handleClick = (value: number) => {
    setOpened(o => !o)
    setLimit(value)
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
          className={`${styles.picker} ${styles.filterPicker}`}
          onClick={() => setOpened(o => !o)}
        >
          <div className={styles.pickerIcon}>
            <Image src={listIcon} alt='list icon' />
          </div>

          <div className={styles.textContainer}>
            <div className={styles.labelText}>
              Num results <Image src={arrowIcon} alt='arrow icon' />
            </div>
            <p className={styles.dateText}>{limit}</p>
          </div>
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        {RESULTS_FILTER_VALUES.map(value => (
          <p key={value} onClick={() => handleClick(value)}>
            {value}
          </p>
        ))}
      </Popover.Dropdown>
    </Popover>
  )
}

export default FilterPicker
