/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styles from '@/styles/FilterPicker.module.scss'
import sharedStyles from '@/styles/ActionShared.module.scss'

import { Popover } from '@mantine/core'
import Image from 'next/image'
import { useState } from 'react'
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
        mainAxis: 8,
      }}
      radius={24}
    >
      <Popover.Target>
        <div
          className={`${sharedStyles.picker} ${styles.filterPicker} ${
            opened ? sharedStyles.isOpen : ''
          }`}
          onClick={() => setOpened(o => !o)}
        >
          <div className={`${sharedStyles.pickerIcon} ${styles.pickerIcon}`}>
            <Image src={listIcon} alt='list icon' />
          </div>

          <div className={sharedStyles.textContainer}>
            <div className={sharedStyles.labelText}>
              Num results <Image src={arrowIcon} alt='arrow icon' />
            </div>
            <p className={sharedStyles.dateText}>{limit}</p>
          </div>
        </div>
      </Popover.Target>
      <Popover.Dropdown className={styles.filterPopover}>
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
