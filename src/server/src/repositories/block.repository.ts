import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Block} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BlockRepository extends DefaultCrudRepository<
  Block,
  typeof Block.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Block, dataSource);
  }
}
