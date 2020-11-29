import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})

  export class Player extends Entity {
  @property({
    type: 'string',
    required: true,
    defaultFn:'uuid',
    index:'true'
  })
  Secret: string;

  @property({
    type: 'date',
    required: true,
  })
  CreatedAt: string;

  @property({
    type: 'date',
    required: true,
  })
  LastActivity: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
    hidden: true,
    index:true
  })
  Id?: number;

  @property({
    type: 'number',
    required: true,
  })
  State: number;

  @property({
    type: 'number',
    required: true,
    index:true
  })
  GameId: number;

  @property({
    type: 'number',
    required: true,
  })
  Score: number;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Player>) {
    super(data);
  }
}

export interface PlayerRelations {
  // describe navigational properties here
}

export type PlayerWithRelations = Player & PlayerRelations;
