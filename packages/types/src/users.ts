export interface AuthRequest extends Request {
  user?: {
    id: string
    role: string
  }
}
