import React from 'react'
import { Pagination } from "react-bootstrap"

export default function Pages({ totalCount, limit, page, handlePage }) {

  const pageCount = Math.ceil(totalCount / limit)
  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }
  return (
    <Pagination className="mt-5">
      {pages.map(Page =>
        <Pagination.Item key={Page} active={page === Page} onClick={() => handlePage(Page)}>{Page}</Pagination.Item>
      )}
    </Pagination>
  )
}
