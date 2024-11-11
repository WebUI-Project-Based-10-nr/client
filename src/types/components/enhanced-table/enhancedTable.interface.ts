import { ChangeEvent, ReactElement } from 'react'

import { Sort } from '~/types'
import { AdditionalPropsInterface } from '~/types'
import { TableActionFunc } from '~/types'

export interface TableColumn<I> {
  field?: string
  label: string
  calculatedCellValue: (
    item: I,
    additionalProps: AdditionalPropsInterface
  ) => string | ReactElement
}

export interface TableRowAction {
  label: string
  func: TableActionFunc
}

export interface TableItem {
  _id: string
}

export interface TableSelect<I> {
  selected: string[]
  createSelectAllHandler: (items: I[]) => void
  handleSelectClick: (e: ChangeEvent<HTMLInputElement>, item: string) => void
  isSelected: (id: string) => boolean
}

export interface TableFilter<F> {
  filters: F
  setFilterByKey: (columnField: keyof F) => void
  clearFilterByKey: (columnField: keyof F) => void
}

export interface TableSort {
  sort: Sort
  onRequestSort: (columnField: string) => void
}

export interface TableData<I> {
  items: I[]
  loading?: boolean
  getData?: () => void
}
