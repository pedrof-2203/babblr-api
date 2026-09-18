import { GetUserByEmailHandler } from './get-user-by-email/get-user-by-email.handler';
import { GetUserByIdHandler } from './get-user-by-id/get-user-by-id.handler';
import { GetUserCredentialsHandler } from './get-user-credentials/get-user-credentials.handler';
import { GetUsersHandler } from './get-users/get-users.handler';

export const queryHandlers = [
  GetUserByEmailHandler,
  GetUserByIdHandler,
  GetUsersHandler,
  GetUserCredentialsHandler
];
