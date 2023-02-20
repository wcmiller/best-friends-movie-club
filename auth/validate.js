import { getLoginSession } from './auth';
import { findUser } from '@/auth/user';

export default async function validate(request){
  try {
    const session = await getLoginSession(request)
    const user = (session && (await findUser(session.email))) ?? false;
    return user;
  } catch (error) {
    return error;
  }
}