import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'test@test.ru',
  })
  email: string;
  @ApiProperty({
    default: 'test name',
  })
  fullName: string;
  @ApiProperty({
    default: 'test password',
  })
  password: string;
}
