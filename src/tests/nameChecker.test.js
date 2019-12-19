import { checkForName } from "../client/js/nameChecker";
describe("Checking name checker functionality", () => {
  it("return false if name contains number ", () => {
    expect(checkForName("kunal12")).toBe(false);
  });
  it("return true if name is only alphabates", () => {
    expect(checkForName("kunal")).toBe(true);
  });
});
