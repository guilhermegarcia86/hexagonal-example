import { ErrorRequestHandler } from 'express'


export const errorHandler: ErrorRequestHandler = async (err, _req, res, _next) => {

  return res.status(err.status ?? err.httpCode ?? 500).json({ error: err.message })
}
