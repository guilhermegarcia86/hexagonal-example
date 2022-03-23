export interface Repository<T> {
  save(type: T): Promise<T>
  getById(id: number): Promise<T>
  getAll(): Promise<T[]>
}