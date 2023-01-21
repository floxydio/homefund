describe("Test Bcrypt", () => {
  it("Should Be True", () => {
    let data = "abc";
    let result = bcrypt.compareSync(data, "");
    expect("abc", "");
  });
});
