
import { http, HttpResponse } from 'msw'
import { nfts } from './data'

export const handlers = [
  http.get('/api/nfts', ({ request }) => {
    const url = new URL(request.url)

    const search = (url.searchParams.get('search') ?? '')
      .trim()
      .toLowerCase()

    const category = url.searchParams.get('category') ?? ''
    const maxPrice = url.searchParams.get('maxPrice') ?? ''
    const sort = url.searchParams.get('sort') ?? ''
    const page = Number(url.searchParams.get('page') ?? '1')

    const pageSize = 6

    let filtered = nfts.filter((nft) => {
      const matchesSearch = nft.name
        .toLowerCase()
        .includes(search)

      const matchesCategory =
        !category || nft.category === category

      const matchesPrice =
        !maxPrice ||
        Number(nft.price) <= Number(maxPrice)

      return matchesSearch && matchesCategory && matchesPrice
    })

    if (sort === 'price_asc') {
      filtered = [...filtered].sort(
        (a, b) => Number(a.price) - Number(b.price)
      )
    }

    if (sort === 'price_desc') {
      filtered = [...filtered].sort(
        (a, b) => Number(b.price) - Number(a.price)
      )
    }

    const safePage = Number.isInteger(page) && page > 0
      ? page
      : 1

    const start = (safePage - 1) * pageSize

    const paginated = filtered.slice(
      start,
      start + pageSize
    )

    return HttpResponse.json(paginated)
  }),
]
