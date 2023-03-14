
type UserMessage ={
  message: string,
  user: {username: string, _id: string},
  date: Date,
}

export type {UserMessage}