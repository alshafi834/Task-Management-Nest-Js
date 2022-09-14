import { IsString } from 'class-validator';

export class UpdateTestDto {
  @IsString()
  request: string;
}
