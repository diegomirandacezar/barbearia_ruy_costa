/**
 * Barbearia Ruy Costa - Script Principal
 * Vanilla JS limpo, modular e de alta performance
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initCounters();
  initFormAgendamento();
  initGalleryLightbox();
  initPhoneMask();
  initDateConstraints();
  initBookingModal();
});

/* ==========================================================================
   1. Navbar - Transição de Fundo no Scroll e Links Ativos
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }

    // Identificar seção visível para link ativo
    const scrollY = window.pageYOffset + 120;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-[#D4AF37]', 'font-semibold');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-[#D4AF37]', 'font-semibold');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Menu Mobile Responsivo
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  function toggleMenu() {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
    
    // Animação de ícone hamburger para X
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');
    if (hamburgerIcon && closeIcon) {
      hamburgerIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    }
  }

  menuBtn.addEventListener('click', toggleMenu);

  // Fechar ao clicar em qualquer link
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.add('hidden');
      const hamburgerIcon = document.getElementById('hamburger-icon');
      const closeIcon = document.getElementById('close-icon');
      if (hamburgerIcon && closeIcon) {
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
      const hamburgerIcon = document.getElementById('hamburger-icon');
      const closeIcon = document.getElementById('close-icon');
      if (hamburgerIcon && closeIcon) {
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    }
  });
}

/* ==========================================================================
   3. Animações de Entrada no Scroll (Intersection Observer)
   ========================================================================== */
function initScrollReveal() {
  // Respeitar preferência de movimento reduzido
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-init').forEach(el => el.classList.add('reveal-active'));
    return;
  }

  const revealElements = document.querySelectorAll('.reveal-init');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. Animação de Contadores Numéricos (Avaliação 5.0 e 4 Avaliações)
   ========================================================================== */
function initCounters() {
  const ratingEl = document.getElementById('counter-rating');
  const reviewsEl = document.getElementById('counter-reviews');

  if (!ratingEl || !reviewsEl) return;

  let animated = false;
  const statsSection = document.getElementById('sobre');

  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      animateRating(ratingEl, 5.0, 1200);
      animateInteger(reviewsEl, 4, 1000);
    }
  }, { threshold: 0.3 });

  observer.observe(statsSection);

  function animateRating(element, target, duration) {
    let start = 0;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = '5,0';
        clearInterval(timer);
      } else {
        element.textContent = start.toFixed(1).replace('.', ',');
      }
    }, stepTime);
  }

  function animateInteger(element, target, duration) {
    let start = 0;
    const stepTime = 100;
    const steps = duration / stepTime;
    const increment = Math.ceil(target / steps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = start;
      }
    }, stepTime);
  }
}

/* ==========================================================================
   5. Formulário de Agendamento -> WhatsApp
   ========================================================================== */
