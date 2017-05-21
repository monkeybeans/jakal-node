import { suggestionModel } from '../db';

class DynamicsTemplate {
  constructor() {
    this.suggestions = suggestionModel.find()
  }
}
