import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Game extends Entity {
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
  })
  OwnerId: number;

  @property({
    type: 'number',
    required: true,
  })
  CurrentStepId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

constructor(data?: Partial<Game>) {
  super(data);
}
}

export interface GameRelations {
// describe navigational properties here
}

export type GameWithRelations = Game & GameRelations;