import { IsString, IsOptional, IsArray, IsEnum, IsUUID } from 'class-validator';

class CreateTaskDto {
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(['pendente', 'concluída', 'em progresso'])
  status: 'pendente' | 'concluída' | 'em progresso' = 'pendente';

  @IsOptional()
  @IsArray()
  tags: string[] = [];

  @IsUUID()
  userId: string;
}

export { CreateTaskDto };
