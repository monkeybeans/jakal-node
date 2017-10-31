export const makeActionTypes = (types, context) =>
  types.reduce((at, t) => ({ ...at, [t]: `${context}/${t}` }), {});
