export interface Client<T> {
  send(type: T): Promise<T>
}