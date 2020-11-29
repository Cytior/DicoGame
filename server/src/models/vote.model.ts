import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Vote extends Entity {

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
    index:true
  })
  StepId: number;

  @property({
    type: 'number',
    required: true,
    index:true  
  })
  PlayerId: number;

  @property({
    type: 'number',
    required: true,
    index:true  
  })
  DefinitionProposalId: number;

  @property({
    type: 'boolean',
    required: true,
  })
  IsKnown: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Vote>) {
    super(data);
  }
}

export interface VoteRelations {
  // describe navigational properties here
}

export type VoteWithRelations = Vote & VoteRelations;
