window.addEventListener("keypress", e => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
        key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if (!key) return;

    key.classList.add('playing');
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    

    key.style.transform = 'translateY(10px)';

});

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key =>
    key.addEventListener('transitionend', removeTransition)
);

