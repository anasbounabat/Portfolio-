
function startLoader() {
  let counterElement = document.querySelector(".counter");
  let currentValue = 0;


  function updateCounter() {
    if (currentValue === 100) {
      return;
    }

    currentValue += Math.floor(Math.random() * 10) + 1;

    if (currentValue > 100) {
      currentValue = 100;
    }

    counterElement.textContent = currentValue;

    let delay = Math.floor(Math.random() * 200) + 50;
    setTimeout(updateCounter, delay);
  }

  updateCounter();
}

startLoader();

gsap.to(".counter", {
  duration: 0.25,
  delay: 3.5,
  opacity: 0,
});

gsap.to(".bar", {
  duration: 1.5,
  delay: 3.5,
  height: 0,
  stagger: {
    amount: 0.5,
  },
  ease: "power4.inOut",
});

gsap.from(".h1", {
  duration: 1.5,
  delay: 4,
  y: 700,
  stagger: {
    amount: 0.5,
  },
});

gsap.from(".hero", {
  duration: 2,
  delay: 4.5,
  y: 400,
  ease: "power4.inOut",
});


document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const stickySection = document.querySelector(".steps");
  const stickyHeight = window.innerHeight * 7;
  const cards = document.querySelectorAll(".card");
  const countContainer = document.querySelector(".count-container");
  const totalCards = cards.length;

  ScrollTrigger.create({
    trigger: stickySection,
    start: "top top",
    end: `+=${stickyHeight}px`,
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      positionCards(self.progress);
    },
  });

  const getRadius = () => {
    return window.innerWidth < 900
      ? window.innerWidth * 7.5
      : window.innerWidth * 2.5;
  };

  const arcAngle = Math.PI * 0.4;
  const startAngle = Math.PI / 2 - arcAngle / 2;

  function positionCards(progress = 0) {
    const radius = getRadius();
    const totalTravel = 1 + totalCards / 7.5;
    const adjustedProgress = (progress * totalTravel - 1) * 0.75;

    cards.forEach((card, i) => {
      const normalizedProgress = (totalCards - 1 - i) / totalCards;
      const cardProgress = normalizedProgress + adjustedProgress;
      const angle = startAngle + arcAngle * cardProgress;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rotation = (angle - Math.PI / 2) * (180 / Math.PI);

      gsap.set(card, {
        x: x,
        y: -y + radius,
        rotation: -rotation,
        transformOrigin: "center center",
      });
    });
  }

  positionCards(0);

  let currentCardIndex = 0;

  const options = {
    root: null,
    rootMargin: "0% 0%",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        lastScrollY = window.scrollY;

        let cardIndex = Array.from(cards).indexOf(entry.target);

        currentCardIndex = cardIndex;
        const targetY = 150 - currentCardIndex * 150;
        gsap.to(countContainer, {
          y: targetY,
          duration: 0.3,
          ease: "power1.out",
          overwrite: true,
        });
      }
    });
  }, options);

  cards.forEach((card) => {
    observer.observe(card);
  });

  window.addEventListener("resize", () => positionCards(0));
});

let selection = splitting() 

  gsap.registerPlugin(ScrollTrigger)

  gasap.from(selection[0].chars, {
    color:"rgb(13,13,13)",
    duration:20,
  })