import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {Block} from '../models';
import {BlockRepository} from '../repositories';

export class Block2Controller {
  constructor(
    @repository(BlockRepository)
    public blockRepository: BlockRepository,
  ) {}

  @post('/blocks', {
    responses: {
      '200': {
        description: 'Block model instance',
        content: {'application/json': {schema: {'x-ts-type': Block}}},
      },
    },
  })
  async create(@requestBody() block: Block): Promise<Block> {
    return await this.blockRepository.create(block);
  }

  @get('/blocks/count', {
    responses: {
      '200': {
        description: 'Block model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Block)) where?: Where,
  ): Promise<Count> {
    return await this.blockRepository.count(where);
  }

  @get('/blocks', {
    responses: {
      '200': {
        description: 'Array of Block model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Block}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Block)) filter?: Filter,
  ): Promise<Block[]> {
    return await this.blockRepository.find(filter);
  }

  @patch('/blocks', {
    responses: {
      '200': {
        description: 'Block PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() block: Block,
    @param.query.object('where', getWhereSchemaFor(Block)) where?: Where,
  ): Promise<Count> {
    return await this.blockRepository.updateAll(block, where);
  }

  @get('/blocks/{id}', {
    responses: {
      '200': {
        description: 'Block model instance',
        content: {'application/json': {schema: {'x-ts-type': Block}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Block> {
    return await this.blockRepository.findById(id);
  }

  @patch('/blocks/{id}', {
    responses: {
      '204': {
        description: 'Block PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() block: Block,
  ): Promise<void> {
    await this.blockRepository.updateById(id, block);
  }

  @del('/blocks/{id}', {
    responses: {
      '204': {
        description: 'Block DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.blockRepository.deleteById(id);
  }
}
