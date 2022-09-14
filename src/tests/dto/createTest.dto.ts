import { IsNotEmpty, isNotEmpty } from 'class-validator';

export class CreateTestDto {
  @IsNotEmpty()
  request: string;

  @IsNotEmpty()
  atmn_tests: string;

  @IsNotEmpty()
  test_name: string;

  @IsNotEmpty()
  api_name: string;
}
