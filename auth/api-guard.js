import { getLoginSession } from './auth';
import { findUser } from '@/auth/user';
// import { removeTokenCookie } from '@/auth/auth-cookie'

export default async function guard({ req, res }){
  try {
    const session = await getLoginSession(req)
    const user = (session && (await findUser(session.email))) ?? null;
    if(user){ return user; }
    // removeTokenCookie(res);
    return false;
  } catch (error) {
    // removeTokenCookie(res)
    return false;
  }
}