import { useAtomValue } from 'jotai'
import { useInfiniteQuery } from 'react-query'

import axios from '@utilities/axios'
import { searchChatHistoryTermAtom } from '@atoms/chatHistoryAtoms'

const useAllThreadsQuery = () => {
  const searchHistoryTerm = useAtomValue(searchChatHistoryTermAtom)
  return useInfiniteQuery({
    queryKey: ['chatHistoryList', searchHistoryTerm],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `/api/thread/all-threads?page=${pageParam}&search=${searchHistoryTerm}`
      )
      return response.data
    },
    getNextPageParam: lastPage =>
      lastPage.threads.next_page_url
        ? lastPage.threads.current_page + 1
        : undefined
  })
}

export default useAllThreadsQuery
