const usernameError = document.querySelector('#username-error-message');
const passwordError = document.querySelector('#password-error-message');
const emailError = document.querySelector('#email-error-message');
const otherError = document.querySelector('#other-error-message');

function doSomething() {
    if (Math.floor(Math.random() * 2) == 0) {
        return false;
    }
    return true;
}

async function getRandomUsername() {
    try {
        const response = await fetch('https://usernameapiv1.vercel.app/api/random-usernames');
        const data = await response.json();
        if (data && data.usernames && data.usernames.length > 0) {
            return data.usernames[0];
        }
    } catch (error) {
        console.error('Error fetching random username:', error);
    }
}

function checkSequentialChars(password) {
    const sequential = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < password.length - 1; i++) {
        if (sequential.includes(password.substring(i, i + 2))) {
            return true;
        }
    }
    return false;
}

async function check() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const email = document.querySelector('#email').value;

    let usernameOk = false;
    let passwordOk = false;
    let emailOk = false;

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    // Username validation
    if (username.length === 0) {
        usernameError.textContent = "Who are you? A ghost? Please enter a username!";
    } else if (username.includes("spageektti")) {
        usernameError.textContent = "That's me.";
    }
    else if (username.length < 4) {
        usernameError.textContent = "Your username is shorter than a tweet. Make it at least 4 characters!";
    } else if (username.includes(' ')) {
        usernameError.textContent = "No spaces allowed! This isn't a sentence, it's a username.";
    } else {
        usernameError.textContent = "";
        usernameOk = true;
    }

    // Password validation
    if (password.toLowerCase().includes("never gonna give you up") || password.toLowerCase().includes("rick roll")) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
    else if (password.toLowerCase().includes('you')) {
        passwordError.textContent = "Password is too weak.";
    }
    else if (password.toLowerCase().includes('chuck') || password.toLowerCase().includes('norris')) {
        passwordError.textContent = "Password is too strong.";
    } else if (password.toLowerCase().includes('password')) {
        passwordError.textContent = "If your password is 'password', we need to have a serious talk.";
    } else if (password.includes('zaq1@WSX')) {
        passwordError.textContent = "Really? 'zaq1@WSX'? This password is like a school uniform - everyone's wearing it! Pick something unique.";
    } else if (password.includes("12345")) {
        passwordError.textContent = "Using '123456' as your password? You might as well leave the door open!";
    } else if (/^\d+$/.test(password)) {
        passwordError.textContent = "What is this, a phone number?";
    } else if (checkSequentialChars(password)) {
        passwordError.textContent = "This isn’t a sequence game.";
    }
    else if (password.length < 8) {
        passwordError.textContent = "Your password is too short, like you. At least 180cm... Uhh I mean at least 8 characters needed.";
    } else if (!/[A-Z]/.test(password)) {
        passwordError.textContent = "Add some uppercase letters! Passwords need to shout sometimes too.";
    } else if (!/[0-9]/.test(password)) {
        passwordError.textContent = "Add some numbers! It's like a password, but with a sprinkle of math.";
    } else if (!password.includes(f`${dd}.${mm}.${yyyy}`)) {
        passwordError.textContent = "Your password should contain current date(dd.mm.yyyy)";
    } else if (doSomething()) {
        passwordError.textContent = `${await getRandomUsername()} already uses this password. Try something more creative.`;
    }
    else {
        passwordError.textContent = "";
        passwordOk = true;
    }

    // Email validation
    if (!email.includes('@')) {
        emailError.textContent = "Missing an '@' symbol. Did you mean to send a smoke signal instead?";
    } else if (!email.includes('.')) {
        emailError.textContent = "An email without a dot? Sounds like an unfinished sentence. Please include a domain.";
    } else if ((email.match(/@/g) || []).length > 1) {
        emailError.textContent = "Your email has multiple '@' symbols. This isn't a Mastodon handle.";
    } else if ((email.match(/\./g) || []).length > 1) {
        emailError.textContent = "Your email has too many dots. It's not a Morse code message!";
    }
    else if (email.split('@')[0].length < 6) {
        emailError.textContent = "The part before the '@' is too short. Give it some personality!";
    } else if (email.split('@')[1] === "example.com") {
        emailError.textContent = "Nice try.";
    } else if (
        email.split('@')[1] === "gmail.com"
    ) {
        emailError.textContent = "I hate Google.";
    }
    else {
        emailError.textContent = "";
        emailOk = true;
    }

    if (usernameOk && passwordOk && emailOk) {

    }
}