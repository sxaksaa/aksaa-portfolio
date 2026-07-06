"use client";

import { useEffect } from "react";

const revealSelector = "[data-reveal]";

export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));
    const instantTimers = new WeakMap<HTMLElement, number>();
    let lastScrollY = window.scrollY;
    let scrollDirection: "down" | "up" = "down";

    if (!elements.length) {
      return undefined;
    }

    const updateScrollDirection = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const delta = currentScrollY - lastScrollY;

      if (Math.abs(delta) > 2) {
        scrollDirection = delta > 0 ? "down" : "up";
        lastScrollY = currentScrollY;
      }
    };

    const clearInstantTimer = (element: HTMLElement) => {
      const timer = instantTimers.get(element);

      if (timer) {
        window.clearTimeout(timer);
        instantTimers.delete(element);
      }
    };

    const setRevealState = (element: HTMLElement, isVisible: boolean, shouldAnimate: boolean) => {
      clearInstantTimer(element);

      if (!shouldAnimate) {
        element.dataset.revealInstant = "true";
      } else {
        delete element.dataset.revealInstant;
      }

      element.dataset.revealVisible = isVisible ? "true" : "false";

      if (!shouldAnimate) {
        const timer = window.setTimeout(() => {
          delete element.dataset.revealInstant;
          instantTimers.delete(element);
        }, 80);

        instantTimers.set(element, timer);
      }
    };

    const setInitialVisibility = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const isVisible = rect.top < viewportHeight * 0.92 && rect.bottom > viewportHeight * 0.08;

      setRevealState(element, isVisible, false);
    };

    elements.forEach(setInitialVisibility);
    root.dataset.revealReady = "true";
    window.addEventListener("scroll", updateScrollDirection, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        updateScrollDirection();

        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const shouldAnimate = entry.isIntersecting && scrollDirection === "down";

          setRevealState(target, entry.isIntersecting, shouldAnimate);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.16,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
      observer.disconnect();
      elements.forEach((element) => {
        clearInstantTimer(element);
        delete element.dataset.revealInstant;
        delete element.dataset.revealVisible;
      });
      delete root.dataset.revealReady;
    };
  }, []);

  return null;
}
