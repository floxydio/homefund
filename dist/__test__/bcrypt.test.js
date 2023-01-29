"use strict";
const bcrpyt = require("bcrypt");
describe("Test Bcrypt", () => {
    it("Should Be True", () => {
        let data = "abc";
        let result = bcrpyt.compareSync(data, "");
        // expect("abc", "");
    });
});
