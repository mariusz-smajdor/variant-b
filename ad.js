(() => {
  const creative = document.querySelector('.creative');
  if (!creative) {
    return;
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const background = creative.querySelector('[data-role="background"]');
  const product = creative.querySelector('[data-role="product"]');
  const panel = creative.querySelector('[data-role="panel"]');
  const copy = creative.querySelector('[data-role="copy"]');
  const cta = creative.querySelector('[data-role="cta"]');
  const clickout = creative.querySelector('[data-role="clickout"]');
  const headlineLines = [...creative.querySelectorAll('[data-role="headline-line"]')];
  const clickTag = window.clickTag || 'https://example.com/landing';
  const previewMode = new URLSearchParams(window.location.search).has('preview');
  let started = false;

  if (clickout) {
    clickout.href = clickTag;
  }

  const startAnimation = () => {
    if (started) {
      return;
    }
    started = true;

    if (reducedMotion) {
      showFinalState();
      return;
    }

    runAnimation();
  };

  const showFinalState = () => {
    if (background) {
      background.style.transform = 'none';
    }

    [product, panel, copy, cta, ...headlineLines].forEach((element) => {
      if (element) {
        element.style.opacity = '1';
      }
    });
  };

  if (reducedMotion) {
    if (!previewMode) {
      showFinalState();
    }
  }

  const animate = (element, keyframes, options) => {
    if (!element) {
      return null;
    }
    return element.animate(keyframes, {
      fill: 'forwards',
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      ...options
    });
  };

  const runAnimation = () => {
    animate(background, [
      { opacity: 0.72, transform: 'scale(1.04)' },
      { opacity: 1, transform: 'scale(1)' }
    ], { duration: 1800, delay: 0 });

    if (product) {
      const isLeft = creative.getAttribute('aria-label').includes('left');
      animate(product, [
        { opacity: 0, transform: isLeft ? 'translate(-18px, 16px) rotate(-8deg) scale(0.96)' : 'translate(18px, 12px) scale(0.96)' },
        { opacity: 1, transform: 'translate(0, 0) rotate(0) scale(1)' }
      ], { duration: 1050, delay: 700 });
    }

    animate(panel, [
      { opacity: 0, transform: 'translateY(12px)' },
      { opacity: 0.68, transform: 'translateY(0)' }
    ], { duration: 700, delay: 1600 });

    animate(copy, [
      { opacity: 0, transform: 'translateY(16px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 800, delay: 1800 });

    headlineLines.forEach((line, index) => {
      animate(line, [
        { opacity: 0, transform: 'translateY(12px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 500, delay: 1200 + index * 260 });
    });

    const ctaAnimation = animate(cta, [
      { opacity: 0, transform: 'translateY(14px) scale(0.96)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' }
    ], { duration: 650, delay: 2800 });

    if (ctaAnimation) {
      ctaAnimation.finished.then(() => {
        animate(cta, [
          { transform: 'scale(1)' },
          { transform: 'scale(1.035)' },
          { transform: 'scale(1)' }
        ], { duration: 1200, delay: 600, iterations: 3, easing: 'ease-in-out' });
      });
    }

    window.setTimeout(() => {
      animate(background, [
        { transform: 'scale(1)' },
        { transform: 'scale(1.012)' },
        { transform: 'scale(1)' }
      ], { duration: 12000, iterations: 2, easing: 'ease-in-out' });
    }, 4200);
  };

  window.addEventListener('message', (event) => {
    if (event.source === window.parent && event.data?.type === 'start-fireplace') {
      startAnimation();
    }
  });

  if (!previewMode) {
    startAnimation();
  }
})();
