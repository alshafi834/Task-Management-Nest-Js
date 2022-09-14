import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTestDto } from './dto/createTest.dto';
import { GetTestFilterDto } from './dto/get-tests-filter.dto';
import { UpdateTestDto } from './dto/updateTest.dto';
import { Test } from './test.entity';
import { TestsService } from './tests.service';

@Controller('tests')
@UseGuards(AuthGuard())
export class TestsController {
  constructor(private testService: TestsService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTestFilterDto,
    @GetUser() user: User,
  ): Promise<Test[]> {
    return this.testService.getTests(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Test> {
    return this.testService.getTestById(id, user);
  }

  @Post()
  createTest(
    @Body() createTestDto: CreateTestDto,
    @GetUser() user: User,
  ): Promise<Test> {
    return this.testService.createTest(createTestDto, user);
  }

  @Delete('/:id')
  deleteTest(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.testService.deleteTest(id, user);
  }

  @Patch('/:id/request')
  updateTest(
    @Param('id') id: string,
    @Body() updateTestDto: UpdateTestDto,
    @GetUser() user: User,
  ): Promise<Test> {
    const { request } = updateTestDto;
    return this.testService.updateTest(id, request, user);
  }
}
