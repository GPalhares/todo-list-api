import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export { UpdateTaskDto };
