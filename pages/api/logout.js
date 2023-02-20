import { removeTokenCookie } from '@/auth/auth-cookie'

export default async function logout(req, res) {
  removeTokenCookie(res)
  res.writeHead(302, { Location: '/login' })
  res.end()
}