// Existing password generator functions
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

    document.getElementById('visible-password').textContent = visiblePassword;
}

// New interactivity from CodePen
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
