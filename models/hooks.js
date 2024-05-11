export const saveContactErrorHook = (error, data, next) => {
  error.status = 400;
  next ();
};

export const updateSittingsHook = function (next) {
  this.options.new = true;
  this.options.runValidator = true;
  next()
}
