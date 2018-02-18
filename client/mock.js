import { lorem, internet } from 'faker'

export const user = {
  get email () {
    return internet.email()
  },
  get avatar () {
    return internet.avatar()
  }
}

export const message = {
  createdAt: new Date(),
  get text () {
    return lorem.paragraph()
  },
  user,
  userId: 'O9D04CLWHNn8YA7S'
}
