import { SuggestionModel } from '../../db';


function startVoting() {
  const startDate = new Date();

  return SuggestionModel
    .updateMany(
      { 'voting.started': null },
      { 'voting.started': startDate },
      { runValidators: true }
    )
    .then(() => SuggestionModel.find( { 'voting.started': startDate } ));
}

function getPickedSuggestions(limit = 50) {
  return SuggestionModel
    .find({ 'voting.stage': 'PICKED'})
    .sort('-voting.started')
    .limit(limit);
}

export {
  getPickedSuggestions,
  startVoting,
}
