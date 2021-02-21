class ServiceResponse {
  constructor(data = "", success = true, message = "") {
    this.data = data;
    this.success = success;
    this.message = message;
  }
}

module.exports = ServiceResponse;
