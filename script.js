// Initialisation des icônes Lucide
lucide.createIcons();

// ==========================================
// CURSEUR BOULE DISCO INTERACTIF
// ==========================================
const discoCursor = document.getElementById('custom-disco-cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Scintillements fluides au mouvement
    if (Math.random() < 0.22) {
        createSparkle(e.clientX, e.clientY);
    }
});

document.addEventListener('click', (e) => {
    // Explosion magique d'étoiles au clic
    for (let i = 0; i < 10; i++) {
        createSparkle(e.clientX, e.clientY, true);
    }
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.16;
    cursorY += (mouseY - cursorY) * 0.16;
    
    if (discoCursor) {
        discoCursor.style.left = `${cursorX}px`;
        discoCursor.style.top = `${cursorY}px`;
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

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

// Fallbacks de secours du menu
function handleLogoError(img) {
    img.style.display = 'none';
    document.getElementById('logo-fallback').classList.remove('hidden');
}

function handleMenuLoaded(img) {
    document.getElementById('menu-loader').classList.add('hidden');
    img.classList.remove('opacity-0');
}

function handleMenuError(img) {
    document.getElementById('menu-loader').classList.add('hidden');
    document.getElementById('menu-error-fallback').classList.remove('hidden');
}

function openMenuInNewTab() {
    const menuImg = document.getElementById('menu-image');
    window.open(menuImg.src, "_blank");
}

// ==========================================
// CONTRÔLEUR D'AMBIANCE DE LA PIÈCE
// ==========================================
function setLightMode(mode) {
    document.body.classList.remove('light-warm', 'light-violet', 'light-iridescent', 'light-disco');
    
    const orb1 = document.getElementById('glow-orb-1');
    const orb2 = document.getElementById('glow-orb-2');
    const orb3 = document.getElementById('glow-orb-3');

    orb1.style.animation = '';
    orb2.style.animation = '';
    orb3.style.animation = '';

    const btns = ['warm', 'violet', 'iridescent', 'disco'];
    btns.forEach(b => {
        const btn = document.getElementById(`btn-${b}`);
        if (btn) btn.className = "px-3.5 py-1.5 rounded-full text-[#7C38A8]/90 hover:bg-white/40 font-medium transition-all";
    });

    btns.forEach(b => {
        const btn = document.getElementById(`btn-${b}-m`);
        if (btn) btn.className = "px-3 py-1.5 rounded-full text-[11px] text-[#7C38A8] font-medium transition-all";
    });

    if (mode === 'iridescent') {
        document.body.classList.add('light-iridescent');
        document.getElementById('btn-iridescent').className = "px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#7C38A8] to-[#BA91D6] text-white font-semibold transition-all shadow-md";
        document.getElementById('btn-iridescent-m').className = "px-3 py-1.5 rounded-full text-[11px] bg-gradient-to-r from-[#7C38A8] to-[#BA91D6] text-white font-semibold transition-all shadow-sm";
        orb1.style.backgroundColor = '#7C38A8';
        orb2.style.backgroundColor = '#FFD700';
        orb3.style.backgroundColor = '#BA91D6';
    } else if (mode === 'disco') {
        document.body.classList.add('light-disco');
        document.getElementById('btn-disco').className = "px-3.5 py-1.5 rounded-full bg-[#E60067] text-white font-semibold transition-all shadow-md";
        document.getElementById('btn-disco-m').className = "px-3 py-1.5 rounded-full text-[11px] bg-[#E60067] text-white font-semibold transition-all shadow-sm";
        orb1.style.backgroundColor = '#7C38A8';
        orb2.style.backgroundColor = '#FFD700';
        orb3.style.backgroundColor = '#BA91D6';
    } else if (mode === 'warm') {
        document.body.classList.add('light-warm');
        document.getElementById('btn-warm').className = "px-3.5 py-1.5 rounded-full bg-white text-[#7C38A8] font-semibold transition-all shadow-md";
        document.getElementById('btn-warm-m').className = "px-3 py-1.5 rounded-full text-[11px] bg-[#7C38A8] text-white font-semibold transition-all shadow-sm";
        orb1.style.backgroundColor = '#FFD700';
        orb2.style.backgroundColor = '#BA91D6';
        orb3.style.backgroundColor = '#ECDFD4';
    } else if (mode === 'violet') {
        document.body.classList.add('light-violet');
        document.getElementById('btn-violet').className = "px-3.5 py-1.5 rounded-full bg-[#7C38A8] text-white font-semibold transition-all shadow-md";
        document.getElementById('btn-violet-m').className = "px-3 py-1.5 rounded-full text-[11px] bg-[#7C38A8] text-white font-semibold transition-all shadow-sm";
        orb1.style.backgroundColor = '#7C38A8';
        orb2.style.backgroundColor = '#22132C';
        orb3.style.backgroundColor = '#BA91D6';
    }
}
