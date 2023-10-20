export type UpdateUserDto = {
  name: string;
  email: string;
  role: 'ADMIN' | 'SECRETARY' | 'FINANCE' | 'USER' | 'SHEPHERD';
};

export enum Role {
  ADMIN = 'ADMIN',
  SECRETARY = 'SECRETARY',
  FINANCE = 'FINANCE',
  USER = 'USER',
  SHEPHERD = 'SHEPHERD',
}
