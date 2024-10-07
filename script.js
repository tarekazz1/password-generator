function generatePassword() {
    const siteName = document.getElementById('site-name').value.trim();
    const technique = document.getElementById('technique').value;
    const secretKey = document.getElementById('secret-key').value.trim();

    let visiblePassword = '';

    switch (technique) {
        case 'hash':
            visiblePassword = hashBasedPassword(siteName, secretKey);
            break;
        case 'pattern':
            visiblePassword = patternBasedPassword(siteName, secretKey);
            break;
        case 'mnemonic':
            visiblePassword = mnemonicBasedPassword(siteName, secretKey);
            break;
        case 'shuffle':
            visiblePassword = characterShufflePassword(siteName, secretKey);
            break;
        case 'leet':
            visiblePassword = leetSpeakPassword(siteName, secretKey);
            break;
    }

    // Enforce password strength to ensure it meets strong password criteria
    visiblePassword = enforcePasswordStrength(visiblePassword);

    document.getElementById('visible-password').textContent = visiblePassword;
}

// Function to enforce password strength requirements
function enforcePasswordStrength(password) {
    const requiredLength = 12;

    // Ensure the password contains at least one of each: uppercase, lowercase, number, special character
    if (!/[A-Z]/.test(password)) password += randomCharacter('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (!/[a-z]/.test(password)) password += randomCharacter('abcdefghijklmnopqrstuvwxyz');
    if (!/[0-9]/.test(password)) password += randomCharacter('0123456789');
    if (!/[!@#$%^&*]/.test(password)) password += randomCharacter('!@#$%^&*');

    // Ensure the length is at least `requiredLength`
    while (password.length < requiredLength) {
        password += randomCharacter('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*');
    }

    // Shuffle the password to ensure randomness
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    // Trim if password exceeds the required length
    return password.slice(0, requiredLength);
}

// Helper function to get a random character from a string
function randomCharacter(chars) {
    return chars[Math.floor(Math.random() * chars.length)];
}

// Hash-Based Password Generation
function hashBasedPassword(siteName, secretKey) {
    const combined = secretKey + siteName + new Date().getTime(); // Adding timestamp for uniqueness
    let hash = combined.split('').reduce((acc, char) => acc + char.charCodeAt(0).toString(16), '');
    return hash.slice(0, 8);
}

// Pattern-Based Password Generation
function patternBasedPassword(siteName, secretKey) {
    let randomNumber = Math.floor(Math.random() * 100); // Adding a random number for uniqueness
    let password = siteName.slice(0, 2) + secretKey + siteName.slice(-2) + randomNumber;
    return password;
}

// Mnemonic-Based Password Generation
function mnemonicBasedPassword(siteName, secretKey) {
    let randomSuffix = randomCharacter('!@#$%^&*1234567890'); // Adding random suffix for uniqueness
    let password = secretKey.slice(0, 3) + siteName.slice(0, 3) + randomSuffix;
    return password;
}

// Character Shuffle Password Generation
function characterShufflePassword(siteName, secretKey) {
    let base = (secretKey + siteName + new Date().getTime().toString()).split('');
    let shuffledPassword = base.sort(() => 0.5 - Math.random()).join('');
    return shuffledPassword.slice(0, 8);
}

// Leet Speak Password Generation
function leetSpeakPassword(siteName, secretKey) {
    const base = (secretKey + siteName).replace(/[aeio]/g, char => {
        return {'a': '4', 'e': '3', 'i': '1', 'o': '0'}[char];
    });
    let randomSuffix = randomCharacter('!@#$%^&*1234567890'); // Adding random suffix for uniqueness
    let password = base + randomSuffix;
    return password;
}