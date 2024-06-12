import { atom } from 'jotai'

import { User } from '@type/userTypes'
import { UserInitial } from '@type/userInitialValues'

export const newChatToggledAtom = atom<boolean>(false)
export const newChatToUser = atom<User>(UserInitial)
