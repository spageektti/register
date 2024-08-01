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

function sha256(str) {
    return CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
}

async function checkPasswordPwned(password) {
    const hash = sha256(password);
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5).toUpperCase();

    try {
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        const data = await response.text();
        const lines = data.split('\n');

        for (const line of lines) {
            const [hashSuffix, count] = line.split(':');
            if (hashSuffix === suffix) {
                return parseInt(count);
            }
        }
    } catch (error) {
        console.error('Error fetching pwned passwords:', error);
    }
    return 0;
}

async function check() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const email = document.querySelector('#email').value;

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
    }

    // Password validation
    if (password.toLowerCase().includes('you')) {
        passwordError.textContent = "Password is too weak.";
    }
    else if (password.toLowerCase().includes('chuck') || password.toLowerCase().includes('norris')) {
        passwordError.textContent = "Password is too strong.";
    } else if (password.toLowerCase().includes('password')) {
        passwordError.textContent = "If your password is 'password', we need to have a serious talk.";
    } else if (password.includes('zaq1@WSX')) {
        passwordError.textContent = "Really? 'zaq1@WSX'? This password is like a school uniform - everyone's wearing it! Pick something unique.";
    }
    else if (password.length < 8) {
        passwordError.textContent = "Your password is too short, like you. At least 180cm... Uhh I mean at least 8 characters needed.";
    } else if (!/[A-Z]/.test(password)) {
        passwordError.textContent = "Add some uppercase letters! Passwords need to shout sometimes too.";
    } else if (!/[0-9]/.test(password)) {
        passwordError.textContent = "Add some numbers! It's like a password, but with a sprinkle of math.";
    } else if (doSomething()) {
        passwordError.textContent = `${await getRandomUsername()} already uses this password. Try something more creative.`;
    }
    else {
        const pwnedCount = await checkPasswordPwned();

        passwordError.textContent = `Your password has been seen ${pwnedCount} times before! Time to get more creative.`;


        //    passwordError.textContent = "";

    }

    // Email validation
    if (!email.includes('@')) {
        emailError.textContent = "Missing an '@' symbol. Did you mean to send a smoke signal instead?";
    } else if (!email.includes('.')) {
        emailError.textContent = "An email without a dot? Sounds like an unfinished sentence. Please include a domain.";
    } else if (email.split('@')[0].length < 3) {
        emailError.textContent = "The part before the '@' is too short. Give it some personality!";
    } else {
        emailError.textContent = "";
    }
}