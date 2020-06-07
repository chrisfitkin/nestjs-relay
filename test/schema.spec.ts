import { NestFactory } from '@nestjs/core'
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql'
import { GraphQLSchema } from 'graphql'
import { GlobalIDScalar } from '../src/nestjs-relay-tools'
import { FactionResolver, NodeFieldsResolver } from './starwars-app'

describe('Schema', () => {
  let schema: GraphQLSchema

  beforeAll(async () => {
    const app = await NestFactory.create(GraphQLSchemaBuilderModule)
    await app.init()

    const gqlSchemaFactory = app.get(GraphQLSchemaFactory)
    schema = await gqlSchemaFactory.create([FactionResolver, NodeFieldsResolver], [GlobalIDScalar])
  })

  it('should contain the `Node` interface type', () => {
    const nodeType = schema.getType('Node')
    expect(nodeType).toBeDefined()
  })

  it('should contain the `node` field on the `Query` type', () => {
    const queryType = schema.getQueryType()
    expect(queryType).toBeDefined()

    const nodeField = queryType?.getFields()['node']
    expect(nodeField).toBeDefined()
  })

  it('should contain the `nodes` field on the `Query` type', () => {
    const queryType = schema.getQueryType()
    expect(queryType).toBeDefined()

    const nodesField = queryType?.getFields()['nodes']
    expect(nodesField).toBeDefined()
  })
})
