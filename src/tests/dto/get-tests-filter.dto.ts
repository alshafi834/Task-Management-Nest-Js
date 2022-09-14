import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GetTestFilterDto {
  @IsOptional()
  @IsString()
  api_name?: string;
}
