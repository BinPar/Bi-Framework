export function generateGraphQLEntity(entity) {
  const lines = [];
  lines.push(`type ${entity.shortName} {`);

  lines.push('}');
  return lines.join('\r\n');
}

export function generateGraphQLSchema(model) {
  return model.map(entity => generateGraphQLEntity(entity)).join('\r\n');
}
