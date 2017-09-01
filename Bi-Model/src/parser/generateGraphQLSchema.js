import { getValue } from './properties';
import optimizeDataModel from './optimizeDataModel';

async function getGraphQlField(name, field, databaseModel, postFix) {
  if (Array.isArray(field.type)) {
    const value = await getValue(
      '[object String]',
      field.type[0].graphQLType,
      null,
      field,
      databaseModel,
      postFix,
    );
    return `  ${name}: [${value}!]${field.required === true && postFix !== 'UpdateInput'
      ? '!'
      : ''}`;
  }
  const value = await getValue(
    '[object String]',
    field.type.graphQLType,
    null,
    field,
    databaseModel,
    postFix,
  );
  return `  ${name}: ${value}${field.required === true ? '!' : ''}`;
}

async function getFields(model, databaseModel, postFix) {
  const fields = await Promise.all(
    Object.keys(model).map(name => getGraphQlField(name, model[name], databaseModel, postFix)),
  );
  return fields.filter(value => value);
}

function getEntityType(entity, postFix) {
  if (entity.isInterface) {
    return 'interface';
  }
  return postFix ? 'input' : 'type';
}

export async function generateGraphQLDefinition(entity, databaseModel, postFix) {
  const fields = await getFields(entity.model, databaseModel, postFix);
  let lines = [];
  lines.push(
    `${getEntityType(entity, postFix)} ${entity.entityShortName}${postFix}${!postFix &&
    entity.composedBy
      ? ` implements ${entity.composedBy.entityShortName}`
      : ''} {`,
  );
  if (postFix !== 'AddInput') {
    lines.push('  _id: ID!');
  }
  lines = lines.concat(fields);
  lines.push('}');
  lines.push('');
  return lines;
}

export async function generateGraphQLEntity(entity, databaseModel) {
  let lines = [];
  if (entity.model) {
    lines = lines.concat(await generateGraphQLDefinition(entity, databaseModel, ''));
    if (!entity.isInterface) {
      lines = lines.concat(await generateGraphQLDefinition(entity, databaseModel, 'AddInput'));
      lines = lines.concat(await generateGraphQLDefinition(entity, databaseModel, 'UpdateInput'));
    }
  }
  return lines.join('\r\n');
}

export async function generateGraphQLSchema(databaseModel) {
  let optimizedDatabaseModel = databaseModel;
  optimizedDatabaseModel = optimizeDataModel(optimizedDatabaseModel);
  let schema = ['scalar Date', ''];
  schema = schema.concat(
    await Promise.all(
      optimizedDatabaseModel.map(async (entity) => {
        const entitySchema = await generateGraphQLEntity(entity, databaseModel);
        return entitySchema;
      }),
    ),
  );

  schema.push('type RootQuery {');
  schema.push('  me: User');
  schema.push('}');
  schema.push('');
  schema.push('schema {');
  schema.push('  query: RootQuery');
  schema.push('}');
  return schema.join('\r\n');
}
