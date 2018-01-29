require('babel-polyfill');
require('babel-register');

const dirtyChai = require('dirty-chai');
const chai = require('chai');

chai.use(dirtyChai);

global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should;

console.log('mocha setup completed');
