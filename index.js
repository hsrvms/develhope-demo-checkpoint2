const userNameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginBtn");
const registerButton = document.getElementById("registerBtn");
const displayButton = document.getElementById("displayBtn");
const storageContainer = document.getElementById("storageContainer");

function handleRegister(e) {
	e.preventDefault();

	const userName = userNameInput.value;
	const password = passwordInput.value;

	if (!userName || !password) {
		alert("Username or Password cannot be null");
		return;
	}

	const users = JSON.parse(localStorage.getItem("users")) || [];
	let userObject = JSON.parse(localStorage.getItem(userName));

	if (!userObject) {
		userObject = {
			username: userName,
			password: password,
			loginCount: 0,
		};

		users.push(userObject);

		localStorage.setItem(userName, JSON.stringify(userObject));
		localStorage.setItem("users", JSON.stringify(users));
	} else {
		alert("There is a person that has the same User Name");
	}
}

function handleLogin(e) {
	e.preventDefault();

	const userName = userNameInput.value;
	const password = passwordInput.value;

	if (!userName || !password) {
		alert("Username or Password cannot be null");
		return;
	}

	const userObject = JSON.parse(localStorage.getItem(userName));
	const users = JSON.parse(localStorage.getItem("users")) || [];

	if (!userObject) {
		alert("There is no such User");
	} else if (password !== userObject.password) {
		alert("Paswords are not mached");
	} else {
		userObject.loginCount++;

		const index = users.findIndex((user) => user.username === userName);
    users[index].loginCount = userObject.loginCount;

		localStorage.setItem(userName, JSON.stringify(userObject));
		localStorage.setItem("users", JSON.stringify(users));
	}
}

function handleDisplay() {
  const users = localStorage.getItem('users');
  storageContainer.innerText = users;
  
  console.log(users)
}

registerButton.addEventListener("click", handleRegister);
loginButton.addEventListener("click", handleLogin);
displayButton.addEventListener("click", handleDisplay)

// localStorage.clear();
