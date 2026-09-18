import { CreateUserHandler } from './create-user/create-user.handler';
import { DeleteUserHandler } from './delete-user/delete-user.handler';
import { UpdateUserHandler } from './update-user/update-user.handler';

export const commandHandlers = [
  CreateUserHandler,
  DeleteUserHandler,
  UpdateUserHandler
];
