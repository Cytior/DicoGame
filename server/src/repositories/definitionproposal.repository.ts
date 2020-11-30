import {DefaultCrudRepository} from '@loopback/repository';
import {DefinitionProposal, DefinitionProposalRelations} from '../models';
import {MysqldbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DefinitionproposalRepository extends DefaultCrudRepository<
DefinitionProposal,
  typeof DefinitionProposal.prototype.Id,
  DefinitionProposalRelations
> {
  constructor(
    @inject('datasources.mysqldb') dataSource: MysqldbDataSource,
  ) {
    super(DefinitionProposal, dataSource);
  }
}
