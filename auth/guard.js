import { getLoginSession } from './auth';
import { findUser } from '@/auth/user';
import { removeTokenCookie } from '@/auth/auth-cookie'

export default async function guard({ req, res }){
  try {
    const session = await getLoginSession(req)
    const user = (session && (await findUser(session.email))) ?? null;
    if(user){ return user; }
    removeTokenCookie(res)
    res.writeHead(302, { Location: '/login' })
    res.end()
  } catch (error) {
    removeTokenCookie(res)
    res.writeHead(302, { Location: '/login' })
    res.end()
  }
}