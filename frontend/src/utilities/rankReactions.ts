import { Reaction } from '@type/chat'

export default function rankReactions (
  reactions: Reaction[]
): { reaction: string; count: number }[] {
  const reactionCounts: Record<string, number> = reactions.reduce(
    (acc, curr) => {
      acc[curr.reaction] = (acc[curr.reaction] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const reactionCountsArray = Object.keys(reactionCounts).map(key => ({
    reaction: key,
    count: reactionCounts[key]
  }))

  reactionCountsArray.sort((a, b) => b.count - a.count)

  return reactionCountsArray.slice(0, 3)
}
