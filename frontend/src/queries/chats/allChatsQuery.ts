import { useInfiniteQuery } from 'react-query'
import { useAtomValue } from 'jotai'

import { threadAtom } from '@atoms/chatAtoms'
import axios from '@utilities/axios'

const useAllChatsQuery = () => {
  const thread_id = useAtomValue(threadAtom)

  return useInfiniteQuery({
    queryKey: ['all-chats', thread_id],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `api/thread/all-chats/${thread_id}?page=${pageParam}`
      )
      return response.data
    },
    getNextPageParam: lastPage =>
      lastPage.chats.next_page_url ? lastPage.chats.current_page + 1 : undefined
  })
}

export { useAllChatsQuery }
