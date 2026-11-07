
import { useQuery } from '@tanstack/react-query'
import { api } from './client'
import type { NFT } from '../mocks/data'

export type NFTFilters = {
  search: string
  category: string
  maxPrice: string
  sort: string
  page: number
}

export async function getNFTs(
  filters: NFTFilters
): Promise<NFT[]> {
  const response = await api.get<NFT[]>('/nfts', {
    params: filters,
  })

  return response.data
}

export function useNFTs(filters: NFTFilters) {
  return useQuery({
    queryKey: ['nfts', filters],
    queryFn: () => getNFTs(filters),
  })
}
