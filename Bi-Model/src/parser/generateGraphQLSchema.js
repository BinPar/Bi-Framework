import { getValue } from './properties';
import optimizeModel from './optimizeModel';

async function getGraphQlField(name, field) {
  if (Array.isArray(field.type)) {
    const value = await getValue('[object String]', field.type[0].graphQLType, null, field);
    return `  ${name}: [${value}]${field.required === true ? '!' : ''}`;
  }
  const value = await getValue('[object String]', field.type.graphQLType, null, field);
  return `  ${name}: ${value}${field.required === true ? '!' : ''}`;
}

async function getFields(model) {
  const fields = await Promise.all(
    Object.keys(model).map(name => getGraphQlField(name, model[name])),
  );
  return fields.filter(value => value);
}

export async function generateGraphQLEntity(entity) {
  let lines = [];
  if (entity.model) {
    const fields = await getFields(entity.model);
    lines.push(
      `${entity.isInterface ? 'interface' : 'type'} ${entity.shortName}${entity.composedBy
        ? ` implements ${entity.composedBy.shortName}`
        : ''}`,
    );
    lines.push('  _id: ID!');
    lines = lines.concat(fields);
    lines.push('}');
    lines.push('');
    if (!entity.isInterface) {
      lines.push(`input ${entity.shortName}AddInput {`);
      lines = lines.concat(fields);
      lines.push('}');
      lines.push('');
      lines.push(`input ${entity.shortName}Input {`);
      lines.push('  _id: ID!');
      lines = lines.concat(fields.map(field => field.replace('!', '')));
      lines.push('}');
      lines.push('');
    }
  }
  return lines.join('\r\n');
}

export async function generateGraphQLSchema(model) {
  let optimizedModel = model;
  optimizedModel = optimizeModel(optimizedModel);
  const schema = await Promise.all(
    optimizedModel.map(async (entity) => {
      const entitySchema = await generateGraphQLEntity(entity);
      return entitySchema;
    }),
  );
  return schema.join('\r\n');
}
