import { getValue } from './properties';

async function getGraphQlField(name, field) {
  if (field.type) {
    const value = await getValue('[object String]', field.type.graphQLType, null, field);
    return `  ${name}: ${value}`;
  }
  return null;
}
async function getFields(model) {
  const fields = await Promise.all(
    Object.keys(model).map(name => getGraphQlField(name, model[name])),
  );
  return fields.filter(value => value);
}
export async function generateGraphQLEntity(entity) {
  const lines = [];
  lines.push(`type ${entity.shortName} {`);
  lines.push('  _id: ID!');
  const fields = await getFields(entity.model);
  lines.push(fields.join('\r\n'));
  lines.push('}');
  lines.push('');
  return lines.join('\r\n');
}

export async function generateGraphQLSchema(model) {
  const schema = await Promise.all(
    model.map(async (entity) => {
      const entitySchema = await generateGraphQLEntity(entity);
      return entitySchema;
    }),
  );
  return schema.join('\r\n');
}
