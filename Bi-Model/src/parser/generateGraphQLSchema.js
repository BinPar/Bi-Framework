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

function getIndexedFields(model) {
  const fields = Object.keys(model).filter(fieldName => model[fieldName].indexed);
  return fields;
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

export async function generateSortEnum(entity) {
  let result = [];
  const indexedFields = getIndexedFields(entity.model);
  if (indexedFields.length) {
    result.push(`enum ${entity.entityShortName}Indexes {`);
    result = result.concat(indexedFields.map(fieldName => `  ${fieldName}`));
    result.push('}');
    result.push('');
  }
  return result;
}

export async function generateGraphQLEntity(entity, databaseModel, rootQuery, rootMutation) {
  let lines = [];
  if (entity.model) {
    lines = lines.concat(await generateGraphQLDefinition(entity, databaseModel, ''));
    if (!entity.isInterface) {
      lines = lines.concat(await generateGraphQLDefinition(entity, databaseModel, 'AddInput'));
      lines = lines.concat(await generateGraphQLDefinition(entity, databaseModel, 'UpdateInput'));
    }
    const sortEnum = await generateSortEnum(entity, databaseModel);
    lines = lines.concat(sortEnum);
    let order = '';
    if (sortEnum.length) {
      order = `orderBy: ${entity.entityShortName}Indexes, descending: Boolean, `;
    }
    rootQuery.push(`get${entity.entityShortName}ByID(_id: ID!): ${entity.entityShortName}`);
    rootQuery.push(
      `get${entity.collectionShortName} (${order}skip:Int, limit: Int): [${entity.entityShortName}]`,
    );
    if (entity.permissions && entity.permissions.insert) {
      rootMutation.push(
        `insert${entity.collectionShortName}(input: ${entity.entityShortName}AddInput!): ${entity.entityShortName}`,
      );
    }

    if (entity.permissions && entity.permissions.update) {
      rootMutation.push(
        `update${entity.collectionShortName}(input: ${entity.entityShortName}UpdateInput!): ${entity.entityShortName}`,
      );
    }

    if (entity.permissions && entity.permissions.delete) {
      rootMutation.push(
        `delete${entity.collectionShortName}(id: ID): ID`,
      );
    }
  }
  return lines.join('\r\n');
}

export async function generateGraphQLSchema(databaseModel) {
  let optimizedDatabaseModel = databaseModel;
  optimizedDatabaseModel = optimizeDataModel(optimizedDatabaseModel);
  let schema = ['scalar Date', ''];
  const rootQuery = [];
  const rootMutation = [];
  schema = schema.concat(
    await Promise.all(
      optimizedDatabaseModel.map(async (entity) => {
        const entitySchema = await generateGraphQLEntity(
          entity,
          databaseModel,
          rootQuery,
          rootMutation,
        );
        return entitySchema;
      }),
    ),
  );

  schema.push('type RootQuery {');
  schema = schema.concat(rootQuery);
  schema.push('}');
  schema.push('');
  schema.push('type RootMutation {');
  schema = schema.concat(rootMutation);
  schema.push('}');
  schema.push('');
  schema.push('schema {');
  schema.push('  query: RootQuery');
  schema.push('  mutation: RootMutation');
  schema.push('}');
  return schema.join('\r\n');
}
