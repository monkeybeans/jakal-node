function reducer(state = {}, action) {
  const { type, payload } = action;

  if (/.*_FAIL$/.test(type)) {
    const message = payload && payload.toString();
    console.error(`error: [${type}] ${message}`);
    return { ...state, message };
  }
  return state;
}

export default reducer;
