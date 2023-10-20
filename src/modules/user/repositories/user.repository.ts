import { UserCreatedDTO, UserProfileDTO } from 'src/modules/auth/dto/auth.dto';
import { UpdateUserDto } from '../dto/update.dto';

export abstract class IUsersRepository {
  abstract findById(userId: string): Promise<UserCreatedDTO | null>;
  abstract uploadAvatar(id: string, path: string): Promise<void>;
  abstract updateRole(
    userId: string,
    role: UpdateUserDto['role'],
  ): Promise<UpdateUserDto | null>;
  abstract me(userId: string): Promise<UserProfileDTO | null>;
}
