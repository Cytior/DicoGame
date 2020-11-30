import {DefaultCrudRepository} from '@loopback/repository';
import {Vote, VoteRelations} from '../models';
import {MysqldbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VoteRepository extends DefaultCrudRepository<
  Vote,
  typeof Vote.prototype.Id,
  VoteRelations
> {
  constructor(
    @inject('datasources.mysqldb') dataSource: MysqldbDataSource,
  ) {
    super(Vote, dataSource);
  }
}
