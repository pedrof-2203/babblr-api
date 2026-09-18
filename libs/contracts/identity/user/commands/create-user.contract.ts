import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword
} from 'class-validator';

export namespace CreateUserContract {
  @ApiSchema({ name: 'CreateUserRequest' })
  export class Request {
    @ApiProperty({
      example: 'johnnyDoe_'
    })
    @IsString()
    @IsOptional()
    displayName: string;

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
