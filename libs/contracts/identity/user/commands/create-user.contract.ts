import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export namespace CreateUserContract {
  export class Request {
    @ApiProperty({
      example: 'john.doe@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    emailAddress: string;

    @ApiProperty({
      example: 'StrongPass@123'
    })
    @IsStrongPassword()
    plainPassword: string;
  }

  export interface Response {
    id: string;
    message: 'User created';
  }
}