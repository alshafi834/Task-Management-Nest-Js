import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.status.enum';

export class UpdateStatus {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
