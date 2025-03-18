import { IsString, IsOptional, IsArray, IsEnum, IsUUID } from 'class-validator';

class UpdateTaskDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['pendente', 'concluída', 'em progresso'])
  status?: 'pendente' | 'concluída' | 'em progresso';

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsUUID()
  userId?: string | null;
}

export { UpdateTaskDto };
