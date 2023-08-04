import { Request } from 'express';
import { User } from '@models/user';
import { TokenPayload } from 'google-auth-library';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
  token_payload: TokenPayload;
}
