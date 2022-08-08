import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.status.enum';

export class UpdateStatus {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
