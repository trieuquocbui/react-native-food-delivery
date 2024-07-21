export default class APIResponseModel<T> {
    code!: string
    message!: string
    data?: T
  }
  