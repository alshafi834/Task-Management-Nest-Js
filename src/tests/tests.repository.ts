import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTestDto } from './dto/createTest.dto';
import { GetTestFilterDto } from './dto/get-tests-filter.dto';
import { Test } from './test.entity';

@EntityRepository(Test)
export class TestsRepository extends Repository<Test> {
  async createTest(createTestDto: CreateTestDto, user: User): Promise<Test> {
    const { request, atmn_tests, test_name, api_name } = createTestDto;
    const test = this.create({
      request,
      atmn_tests,
      test_name,
      api_name,
      user,
    });

    await this.save(test);
    return test;
  }

  async getTasks(filterDto: GetTestFilterDto, user: User): Promise<Test[]> {
    const { api_name } = filterDto;
    const query = this.createQueryBuilder('test');
    query.where({ user });

    if (api_name) {
      query.andWhere('test.api_name = :api_name', { api_name });
    }
    const tests = await query.getMany();
    return tests;
  }
}
