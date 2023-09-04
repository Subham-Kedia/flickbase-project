const isStrongPassword = (password) => {
  /*
   * password must be 8 to 15 characters length
   * at least one lowercase letter
   * at least one uppercase letter
   * at least one numeric digit
   * at least one special character
   */
  const pattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
  return pattern.test(password)
}

module.exports = { isStrongPassword }
