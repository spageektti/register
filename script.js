const usernameError = document.querySelector('#username-error-message');
const passwordError = document.querySelector('#password-error-message');
const emailError = document.querySelector('#email-error-message');
const otherError = document.querySelector('#other-error-message');
let finishedTheGame = false;
let howManyErrorMessages = 0;

function doSomething(chance) {
    if (Math.floor(Math.random() * chance) == 0) {
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

function getSecondsDifference() {
    const currentDate = new Date();
    const specifiedDate = new Date('2024-08-02T14:00:00');
    const differenceInMilliseconds = specifiedDate - currentDate;
    return Math.floor(differenceInMilliseconds / 1000);
}

function getErrorMessage() {
    const errorMessages = [
        "Something’s off, like pineapple on pizza. Try again!",
        "Your form submission went to the land of lost socks. Try again later!",
        "Oops! This form submission just vanished into the void. Check your details and try again!",
        "It seems the server has taken a coffee break. Please wait and try again soon!",
        "Our servers are currently hosting a dance party. Please come back later!",
        "Looks like the internet is on vacation. Try reloading in a bit!",
        "The form has gone on a treasure hunt. Please try again after it returns!",
        "Oops! We seem to have misplaced the form. Can you please try again?",
        "The form got lost in the labyrinth of the web. Try navigating it again!",
        "Our servers are currently playing hide and seek. Please try again shortly!",
        "Our servers are having a moment of zen. Please wait and try again soon.",
        "Our servers are on a brief mission to Mars. Please try again shortly!",
        "Our servers are in a state of existential crisis. Please give it another go later!",
        "The form seems to be stuck in a traffic jam. Please try again in a moment!",
        "Our servers are playing an intense game of chess. Check back in a bit!",
        "Oops! It looks like a cat walked across our keyboard and broke the 'Register' button. Please try again in a moment!",
        "It seems a cat decided to help with our coding. Please give us a moment to clean up the mess!",
        "Our servers are currently being explored by a curious cat. Please try again in a bit!"
    ];
    return errorMessages[howManyErrorMessages];
}

async function check() {
    if (finishedTheGame) {
        return;
    }

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
    } else if (username.toLowerCase().includes("admin")) {
        usernameError.textContent = "Nice try, but 'admin' is reserved for the real admins.";
    } else if (/[^\x00-\x7F]/.test(username)) {
        usernameError.textContent = "₣ǂΔ℧⩔∿⨀⟟⊚⦏⨉⌧⌗⅃⊱⨉⨀";
    }
    else if (/<script.*?>.*?<\/script>|<.*?on\w+.*?>|javascript:|eval\(|iframe|object|embed|src\s*=\s*['"]?data:/i.test(username)) {
        usernameError.textContent = "Nice try, script kiddie.";
    }
    else if (username.includes("spageektti")) {
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
    else if (/<script.*?>.*?<\/script>|<.*?on\w+.*?>|javascript:|eval\(|iframe|object|embed|src\s*=\s*['"]?data:/i.test(password)) {
        passwordError.textContent = "Nice try, script kiddie.";
    }
    else if (/[^\x00-\x7F]/.test(password)) {
        passwordError.textContent = "₣ǂΔ℧⩔∿⨀⟟⊚⦏⨉⌧⌗⅃⊱⨉⨀";
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
    } else if (!password.includes(`${dd}.${mm}.${yyyy}`)) {
        passwordError.textContent = "Your password should contain current date(dd.mm.yyyy)";
    } else if (doSomething(1)) {
        passwordError.textContent = `${await getRandomUsername()} already uses this password. Try something more creative.`;
    }
    else {
        passwordError.textContent = "";
        passwordOk = true;
    }

    // Email validation
    if (!email.includes('@')) {
        emailError.textContent = "Missing an '@' symbol. Did you mean to send a smoke signal instead?";
    }
    else if (/<script.*?>.*?<\/script>|<.*?on\w+.*?>|javascript:|eval\(|iframe|object|embed|src\s*=\s*['"]?data:/i.test(email)) {
        emailError.textContent = "Nice try, script kiddie.";
    }
    else if (/[^\x00-\x7F]/.test(email)) {
        emailError.textContent = "₣ǂΔ℧⩔∿⨀⟟⊚⦏⨉⌧⌗⅃⊱⨉⨀";
    }
    else if (!email.includes('.')) {
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
        if (navigator.userAgent.indexOf('Windows') !== -1) {
            otherError.textContent = "Everything seems OK, but I hate Windows. Try another OS."
        }
        else if (howManyErrorMessages < 18) {
            otherError.textContent = getErrorMessage();
            howManyErrorMessages++;
        }
        else {
            otherError.style.fontSize = `20px`;
            finishedTheGame = true;
            otherError.textContent = `Form sent succesfully. Cool, but our offer ended ${getSecondsDifference()} seconds ago.`;
        }
    } else {
        otherError.textContent = "";
    }
}