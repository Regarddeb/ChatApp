import { atom } from 'jotai'
import { UserInitial } from '@type/userInitialValues'
import { User } from '@type/userTypes'
import { ReplyToChat, replyToInitial } from '@type/replyToChat'

export const selectedUserAtom = atom<User[]>([UserInitial])

export const threadAtom = atom<number | null>(null)

export const memberAtom = atom<number>(0)

export const replyToChatAtom = atom<ReplyToChat>(replyToInitial)
