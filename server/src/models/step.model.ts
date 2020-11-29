import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Step extends Entity {

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
  Type: number;

  @property({
    type: 'number',
    required: true,
    index:true
  })
  GameId: number;

  @property({
    type: 'number',
    required: true
  })
  MasterPlayerId: number;

  @property({
    type: 'string',
    required: true,
  })
  WordId: string;



  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Step>) {
    super(data);
  }
}

export interface StepRelations {
  // describe navigational properties here
}

export type StepWithRelations = Step & StepRelations;
