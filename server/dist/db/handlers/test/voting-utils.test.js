'use strict';

var _models = require('../../models');

var _votingUtils = require('../voting-utils');

var _suggestions = require('../suggestions');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe('handlers.votingUtils', () => {
  afterEach(() => _models.SuggestionModel.remove());

  it('Picks out the winner for the latest voting round', _asyncToGenerator(function* () {
    const today = new Date();
    const settings = {
      period_suggest_start_day: today.getDate() - 1
    };

    const ss = yield (0, _suggestions.addSuggestion)('nameA', 'descriptionA').then(function () {
      return (0, _suggestions.addSuggestion)('nameB', 'descriptionB');
    }).then(function () {
      return (0, _suggestions.addSuggestion)('name1', 'description1');
    }).then(function () {
      return (0, _suggestions.addSuggestion)('name2', 'description2');
    });

    yield (0, _suggestions.voteOnSuggestion)(ss._id);

    return (0, _votingUtils.resolveEndorsedInPeriod)({ settings, today }).then(function () {
      return _models.SuggestionModel.find({ 'voting.is_endorsed': true });
    }).then(function (ss) {
      expect(ss).to.have.lengthOf(1);
      expect(ss[0].name).to.be.equal('name2');
    });
  }));
});