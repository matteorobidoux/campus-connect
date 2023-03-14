import {UserClassSection} from './UserClassSection'

type UserMessage ={
  message: string,
  room: UserClassSection,
  user: {username: string, _id: string},
  date: Date,
}

export type {UserMessage}