function initFormAgendamento() {
  const form = document.getElementById('form-agendamento');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('form-nome').value.trim();
    const telefone = document.getElementById('form-telefone').value.trim();
    const servico = document.getElementById('form-servico').value;
    const data = document.getElementById('form-data').value;
    const horario = document.getElementById('form-horario').value;
    const mensagem = document.getElementById('form-mensagem').value.trim();

    // Validação básica
    if (!nome) {
      showFormFeedback('Por favor, informe seu nome.', 'error');
      document.getElementById('form-nome').focus();
      return;
    }

    if (!telefone || telefone.length < 14) {
      showFormFeedback('Por favor, informe um telefone válido com DDD.', 'error');
      document.getElementById('form-telefone').focus();
      return;
    }

    if (!servico) {
      showFormFeedback('Por favor, selecione o serviço desejado.', 'error');
      document.getElementById('form-servico').focus();
      return;
    }

    // Formatar data para exibição (dd/mm/aaaa)
    let dataFormatada = 'A combinar';
    if (data) {
      const partes = data.split('-');
      if (partes.length === 3) {
        dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
      }
    }

    const horarioFormatado = horario || 'A combinar';

    // Montar mensagem exatamente como exigido na especificação
    let textoWhats = `Olá, Ruy! Gostaria de agendar um horário.\n\n`;
    textoWhats += `Nome: ${nome}\n`;
    textoWhats += `Telefone: ${telefone}\n`;
    textoWhats += `Serviço: ${servico}\n`;
    textoWhats += `Data desejada: ${dataFormatada}\n`;
    textoWhats += `Horário desejado: ${horarioFormatado}\n\n`;
    textoWhats += `Mensagem:\n${mensagem || 'Olá! Gostaria de verificar a disponibilidade para o horário indicado.'}`;

    const numeroWhats = '5511987026977';
    const urlWhats = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(textoWhats)}`;

    showFormFeedback('Redirecionando para o WhatsApp da Barbearia...', 'success');

    setTimeout(() => {
      window.open(urlWhats, '_blank', 'noopener,noreferrer');
    }, 600);
  });

  function showFormFeedback(msg, type) {
    const feedbackEl = document.getElementById('form-feedback');
    if (!feedbackEl) return;

    feedbackEl.textContent = msg;
    feedbackEl.className = `p-3 rounded-lg text-sm text-center font-medium transition-all ${
      type === 'error' 
        ? 'bg-red-950/80 border border-red-500/50 text-red-200' 
        : 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-200'
    }`;
    feedbackEl.classList.remove('hidden');

    if (type === 'error') {
      setTimeout(() => {
        feedbackEl.classList.add('hidden');
      }, 5000);
    }
  }
}

/* ==========================================================================
   6. Máscara de Telefone Brasileira: (11) 99999-9999
   ========================================================================== */
function applyPhoneMask(telInput) {
  if (!telInput) return;

  telInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    e.target.value = value;
  });
}

function initPhoneMask() {
  applyPhoneMask(document.getElementById('form-telefone'));
}

/* ==========================================================================
   7. Restrição de Data Mínima (Hoje em diante)
   ========================================================================== */
function initDateConstraints() {
  const dateInput = document.getElementById('form-data');
  if (!dateInput) return;

  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

/* ==========================================================================
   8. Lightbox para Visualização da Galeria
   ========================================================================== */
function initGalleryLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!modal || !modalImg) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.getAttribute('data-title') || img.getAttribute('alt') || 'Barbearia Ruy Costa';
      
      modalImg.src = img.src;
      modalImg.alt = title;
      if (modalCaption) modalCaption.textContent = title;
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-backdrop')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. Sistema de Solicitação de Agendamento (Modal com Horários Sugeridos)
   ========================================================================== */

// Configuração central e editável dos horários sugeridos da barbearia
const agenda = {
  segunda: [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30"
  ],
  terca: [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30"
  ],
  quarta: [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30"
  ],
  quinta: [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30"
  ],
  sexta: [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30"
  ],
  sabado: [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
    "16:30", "17:00"
  ],
  domingo: [] // Fechado aos domingos
};

function initBookingModal() {
  const modal = document.getElementById('modal-agendamento');
  if (!modal) return;

  const closeBtn = document.getElementById('modal-agendamento-close');
  const triggerBtns = document.querySelectorAll('[data-open-agendamento-modal], .open-agendamento-modal');
  
  // Elementos das Etapas
  const steps = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3'),
    document.getElementById('step-4'),
    document.getElementById('step-5')
  ];
  const stepIndicators = document.querySelectorAll('.step-indicator');
  const stepLines = document.querySelectorAll('.step-line');
  const alertBox = document.getElementById('booking-alert');

  // Elementos do Calendário
  const calPrevBtn = document.getElementById('cal-prev-month');
  const calNextBtn = document.getElementById('cal-next-month');
  const calMonthTitle = document.getElementById('cal-month-title');
  const calGrid = document.getElementById('calendar-grid');
  const btnGotoStep2 = document.getElementById('btn-goto-step-2');

  // Elementos da Etapa 2
  const selectedDateBadge = document.getElementById('selected-date-badge');
  const slotsContainer = document.getElementById('slots-container');
  const btnBackToStep1 = document.getElementById('btn-back-to-step-1');
  const btnGotoStep3 = document.getElementById('btn-goto-step-3');

  // Elementos da Etapa 3
  const inputNome = document.getElementById('booking-nome');
  const inputTelefone = document.getElementById('booking-telefone');
  const selectServico = document.getElementById('booking-servico');
  const inputObs = document.getElementById('booking-obs');
  const btnBackToStep2 = document.getElementById('btn-back-to-step-2');
  const btnGotoStep4 = document.getElementById('btn-goto-step-4');

  // Elementos da Etapa 4 (Resumo)
  const summaryData = document.getElementById('summary-data');
  const summaryHorario = document.getElementById('summary-horario');
  const summaryNome = document.getElementById('summary-nome');
  const summaryTelefone = document.getElementById('summary-telefone');
  const summaryServico = document.getElementById('summary-servico');
  const summaryObs = document.getElementById('summary-obs');
  const btnBackToStep3 = document.getElementById('btn-back-to-step-3');
  const btnSubmitWhatsapp = document.getElementById('btn-submit-whatsapp');

  // Elementos da Etapa 5
  const sentData = document.getElementById('sent-data');
  const sentHorario = document.getElementById('sent-horario');
  const btnModalConcluir = document.getElementById('btn-modal-concluir');

  // Aplicar máscara brasileira no telefone do agendamento
  applyPhoneMask(inputTelefone);

  // Mapeamentos de Dias e Meses em Português
  const dayNames = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  let currentStep = 1;
  let viewDate = new Date();
  let selectedDate = null;
  let selectedDateFormatted = '';
  let selectedSlot = null;

  // Abrir Modal
  function openModal(preselectedService) {
    if (preselectedService && selectServico) {
      selectServico.value = preselectedService;
    }
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    goToStep(1);
    renderCalendar();
  }

  // Fechar Modal
  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (alertBox) alertBox.classList.add('hidden');
  }

  // Vincular Triggers
  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service');
      openModal(service);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (btnModalConcluir) btnModalConcluir.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Alerta Inline Integrado ao Design (sem alert padrão)
  function showAlert(msg) {
    if (!alertBox) return;
    alertBox.textContent = msg;
    alertBox.className = 'mx-6 mt-3 p-3 rounded-xl text-xs font-semibold bg-red-950/80 border border-red-500/50 text-red-200 transition-all text-center';
    alertBox.classList.remove('hidden');
    setTimeout(() => {
      alertBox.classList.add('hidden');
    }, 4500);
  }

  // Controle de Transição de Etapas
  function goToStep(step) {
    currentStep = step;
    steps.forEach((el, idx) => {
      if (el) {
        if (idx + 1 === step) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    });

    // Atualizar Barra Superior
    stepIndicators.forEach((ind, idx) => {
      const num = idx + 1;
      ind.classList.remove('active', 'completed');
      if (num === step) {
        ind.classList.add('active');
      } else if (num < step) {
        ind.classList.add('completed');
      }
    });

    stepLines.forEach((line, idx) => {
      if (idx + 1 < step) {
        line.classList.add('active');
      } else {
        line.classList.remove('active');
      }
    });

    if (alertBox) alertBox.classList.add('hidden');
  }

  // Calendário: Renderização Dinâmica em Vanilla JS
  function renderCalendar() {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    calMonthTitle.textContent = `${monthNames[month]} de ${year}`;

    // Desabilitar voltar se estiver no mês atual
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    calPrevBtn.disabled = isCurrentMonth;

    // Primeiro dia da semana (0 = Dom) e total de dias do mês
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    calGrid.innerHTML = '';

    // Células vazias iniciais
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'cal-day-cell empty';
      calGrid.appendChild(emptyCell);
    }

    // Dias do mês
    for (let day = 1; day <= totalDays; day++) {
      const cellDate = new Date(year, month, day);
      const cellDayOfWeek = cellDate.getDay();
      const dayName = dayNames[cellDayOfWeek];

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = day;
      btn.className = 'cal-day-cell';

      // Marca o dia atual
      const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
      if (isToday) btn.classList.add('today');

      // Validar dias passados (permitir apenas datas futuras ou hoje)
      const isPast = new Date(year, month, day, 23, 59, 59) < today;
      // Verificar se há horários configurados para este dia da semana
      const hasSlots = agenda[dayName] && agenda[dayName].length > 0;

      if (isPast || !hasSlots) {
        btn.classList.add('disabled');
        btn.disabled = true;
        if (!hasSlots && !isPast) {
          btn.title = 'Sem atendimento neste dia';
        }
      } else {
        // Marcação se já estiver selecionado
        if (selectedDate && 
            selectedDate.getFullYear() === year && 
            selectedDate.getMonth() === month && 
            selectedDate.getDate() === day) {
          btn.classList.add('selected');
        }

        btn.addEventListener('click', () => {
          selectedDate = cellDate;
          const dayPad = String(day).padStart(2, '0');
          const monthPad = String(month + 1).padStart(2, '0');
          selectedDateFormatted = `${dayPad}/${monthPad}/${year}`;

          document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected'));
          btn.classList.add('selected');
          btnGotoStep2.disabled = false;

          // Transição suave para a etapa de horários
          setTimeout(() => {
            prepareStep2();
            goToStep(2);
          }, 180);
        });
      }

      calGrid.appendChild(btn);
    }
  }

  // Controles de Navegação de Mês
  calPrevBtn.addEventListener('click', () => {
    viewDate.setMonth(viewDate.getMonth() - 1);
    renderCalendar();
  });

  calNextBtn.addEventListener('click', () => {
    viewDate.setMonth(viewDate.getMonth() + 1);
    renderCalendar();
  });

  btnGotoStep2.addEventListener('click', () => {
    if (!selectedDate) {
      showAlert('Por favor, selecione uma data no calendário.');
      return;
    }
    prepareStep2();
    goToStep(2);
  });

  btnBackToStep1.addEventListener('click', () => {
    goToStep(1);
    renderCalendar();
  });

  // Preparação da Etapa 2 (Horários Sugeridos)
  function prepareStep2() {
    if (!selectedDate) return;

    const dayName = dayNames[selectedDate.getDay()];
    const diaSemanaExtenso = [
      'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
      'Quinta-feira', 'Sexta-feira', 'Sábado'
    ][selectedDate.getDay()];

    selectedDateBadge.textContent = `${diaSemanaExtenso}, ${selectedDateFormatted}`;

    const slots = agenda[dayName] || [];
    slotsContainer.innerHTML = '';
    btnGotoStep3.disabled = !selectedSlot;

    if (slots.length === 0) {
      slotsContainer.innerHTML = '<p class="col-span-full text-center text-xs text-gray-400 py-6">Nenhum horário disponível para este dia.</p>';
      return;
    }

    slots.forEach(slot => {
      const slotBtn = document.createElement('button');
      slotBtn.type = 'button';
      slotBtn.className = 'slot-btn';
      slotBtn.textContent = slot;

      if (selectedSlot === slot) {
        slotBtn.classList.add('selected');
      }

      slotBtn.addEventListener('click', () => {
        document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
        slotBtn.classList.add('selected');
        selectedSlot = slot;
        btnGotoStep3.disabled = false;

        // Avanço suave para dados do cliente
        setTimeout(() => {
          goToStep(3);
          inputNome.focus();
        }, 200);
      });

      slotsContainer.appendChild(slotBtn);
    });
  }

  btnGotoStep3.addEventListener('click', () => {
    if (!selectedSlot) {
      showAlert('Por favor, selecione um horário desejado.');
      return;
    }
    goToStep(3);
    inputNome.focus();
  });

  btnBackToStep2.addEventListener('click', () => {
    goToStep(2);
  });

  // Validação dos Dados do Cliente (Etapa 3 -> Etapa 4)
  btnGotoStep4.addEventListener('click', () => {
    const nome = inputNome.value.trim();
    const tel = inputTelefone.value.trim();

    if (!nome) {
      showAlert('Por favor, informe seu nome completo.');
      inputNome.focus();
      return;
    }

    if (!tel || tel.length < 14) {
      showAlert('Por favor, informe um telefone válido com DDD: (11) 99999-9999.');
      inputTelefone.focus();
      return;
    }

    // Preencher Resumo
    summaryData.textContent = selectedDateFormatted;
    summaryHorario.textContent = selectedSlot;
    summaryNome.textContent = nome;
    summaryTelefone.textContent = tel;
    summaryServico.textContent = selectServico.value || 'Corte Masculino';
    
    const obs = inputObs.value.trim();
    summaryObs.textContent = obs || 'Nenhuma';

    goToStep(4);
  });

  btnBackToStep3.addEventListener('click', () => {
    goToStep(3);
  });

  // Envio da Solicitação via WhatsApp (Etapa 4 -> WhatsApp)
  btnSubmitWhatsapp.addEventListener('click', () => {
    const nome = inputNome.value.trim();
    const tel = inputTelefone.value.trim();
    const servico = selectServico.value || 'Corte Masculino';
    const obs = inputObs.value.trim() || 'Nenhuma';

    // Montar mensagem exatamente como exigido
    let msg = `Olá, Ruy! Gostaria de solicitar um horário.\n\n`;
    msg += `Nome: ${nome}\n`;
    msg += `Telefone: ${tel}\n\n`;
    msg += `Data desejada: ${selectedDateFormatted}\n`;
    msg += `Horário desejado: ${selectedSlot}\n\n`;
    msg += `Serviço: ${servico}\n\n`;
    msg += `Observação:\n${obs}\n\n`;
    msg += `Estou ciente de que o horário está sujeito à confirmação.\n\n`;
    msg += `Obrigado!`;

    const numeroWhats = '5511987026977';
    const urlWhats = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(msg)}`;

    // Atualizar dados na tela final informativa
    sentData.textContent = selectedDateFormatted;
    sentHorario.textContent = selectedSlot;

    // Abrir WhatsApp com a mensagem
    window.open(urlWhats, '_blank', 'noopener,noreferrer');

    // Mudar para tela informativa (Etapa 5)
    setTimeout(() => {
      goToStep(5);
    }, 400);
  });
}

