// INFRATECH SALTILLO — CUSTOM JAVASCRIPT

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Footer Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 3. Navbar Shadow on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-xl', 'bg-brand-dark/95');
        } else {
            navbar.classList.remove('shadow-xl', 'bg-brand-dark/95');
        }
    });

    // 4. WhatsApp Form Generator
    const whatsappForm = document.getElementById('whatsapp-form');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const empresa = document.getElementById('empresa').value.trim() || 'Particular';
            const servicio = document.getElementById('servicio').value;
            const mensaje = document.getElementById('mensaje').value.trim();

            const phoneNumber = '528444051786';

            // Construct formatted WhatsApp message
            let text = `*SOLICITUD DE SERVICIO — INFRATECH SALTILLO*\n\n`;
            text += `👤 *Nombre:* ${nombre}\n`;
            text += `🏢 *Empresa/Negocio:* ${empresa}\n`;
            text += `🛠️ *Servicio Requerido:* ${servicio}\n\n`;
            text += `📝 *Detalles/Consulta:*\n${mensaje}\n\n`;
            text += `_Enviado desde el sitio web de InfraTech Saltillo_`;

            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
        });
    }
});
