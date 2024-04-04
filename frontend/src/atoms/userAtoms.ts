import { atomWithStorage } from 'jotai/utils'
import { User } from '@type/userTypes'
import { UserInitial } from '@type/userInitialValues'

export const userAtom = atomWithStorage<User>('user', UserInitial)
