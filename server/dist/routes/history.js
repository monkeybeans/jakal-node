'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _express = require('express');

var express = _interopRequireWildcard(_express);

var _votingUtils = require('../db/handlers/voting-utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const router = express.Router();

router.get('/history', (req, res, next) => {
  (0, _votingUtils.getEndorsedSuggestions)().then(endorsed => {
    res.json(endorsed);
  }).catch(next);
});

exports.default = router;