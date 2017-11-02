class FormField {
  constructor({ validator }) {
    this.val = '';
    this.msg = null;
    this.touched = false;
    this.validator = validator;

    return this;
  }

  reset = () => {
    this.val = '';
    this.msg = null;
    this.touched = false;

    return this;
  };

  set = (val) => {
    if (this.touched === true) {
      this.validate(val);
    }

    this.val = val;

    return this;
  };

  doTouch = () => {
    this.touched = true;

    this.validate(this.val);

    return this;
  };

  validate = (val) => {
    this.msg = this.validator(val);

    return this;
  };
}


export default FormField;
