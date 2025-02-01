// Menu de Navegação Responsivo
const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');

menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Fechar o menu ao clicar em um link (para dispositivos móveis)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove('active');
    }
  });
});

// Scroll Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Variáveis globais
let currentImageIndex = 0;
const images = document.querySelectorAll('.carousel-item');

// Função para trocar as imagens do carrossel
function changeImage() {
  // Remove a classe 'active' da imagem atual
  images[currentImageIndex].classList.remove('active');

  // Avança para a próxima imagem (ou volta ao início se for a última)
  currentImageIndex = (currentImageIndex + 1) % images.length;

  // Adiciona a classe 'active' à nova imagem
  images[currentImageIndex].classList.add('active');
}

// Inicia o carrossel automático
function startCarousel() {
  setInterval(changeImage, 5000); // Troca a imagem a cada 5 segundos
}

// Navega para a imagem anterior
function prevImage() {
  images[currentImageIndex].classList.remove('active');
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  images[currentImageIndex].classList.add('active');
}

// Navega para a próxima imagem
function nextImage() {
  images[currentImageIndex].classList.remove('active');
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].classList.add('active');
}

// Inicializa o carrossel
startCarousel();

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

// Botão de Voltar ao Topo
const backToTopButton = document.createElement('button');
backToTopButton.classList.add('back-to-top');
backToTopButton.innerHTML = '↑';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
// Função para animação de revelação
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active'); // Adiciona a classe 'active' quando o elemento está visível
          observer.unobserve(entry.target); // Para de observar o elemento após a animação
        }
      });
    }, {
      threshold: 0.5 // Define que a animação deve começar quando 50% do elemento estiver visível
    });
  
    reveals.forEach(reveal => {
      observer.observe(reveal); // Observa cada elemento com a classe 'reveal'
    });
  }
  
  // Executa a função ao carregar a página e ao rolar
  window.addEventListener('load', revealOnScroll);
  window.addEventListener('scroll', revealOnScroll);