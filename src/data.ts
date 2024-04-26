const regex = {
  numeric: /^\d+$/,
  alpha: /^[A-Za-z\s]+$/,
  alphaNumberic: /^[a-zA-Z0-9]+$/,
  email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
};

export { regex };
