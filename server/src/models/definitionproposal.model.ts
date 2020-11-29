import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class DefinitionProposal extends Entity {

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
    type: 'boolean',
    required: true,
  })
  IsOfficial: boolean;

  @property({
    type: 'string',
    required: true,
  })
  Content: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DefinitionProposal>) {
    super(data);
  }
}

export interface DefinitionProposalRelations {
  // describe navigational properties here
}

export type DefinitionProposalWithRelations = DefinitionProposal & DefinitionProposalRelations;
