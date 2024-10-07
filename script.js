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
        default:
            visiblePassword = 'Invalid Technique';
    }

    document.getElementById('visible-password').textContent = visiblePassword;
}

function hashBasedPassword(siteName, secretKey) {
    return btoa(`${siteName}:${secretKey}`);
}

function patternBasedPassword(siteName, secretKey) {
    return `${siteName.split('').reverse().join('')}-${secretKey}`;
}

function mnemonicBasedPassword(siteName, secretKey) {
    return `${secretKey.slice(0, 3)}-${siteName.slice(-3)}`;
}

function characterShufflePassword(siteName, secretKey) {
    const combined = (siteName + secretKey).split('');
    for (let i = combined.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combined[i], combined[j]] = [combined[j], combined[i]];
    }
    return combined.join('');
}

function leetSpeakPassword(siteName, secretKey) {
    const leetMap = { 'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5' };
    return (siteName + secretKey).replace(/[aeios]/g, char => leetMap[char] || char);
}

document.addEventListener('DOMContentLoaded', () => {
    const interBubble = document.querySelector('.interactive');
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const move = () => {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(move);
    };

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
});
