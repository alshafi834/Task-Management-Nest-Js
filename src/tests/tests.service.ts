import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { v4 as uuid } from 'uuid';
import { CreateTestDto } from './dto/createTest.dto';
import { GetTestFilterDto } from './dto/get-tests-filter.dto';
import { Test } from './test.entity';
import { TestsRepository } from './tests.repository';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(TestsRepository)
    private testsRepository: TestsRepository,
  ) {}

  getTests(filterDto: GetTestFilterDto, user: User): Promise<Test[]> {
    return this.testsRepository.getTasks(filterDto, user);
  }

  async getTestById(id: string, user: User): Promise<Test> {
    const found = await this.testsRepository.findOne({ where: { id, user } });

    if (!found)
      throw new NotFoundException(`Test with the ID "${id}" not found`);

    return found;
  }
  createTest(createTestDto: CreateTestDto, user: User): Promise<Test> {
    return this.testsRepository.createTest(createTestDto, user);
  }

  async deleteTest(id: string, user: User): Promise<void> {
    const result = await this.testsRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
  async updateTest(id: string, request: string, user: User): Promise<Test> {
    const test = await this.getTestById(id, user);
    test.request = request;
    await this.testsRepository.save(test);
    return test;
  }
}
