'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _express = require('express');

var express = _interopRequireWildcard(_express);

var _suggestions = require('../db/handlers/suggestions');

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const router = express.Router();

router.get('/dynamics/suggestions', (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    (0, _suggestions.getFreshSuggestions)({ settings: _settings2.default, today: new Date() }).then(function (r) {
      return res.json(r);
    }).catch(next);
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})());

router.post('/dynamics/suggestion', (req, res, next) => {
  (0, _suggestions.addSuggestion)(req.body.name, req.body.description).then(r => res.json(r)).catch(next);
});

router.post('/dynamics/suggestion/:id/vote', (req, res, next) => {
  const session = req.cookies.session;

  (0, _suggestions.voteOnSuggestion)({ suggestionId: req.params.id, session }).then(r => res.json(r)).catch(next);
});

exports.default = router;