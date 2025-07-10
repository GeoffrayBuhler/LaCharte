document.addEventListener("DOMContentLoaded", function() {
    const bloups = document.querySelector('#bloups');

    bloups.addEventListener('click', function() {
        const croissantCount = 20; // nombre de croissants à afficher
        const croissantImg = './img/gg.png'; // lien image croissant
        const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // lien musique

        audio.play();

        for (let i = 0; i < croissantCount; i++) {
            setTimeout(() => {
                const img = document.createElement('img');
                img.src = croissantImg;
                img.style.position = 'fixed';
                img.style.zIndex = 9999;
                img.classList.add('croissant');
                // Taille aléatoire (ratio conservé)
                const baseWidth = 80;
                const scale = 0.5 + Math.random() * 1.5;
                img.width = baseWidth * scale;
                img.height = baseWidth * scale; // ratio 0.7
                // Position aléatoire
                img.style.left = `${Math.random() * (window.innerWidth - img.width)}px`;
                img.style.top = `${Math.random() * (window.innerHeight - img.height)}px`;
                // Rotation aléatoire
                const rotation = Math.random() * 360;
                img.style.transform = `rotate(${rotation}deg)`;
                document.body.appendChild(img);
            }, i * 200); // délai pour effet "un par un"
        }
    });
});