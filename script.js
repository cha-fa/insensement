// ==========================================
// GESTIONNAIRES DE SECOURS / ETATS DES IMAGES
// ==========================================

/**
 * Gère l'absence ou l'erreur de chargement du logo principal
 * en affichant un logo textuel stylisé de remplacement.
 */
function handleLogoError(img) {
    img.style.display = 'none';
    const fallback = document.getElementById('logo-fallback');
    if (fallback) fallback.classList.remove('hidden');
}

/**
 * Masque le loader une fois que l'image de l'ardoise
 * est entièrement chargée et l'affiche avec une transition fluide.
 */
function handleMenuLoaded(img) {
    const loader = document.getElementById('menu-loader');
    if (loader) loader.classList.add('hidden');
    img.classList.remove('opacity-0');
}

/**
 * Gère les cas où l'ardoise Google Drive est bloquée ou inaccessible
 * en affichant une ardoise textuelle alternative.
 */
function handleMenuError(img) {
    const loader = document.getElementById('menu-loader');
    if (loader) loader.classList.add('hidden');
    const fallback = document.getElementById('menu-error-fallback');
    if (fallback) fallback.classList.remove('hidden');
}

/**
 * Ouvre l'image de l'ardoise dans un nouvel onglet pour l'agrandir.
 */
function openMenuInNewTab() {
    const menuImg = document.getElementById('menu-image');
    if (menuImg && menuImg.src) {
        window.open(menuImg.src, "_blank");
    }
}


// ==========================================
// CONFIGURATION DU CURSEUR ET DES PAILLETTES
// ==========================================
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let discoCursor = null;

// Détection de l'appareil : on n'active le curseur que sur grand écran (PC)
const isDesktop = window.matchMedia("(min-width: 1024px)").matches;


// ==========================================
// INITIALISATION GLOBALE AU CHARGEMENT DU DOM
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialisation globale des icônes Lucide (chargé via CDN sur le HTML)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Branchement dynamique des événements de chargement du menu
    const menuImg = document.getElementById('menu-image');
    if (menuImg) {
        if (menuImg.complete) {
            handleMenuLoaded(menuImg);
        } else {
            menuImg.addEventListener('load', () => handleMenuLoaded(menuImg));
            menuImg.addEventListener('error', () => handleMenuError(menuImg));
        }
    }

    // Activation des fonctionnalités d'effets visuels uniquement sur PC
    if (isDesktop) {
        discoCursor = document.getElementById('custom-disco-cursor');
        
        // Initialisation des positions au centre de l'écran par défaut
        mouseX = window.innerWidth / 2;
        mouseY = window.innerHeight / 2;
        cursorX = mouseX;
        cursorY = mouseY;

        // Suivi de la souris au mouvement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Scintillements fluides légers au mouvement
            if (Math.random() < 0.22) {
                createSparkle(e.clientX, e.clientY);
            }
        });

        // Lancement de l'animation fluide d'inertie
        animateCursor();
    }
});


// Explosion magique d'étoiles colorées au clic ! (Fonctionne partout)
document.addEventListener('click', (e) => {
    for (let i = 0; i < 10; i++) {
        createSparkle(e.clientX, e.clientY, true);
    }
});


/**
 * Animation fluide (effet d'inertie de la boule disco)
 */
function animateCursor() {
    if (!isDesktop) return;

    cursorX += (mouseX - cursorX) * 0.16;
    cursorY += (mouseY - cursorY) * 0.16;
    
    if (discoCursor) {
        discoCursor.style.left = `${cursorX}px`;
        discoCursor.style.top = `${cursorY}px`;
    }
    requestAnimationFrame(animateCursor);
}


/**
 * Crée un élément de paillette magique temporaire à une coordonnée donnée
 */
function createSparkle(x, y, isExplosion = false) {
    const sparkle = document.createElement('div');
    sparkle.className = 'pointer-events-none fixed z-[99999] text-xs select-none';
    
    const sparkles = ['✨', '⭐', '✨', '💜', '💛', '▫️'];
    sparkle.innerText = sparkles[Math.floor(Math.random() * sparkles.length)];
    
    const offset = isExplosion ? 55 : 18;
    const px = x + (Math.random() * offset - (offset/2));
    const py = y + (Math.random() * offset - (offset/2));
    
    sparkle.style.left = `${px}px`;
    sparkle.style.top = `${py}px`;
    sparkle.style.transition = 'all 0.9s cubic-bezier(0.1, 0.8, 0.3, 1)';
    sparkle.style.transform = 'scale(0.4) rotate(0deg)';
    sparkle.style.opacity = '1';
    sparkle.style.textShadow = '0 0 6px rgba(255,215,0,0.8)';
    
    document.body.appendChild(sparkle);

    setTimeout(() => {
        const moveX = (Math.random() - 0.5) * (isExplosion ? 130 : 45);
        const moveY = (Math.random() - 0.5) * (isExplosion ? 130 : 45) - (isExplosion ? 10 : 25);
        sparkle.style.transform = `scale(${Math.random() * 1.3 + 0.6}) translate(${moveX}px, ${moveY}px) rotate(${Math.random() * 360}deg)`;
        sparkle.style.opacity = '0';
    }, 20);

    setTimeout(() => { sparkle.remove(); }, 900);
}