// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Pengaman: Hanya jalankan jika hamburger dan navMenu ada di halaman tersebut
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
        } else {
            navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)';
        }
    });
}

// ===== ACTIVE NAV LINK =====
// Perbaikan logic agar support di GitHub Pages walau URL berakhiran '/'
let currentPage = window.location.pathname.split('/').pop();
if (currentPage === '' || currentPage === undefined) currentPage = 'index.html';

document.querySelectorAll('.nav-menu a').forEach(link => {
    const linkPage = link.getAttribute('href')?.split('/').pop();
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// ===== SCROLL ANIMATION =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Pastikan elemen ditemukan sebelum diamati
const animatedElements = document.querySelectorAll('.feature-card, .materi-card');
if (animatedElements.length > 0) {
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ===== COUNTER ANIMATION =====
const animateCounters = () => {
    document.querySelectorAll('.stat-number').forEach(stat => {
        // Ambil teks asli (berjaga-jaga jika ada tanda '+' seperti '100+')
        const originalText = stat.textContent;
        const target = parseInt(originalText.replace(/[^0-9]/g, '')) || 0; 
        const suffix = originalText.replace(/[0-9]/g, ''); // Simpan tanda tambah dll
        
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(timer);
            } else {
                stat.textContent = Math.ceil(current) + suffix;
            }
        }, 30);
    });
};

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// ===== FORM REFLEKSI =====
const refleksiForm = document.getElementById('refleksiForm');
if (refleksiForm) {
    refleksiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nama = document.getElementById('namaSiswa')?.value;
        const refleksi = document.getElementById('refleksi')?.value;
        if (!nama || !refleksi) {
            alert('Mohon isi nama dan jurnal refleksi!');
            return;
        }
        alert('Terima kasih! Jurnal refleksi berhasil dikirim.');
        refleksiForm.reset();
    });
}

// ===== KUIS =====
const kuisForm = document.getElementById('kuisForm');
if (kuisForm) {
    kuisForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const questions = kuisForm.querySelectorAll('.soal');
        let answered = 0;
        questions.forEach(soal => {
            if (soal.querySelector('input[type="radio"]:checked')) answered++;
        });
        if (answered < questions.length) {
            alert(`Anda baru menjawab ${answered} dari ${questions.length} soal!`);
            return;
        }
        alert('Selamat! Kuis berhasil diselesaikan.');
    });
}

console.log('%c🚀 E-Worksheet Fluida Dinamis Ready!', 'font-size:16px; font-weight:bold; color:#2563eb;');
