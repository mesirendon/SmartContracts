var Person = artifacts.require("Person");
chai = require("chai");
chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

expect = chai.expect;

contract("Testing the Person contract", function(accounts) {
  describe("Deploy the Person contract", function() {
    it("Get an instance of the Person contract", function() {
      return Person.new().then(function(instance) {
        personContract = instance;
      });
    });
  });

  describe("Test the contract variables", function() {
    describe("Variable: name", function() {
      it("Use setName to set a first name", function() {
        return personContract.setName("Maria").then(function(response) {
          expect(response).to.not.be.an("error");
        });
      });

      it("Check the first name was set properly", function() {
        return personContract.name().then(function(response) {
          expect(response.toString()).to.be.equal("Maria");
        });
      });

      it("Use setName to to reject the call from another account", function() {
        return expect(personContract.setName("Pedro", {"from": accounts[1]})).to.be.eventually.rejected;
      });

      it("Check the first name is still the given one originally", function() {
        return personContract.name().then(function(response) {
          expect(response.toString()).to.be.equal("Maria");
        });
      });
    });
  });
});
