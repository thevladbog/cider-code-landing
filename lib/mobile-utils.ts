// Утилиты для мобильных устройств

// Определение мобильного устройства
export const isMobile = () => {
  if (typeof window === "undefined") return false;

  return window.innerWidth <= 768;
};

// Определение touch устройства
export const isTouchDevice = () => {
  if (typeof window === "undefined") return false;

  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

// Предотвращение зума при двойном тапе
export const preventDoubleZoom = (element: HTMLElement) => {
  let lastTouchEnd = 0;

  element.addEventListener("touchend", (event) => {
    const now = new Date().getTime();

    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  });
};

// Определение iOS устройства
export const isIOS = () => {
  if (typeof window === "undefined") return false;

  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// Определение Android устройства
export const isAndroid = () => {
  if (typeof window === "undefined") return false;

  return /Android/.test(navigator.userAgent);
};

// Viewport utilities
export const getViewportHeight = () => {
  if (typeof window === "undefined") return 0;
  // Для мобильных устройств используем visualViewport если доступен
  if (window.visualViewport) {
    return window.visualViewport.height;
  }

  return window.innerHeight;
};

export const getViewportWidth = () => {
  if (typeof window === "undefined") return 0;

  if (window.visualViewport) {
    return window.visualViewport.width;
  }

  return window.innerWidth;
};

// Улучшенная прокрутка к элементу на мобильных
export const scrollToElement = (elementId: string, offset = 80) => {
  const element = document.getElementById(elementId);

  if (!element) return;

  const headerHeight = isMobile() ? 60 : 80; // Учитываем высоту header
  const top = element.offsetTop - headerHeight - offset;

  // Для iOS используем более плавную прокрутку
  if (isIOS()) {
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  } else {
    // Для Android используем requestAnimationFrame для лучшей производительности
    let currentScroll = window.pageYOffset;
    const distance = top - currentScroll;
    const duration = 500;
    let start: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = progress * (2 - progress); // easeOutQuad

      window.scrollTo(0, currentScroll + distance * ease);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
};

// Throttle функция для оптимизации производительности
export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;

  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Debounce функция для оптимизации производительности
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};
