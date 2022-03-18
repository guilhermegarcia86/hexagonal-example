export interface AcquirerRequest {
  id: string
  description: string
  amount: string
}

export interface AcquirerResponse {
  id: string
  name: string
  status: string
  created_at: Date
  description: string
  amount: string
  payment_response: string
}