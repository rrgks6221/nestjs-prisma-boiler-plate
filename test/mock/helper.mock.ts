export class MockPostAuthorityHelper {
  checkIdentification = jest.fn();
}

export class MockQueryHelper {
  buildWherePropForFind = jest.fn();
  buildOrderByPropForFind = jest.fn();
}
