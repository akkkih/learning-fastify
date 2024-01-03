import { compareSync, genSaltSync, hashSync } from 'bcrypt-ts';

export async function hashPassword(password: string): Promise<string> {
  return hashSync(password, genSaltSync(10));
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return compareSync(password, hash);
}