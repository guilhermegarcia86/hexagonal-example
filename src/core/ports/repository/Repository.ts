export interface Repository<T> {
  save(type: T): Promise<T>
  getById(id: string): Promise<T>
  getAll(): Promise<T[]>
}