const { myFunction } = require('./scripts');

test('hello world!', () => {
	expect(myFunction()).toBe('expected output');
});

test("username input with valid value", () => {
  document.body.innerHTML = '<input type="text" id="username" />';
  const usernameInput = document.getElementById("username");
  usernameInput.value = "Valid@123";
  usernameInput.dispatchEvent(new Event("input"));

  expect(usernameInput.style.borderColor).toBe("green");
});

test("username input with invalid value", () => {
  document.body.innerHTML = '<input type="text" id="username" />';
  const usernameInput = document.getElementById("username");
  usernameInput.value = "invalid";
  usernameInput.dispatchEvent(new Event("input"));

  expect(usernameInput.style.borderColor).toBe("red");
});