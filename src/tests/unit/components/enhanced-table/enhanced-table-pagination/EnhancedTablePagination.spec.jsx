import { render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import EnhancedTablePagination from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination'
import usePagination from '~/hooks/table/use-pagination'

const itemsCount = 100

describe('EnhancedTablePagination test', () => {
  it('Should render first page', () => {
    const { result } = renderHook(() => usePagination({ itemsCount }))

    render(<EnhancedTablePagination pagination={result.current} />)

    expect(screen.getByText(`1-5 table.of ${itemsCount}`)).toBeInTheDocument()
  })

  it('Should change page from 1 to 2', async () => {
    const { result } = renderHook(() => usePagination({ itemsCount }))
    const { rerender } = render(
      <EnhancedTablePagination pagination={result.current} />
    )
    const inputField = screen.getByTestId('pagination-page-input')

    await userEvent.clear(inputField)
    rerender(<EnhancedTablePagination pagination={result.current} />)

    await userEvent.type(inputField, '2')
    rerender(<EnhancedTablePagination pagination={result.current} />)

    expect(inputField.value).toBe('2')

    const button = screen.getByText('table.go')

    await userEvent.click(button)
    rerender(
      <EnhancedTablePagination
        itemsCount={itemsCount}
        pagination={result.current}
      />
    )

    expect(screen.getByText(`6-10 table.of ${itemsCount}`)).toBeInTheDocument()
  })
})
