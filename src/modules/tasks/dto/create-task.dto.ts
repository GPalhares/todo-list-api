import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsBoolean()
  completed: boolean = false;

  @IsOptional()
  @IsArray()
  tags: string[] = [];
}

export { CreateTaskDto };
