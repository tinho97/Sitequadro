// main.js - Versão segura
document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Menu Mobile Simplificado
    // =============================================
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Abrir/Fechar menu mobile
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link (mobile)
    document.querySelectorAll('.nav-menu a:not(.language-dropdown a)').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            // Resetar animação
            document.querySelectorAll('.nav-menu li').forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
            });
        }
    });
});

    // Sistema de Idiomas Seguro
    function applyLanguage(lang) {
        // 1. Esconder todos os textos multilíngues
        const allLangElements = document.querySelectorAll('[data-lang]');
        allLangElements.forEach(el => el.style.display = 'none');
        
        // 2. Mostrar apenas os elementos do idioma selecionado
        const langElements = document.querySelectorAll(`[data-lang="${lang}"]`);
        langElements.forEach(el => el.style.display = '');
        
        // 3. Atualizar metadados
        document.documentElement.lang = lang;
        updateFlagVisual(lang);
    }

    // Configuração do dropdown
    document.querySelectorAll('.language-dropdown a').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            localStorage.setItem('quadro-lang', lang);
            applyLanguage(lang);
        });
    });

    // Inicialização
    const savedLang = localStorage.getItem('quadro-lang') || 'pt';
    applyLanguage(savedLang);
    initLanguage();
});

// Validação de Formulário
const contactForm = document.querySelector('.contact form');
contactForm.addEventListener('submit', function (e) {
  const name = this.querySelector('input[name="name"]').value.trim();
  const email = this.querySelector('input[name="email"]').value.trim();
  const message = this.querySelector('textarea[name="message"]').value.trim();

  if (!name || !email || !message) {
    e.preventDefault();
    alert('Por favor, preencha todos os campos.');
  }
});

function handleSubmit(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Captura os dados do formulário
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Verifica qual botão foi clicado
  if (event.submitter.name === 'email') {
    // Envia por e-mail usando Formspree
    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert('Mensagem enviada com sucesso!');
        form.reset(); // Limpa o formulário após o envio
      } else {
        alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
      }
    })
    .catch(error => {
      alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
    });
  } else if (event.submitter.name === 'whatsapp') {
    // Redireciona para o WhatsApp
    const text = `Olá, meu nome é ${name} (${email}). ${message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/+5521991444917?text=${encodedText}`, '_blank');
  }
}