import {DefaultCrudRepository} from '@loopback/repository';
import {Step, StepRelations} from '../models';
import {MysqldbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class StepRepository extends DefaultCrudRepository<
  Step,
  typeof Step.prototype.Id,
  StepRelations
> {
  constructor(
    @inject('datasources.mysqldb') dataSource: MysqldbDataSource,
  ) {
    super(Step, dataSource);
  }
}
