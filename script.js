document.addEventListener("DOMContentLoaded", function () {
  // Мобильное меню
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileNav = document.querySelector(".main-nav-mobile");

  if (mobileMenuButton && mobileNav) {
    mobileMenuButton.addEventListener("click", function () {
      this.classList.toggle("active");
      mobileNav.classList.toggle("active");
    });
  }

  // Закрытие меню при клике на ссылку (только на мобильных)
  document.querySelectorAll(".main-nav-mobile .menu a").forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 992) {
        mobileMenuButton.classList.remove("active");
        mobileNav.classList.remove("active");
      }
    });
  });

  // Плавная прокрутка для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
        // Закрываем мобильное меню при клике на ссылку
        if (mobileNav.classList.contains("active")) {
          mobileNav.classList.remove("active");
          mobileMenuButton.classList.remove("active");
        }
      }
    });
  });

  // Анимация появления элементов при прокрутке
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Добавляем классы для анимации
  document.querySelectorAll(".service-card, .advantage-card").forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  // Добавляем стили для анимации
  const style = document.createElement("style");
  style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(style);

  // Обработка модального окна политики конфиденциальности
  const privacyPolicyModal = document.getElementById("privacy-policy-modal");
  const privacyPolicyLinks = document.querySelectorAll(
    'a[onclick="showPrivacyPolicyModal()"]'
  );
  const closeButtons = document.querySelectorAll(".close-button");

  function showPrivacyPolicyModal() {
    if (privacyPolicyModal) {
      privacyPolicyModal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  }

  function closePrivacyPolicyModal() {
    if (privacyPolicyModal) {
      privacyPolicyModal.style.display = "none";
      document.body.style.overflow = "";
    }
  }

  // Добавляем обработчики событий
  privacyPolicyLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      showPrivacyPolicyModal();
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closePrivacyPolicyModal);
  });

  // Закрытие модального окна при клике вне его содержимого
  if (privacyPolicyModal) {
    privacyPolicyModal.addEventListener("click", function (e) {
      if (e.target === privacyPolicyModal) {
        closePrivacyPolicyModal();
      }
    });
  }

  // Закрытие модального окна при нажатии Escape
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      privacyPolicyModal &&
      privacyPolicyModal.style.display === "block"
    ) {
      closePrivacyPolicyModal();
    }
  });

  // Модальное окно для услуг
  const serviceModal = document.getElementById("service-modal");
  const serviceCircles = document.querySelectorAll(".service-circle");
  const closeModal = document.querySelector(".close-modal");
  const modalTitle = document.querySelector(".service-modal-title");
  const modalDescription = document.querySelector(".service-modal-description");
  const modalIcon = document.querySelector(".service-modal-icon");

  const serviceData = {
    preparation: {
      title: "Подготовка документов к аккредитации",
      description:
        "Подготовка документов к аккредитации испытательных лабораторий, органов по сертификации, проверка соответствия аккредитованного лица критериям аккредитации",
      icon: "fa-file-alt",
    },
    development: {
      title: "Разработка документов СМК",
      description:
        "Разработка документов системы менеджмента качества для испытательных лабораторий и органов по сертификации",
      icon: "fa-book",
    },
    implementation: {
      title: "Внедрение системы менеджмента",
      description:
        "Внедрение системы менеджмента качества с учетом специфики деятельности вашей организации",
      icon: "fa-cogs",
    },
    accreditation: {
      title: "Подготовка области аккредитации",
      description:
        "Подготовка области аккредитации испытательных лабораторий, органов по сертификации",
      icon: "fa-tasks",
    },
    training: {
      title: "Обучение сотрудников",
      description:
        "Обучение сотрудников требованиям системы менеджмента качества",
      icon: "fa-user-graduate",
    },
    "staff-preparation": {
      title: "Подготовка к аккредитации",
      description:
        "Подготовка сотрудников к аккредитации испытательных лабораторий, органов по сертификации",
      icon: "fa-chalkboard-teacher",
    },
    analysis: {
      title: "Анализ опыта работы",
      description: "Анализ опыта работы сотрудников в области аккредитации",
      icon: "fa-chart-line",
    },
    verification: {
      title: "Проверка деятельности",
      description:
        "Проверка деятельности испытательных лабораторий, органов по сертификации",
      icon: "fa-clipboard-check",
    },
    audit: {
      title: "Проведение аудита",
      description:
        "Проведение аудита и подготовка к подтверждению компетентности",
      icon: "fa-search-plus",
    },
    certification: {
      title: "Услуги по сертификации",
      description: "Оказание услуг по сертификации любых видов продукции",
      icon: "fa-users",
    },
  };

  serviceCircles.forEach((circle) => {
    circle.addEventListener("click", function () {
      const serviceType = this.getAttribute("data-service");
      const service = serviceData[serviceType];

      modalTitle.textContent = service.title;
      modalDescription.textContent = service.description;
      modalIcon.innerHTML = `<i class="fas ${service.icon}"></i>`;

      serviceModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  closeModal.addEventListener("click", function () {
    serviceModal.classList.remove("active");
    document.body.style.overflow = "";
  });

  serviceModal.addEventListener("click", function (e) {
    if (e.target === serviceModal) {
      serviceModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Закрытие модального окна по Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && serviceModal.classList.contains("active")) {
      serviceModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // === Документы ===
  const documents = [
    {
      name: "Приказ от 09.01.2020 N 1",
      path: "document/Приказ от 09_01_2020 N 1 О формах сведений о соответствии аккредитованных в национальной системе..._Текст.pdf",
    },
    {
      name: "Об утверждении Положения",
      path: "document/Об утверждении Положения о составе сведений о результатах деятельности аккредитованных лиц, об..._Текст редакции (1).pdf",
    },
    {
      name: "Закон от 28.12.2013 N 412-ФЗ",
      path: "document/Закон от 28_12_2013 N 412-ФЗ Об аккредитации в национальной системе аккредитации (с изменениями на..._Текст.pdf",
    },
    {
      name: "ГОСТ Р ИСОМЭК 17065-2012",
      path: "document/ГОСТ Р ИСОМЭК 17065-2012 Оценка соответствия. Требования к органам по сертификации продукции,..._Текст.pdf",
    },
    {
      name: "ГОСТ ISOIEC 17025-2019",
      path: "document/ГОСТ ISOIEC 17025-2019 Общие требования к компетентности испытательных и калибровочных лабораторий..._Текст.pdf",
    },
    {
      name: "Решение от 05.12.2018 N 100",
      path: "document/Решение от 05_12_2018 N 100 О Порядке включения аккредитованных органов по оценке соответствия (в..._Текст.pdf",
    },
    {
      name: "Приказ от 26.10.2020 N 707",
      path: "document/Приказ от 26_10_2020 N 707 Об утверждении критериев аккредитации и перечня документов,..._Текст.pdf",
    },
    {
      name: "Приказ от 25.01.2019 N 11",
      path: "document/Приказ от 25_01_2019 N 11 Об утверждении методических рекомендаций по описанию области аккредитации..._Текст.pdf",
    },
    {
      name: "Приказ от 16.08.2021 N 496",
      path: "document/Приказ от 16_08_2021 N 496 Об утверждении форм заявления об аккредитации, заявления о расширении..._Текст.pdf",
    },
    {
      name: "Приказ от 13.06.2019 N 106",
      path: "document/Приказ от 13_06_2019 N 106 Об утверждении методических рекомендаций по описанию области..._Текст.pdf",
    },
  ];

  function createDocumentElements() {
    console.log("createDocumentElements вызвана");
    console.log("Документы:", documents);
    const container = document.querySelector(".documents-container");
    if (!container) {
      console.log("Не найден .documents-container");
      return;
    }

    documents.forEach((doc) => {
      const item = document.createElement("div");
      item.className = "document-item fade-in";

      item.innerHTML = `
        <div class="document-icon">
          <div class="document-front">
            <i class="fas fa-folder-open"></i>
          </div>
          <div class="document-back">
            <i class="fas fa-arrow-circle-down"></i>
          </div>
        </div>
        <div class="document-title">${doc.name}</div>
      `;

      item.addEventListener("click", () => {
        window.open(doc.path, "_blank");
      });

      container.appendChild(item);
    });

    // Анимация появления
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".document-item").forEach((el) => {
      observer.observe(el);
    });
  }

  createDocumentElements();
});

window.addEventListener("resize", function () {
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileNav = document.querySelector(".main-nav-mobile");
  if (window.innerWidth > 768) {
    if (mobileMenuButton) mobileMenuButton.classList.remove("active");
    if (mobileNav) mobileNav.classList.remove("active");
  }
});
