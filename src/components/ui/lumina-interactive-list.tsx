import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

export interface LuminaSlide {
  title: string;
  description: string;
  media: string;
}

export interface LuminaSliderProps {
  slides?: LuminaSlide[];
  className?: string;
  autoSlideSpeed?: number;
  transitionDuration?: number;
  currentEffect?: 'glass' | 'frost' | 'ripple' | 'plasma' | 'timeshift';
}

const DEFAULT_SLIDES: LuminaSlide[] = [
  { title: "Ethereal Glow", description: "A soft, radiant light that illuminates the soul.", media: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" },
  { title: "Rose Mirage", description: "Lost in a desert of blooming dreams and endless horizons.", media: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80" },
  { title: "Velvet Mystique", description: "Wrapped in the deep, luxurious embrace of the night.", media: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=80" },
  { title: "Golden Hour", description: "That fleeting moment when the world is dipped in gold.", media: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80" },
  { title: "Midnight Dreams", description: "Where reality fades and imagination takes flight.", media: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80" },
  { title: "Silver Light", description: "A cool, metallic shimmer reflecting the urban pulse.", media: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920&q=80" },
];

const SLIDER_CONFIG = {
  settings: {
    transitionDuration: 2.5,
    autoSlideSpeed: 5000,
    currentEffect: "glass" as const,
    currentEffectPreset: "Default",
    globalIntensity: 1.0,
    speedMultiplier: 1.0,
    distortionStrength: 1.0,
    colorEnhancement: 1.0,
    glassRefractionStrength: 1.0,
    glassChromaticAberration: 1.0,
    glassBubbleClarity: 1.0,
    glassEdgeGlow: 1.0,
    glassLiquidFlow: 1.0,
    frostIntensity: 1.5,
    frostCrystalSize: 1.0,
    frostIceCoverage: 1.0,
    frostTemperature: 1.0,
    frostTexture: 1.0,
    rippleFrequency: 25.0,
    rippleAmplitude: 0.08,
    rippleWaveSpeed: 1.0,
    rippleRippleCount: 1.0,
    rippleDecay: 1.0,
    plasmaIntensity: 1.2,
    plasmaSpeed: 0.8,
    plasmaEnergyIntensity: 0.4,
    plasmaContrastBoost: 0.3,
    plasmaTurbulence: 1.0,
    timeshiftDistortion: 1.6,
    timeshiftBlur: 1.5,
    timeshiftFlow: 1.4,
    timeshiftChromatic: 1.5,
    timeshiftTurbulence: 1.4
  }
};

const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

const fragmentShader = `
  uniform sampler2D uTexture1, uTexture2;
  uniform float uProgress;
  uniform vec2 uResolution, uTexture1Size, uTexture2Size;
  uniform int uEffectType;
  uniform float uGlobalIntensity, uSpeedMultiplier, uDistortionStrength, uColorEnhancement;
  uniform float uGlassRefractionStrength, uGlassChromaticAberration, uGlassBubbleClarity, uGlassEdgeGlow, uGlassLiquidFlow;
  uniform float uFrostIntensity, uFrostCrystalSize, uFrostIceCoverage, uFrostTemperature, uFrostTexture;
  uniform float uRippleFrequency, uRippleAmplitude, uRippleWaveSpeed, uRippleRippleCount, uRippleDecay;
  uniform float uPlasmaIntensity, uPlasmaSpeed, uPlasmaEnergyIntensity, uPlasmaContrastBoost, uPlasmaTurbulence;
  uniform float uTimeshiftDistortion, uTimeshiftBlur, uTimeshiftFlow, uTimeshiftChromatic, uTimeshiftTurbulence;
  varying vec2 vUv;

  vec2 getCoverUV(vec2 uv, vec2 textureSize) {
      vec2 s = uResolution / textureSize;
      float scale = max(s.x, s.y);
      vec2 scaledSize = textureSize * scale;
      vec2 offset = (uResolution - scaledSize) * 0.5;
      return (uv * uResolution - offset) / scaledSize;
  }
  float noise(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  
  vec4 glassEffect(vec2 uv, float progress) {
      float time = progress * 5.0 * uSpeedMultiplier;
      vec2 uv1 = getCoverUV(uv, uTexture1Size); vec2 uv2 = getCoverUV(uv, uTexture2Size);
      float maxR = length(uResolution) * 0.85; float br = progress * maxR;
      vec2 p = uv * uResolution; vec2 c = uResolution * 0.5;
      float d = length(p - c); float nd = d / max(br, 0.001);
      float param = smoothstep(br + 3.0, br - 3.0, d);
      vec4 img;
      if (param > 0.0) {
           float ro = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity * pow(smoothstep(0.3 * uGlassBubbleClarity, 1.0, nd), 1.5);
           vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
           vec2 distUV = uv2 - dir * ro;
           distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * uGlassLiquidFlow * uSpeedMultiplier * nd * param;
           float ca = 0.02 * uGlassChromaticAberration * uGlobalIntensity * pow(smoothstep(0.3, 1.0, nd), 1.2);
           img = vec4(texture2D(uTexture2, distUV + dir * ca * 1.2).r, texture2D(uTexture2, distUV + dir * ca * 0.2).g, texture2D(uTexture2, distUV - dir * ca * 0.8).b, 1.0);
           if (uGlassEdgeGlow > 0.0) {
              float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
              img.rgb += rim * 0.08 * uGlassEdgeGlow * uGlobalIntensity;
           }
      } else { img = texture2D(uTexture2, uv2); }
      vec4 oldImg = texture2D(uTexture1, uv1);
      if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
      return mix(oldImg, img, param);
  }
  
  vec4 frostEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
  vec4 rippleEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
  vec4 plasmaEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
  vec4 timeshiftEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }

  void main() {
      if (uEffectType == 0) gl_FragColor = glassEffect(vUv, uProgress);
      else if (uEffectType == 1) gl_FragColor = frostEffect(vUv, uProgress);
      else if (uEffectType == 2) gl_FragColor = rippleEffect(vUv, uProgress);
      else if (uEffectType == 3) gl_FragColor = plasmaEffect(vUv, uProgress);
      else gl_FragColor = timeshiftEffect(vUv, uProgress);
  }
`;

export function LuminaInteractiveList({
  slides = DEFAULT_SLIDES,
  className = '',
  autoSlideSpeed = 5000,
  transitionDuration = 2.5,
  currentEffect = 'glass'
}: LuminaSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const slideTexturesRef = useRef<THREE.Texture[]>([]);
  const currentSlideIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressAnimationRef = useRef<NodeJS.Timeout | null>(null);
  const sliderEnabledRef = useRef(false);

  const getEffectIndex = useCallback((name: string) => {
    const map: Record<string, number> = { glass: 0, frost: 1, ripple: 2, plasma: 3, timeshift: 4 };
    return map[name] || 0;
  }, []);

  const splitText = useCallback((text: string) => {
    return text.split('').map((char, i) => (
      `<span key="${i}" style="display: inline-block; opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
    )).join('');
  }, []);

  const loadImageTexture = useCallback((src: string): Promise<THREE.Texture> => {
    return new Promise((resolve, reject) => {
      const loader = new THREE.TextureLoader();
      loader.load(src, (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        (texture as any).userData = { size: new THREE.Vector2(texture.image.width, texture.image.height) };
        resolve(texture);
      }, undefined, reject);
    });
  }, []);

  const updateContent = useCallback((idx: number) => {
    const titleEl = document.getElementById('luminaTitle');
    const descEl = document.getElementById('luminaDesc');
    if (!titleEl || !descEl) return;

    gsap.to(titleEl.children, { y: -20, opacity: 0, duration: 0.5, stagger: 0.02, ease: "power2.in" });
    gsap.to(descEl, { y: -10, opacity: 0, duration: 0.4, ease: "power2.in" });

    setTimeout(() => {
      titleEl.innerHTML = splitText(slides[idx].title);
      descEl.textContent = slides[idx].description;

      gsap.set(titleEl.children, { opacity: 0 });
      gsap.set(descEl, { y: 20, opacity: 0 });

      const children = titleEl.children;
      switch (idx % 6) {
        case 0:
          gsap.set(children, { y: 20 });
          gsap.to(children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
          gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
          break;
        case 1:
          gsap.set(children, { y: -20 });
          gsap.to(children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "back.out(1.7)" });
          gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
          break;
        case 2:
          gsap.set(children, { filter: "blur(10px)", scale: 1.5, y: 0 });
          gsap.to(children, { filter: "blur(0px)", scale: 1, opacity: 1, duration: 1, stagger: { amount: 0.5, from: "random" }, ease: "power2.out" });
          gsap.to(descEl, { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" });
          break;
        case 3:
          gsap.set(children, { scale: 0, y: 0 });
          gsap.to(children, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: "back.out(1.5)" });
          gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
          break;
        case 4:
          gsap.set(children, { rotationX: 90, y: 0, transformOrigin: "50% 50%" });
          gsap.to(children, { rotationX: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: "power2.out" });
          gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out" });
          break;
        case 5:
          gsap.set(children, { x: 30, y: 0 });
          gsap.to(children, { x: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
          gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
          break;
      }
    }, 500);
  }, [slides, splitText]);

  const updateCounter = useCallback((idx: number) => {
    const sn = document.getElementById("luminaSlideNumber");
    const st = document.getElementById("luminaSlideTotal");
    if (sn) sn.textContent = String(idx + 1).padStart(2, "0");
    if (st) st.textContent = String(slides.length).padStart(2, "0");
  }, [slides.length]);

  const updateNavigationState = useCallback((idx: number) => {
    document.querySelectorAll(".lumina-slide-nav-item").forEach((el, i) => {
      el.classList.toggle("active", i === idx);
    });
  }, []);

  const updateSlideProgress = useCallback((idx: number, prog: number) => {
    const el = document.querySelectorAll(".lumina-slide-nav-item")[idx]?.querySelector(".lumina-slide-progress-fill") as HTMLElement;
    if (el) {
      el.style.width = `${prog}%`;
      el.style.opacity = '1';
    }
  }, []);

  const fadeSlideProgress = useCallback((idx: number) => {
    const el = document.querySelectorAll(".lumina-slide-nav-item")[idx]?.querySelector(".lumina-slide-progress-fill") as HTMLElement;
    if (el) {
      el.style.opacity = '0';
      setTimeout(() => el.style.width = "0%", 300);
    }
  }, []);

  const quickResetProgress = useCallback((idx: number) => {
    const el = document.querySelectorAll(".lumina-slide-nav-item")[idx]?.querySelector(".lumina-slide-progress-fill") as HTMLElement;
    if (el) {
      el.style.transition = "width 0.2s ease-out";
      el.style.width = "0%";
      setTimeout(() => el.style.transition = "width 0.1s ease, opacity 0.3s ease", 200);
    }
  }, []);

  const stopAutoSlideTimer = useCallback(() => {
    if (progressAnimationRef.current) clearInterval(progressAnimationRef.current);
    if (autoSlideTimerRef.current) clearTimeout(autoSlideTimerRef.current);
    progressAnimationRef.current = null;
    autoSlideTimerRef.current = null;
  }, []);

  const startAutoSlideTimer = useCallback(() => {
    stopAutoSlideTimer();
    let progress = 0;
    const increment = (100 / autoSlideSpeed) * 50;
    progressAnimationRef.current = setInterval(() => {
      if (!sliderEnabledRef.current) { stopAutoSlideTimer(); return; }
      progress += increment;
      updateSlideProgress(currentSlideIndexRef.current, progress);
      if (progress >= 100) {
        clearInterval(progressAnimationRef.current!);
        progressAnimationRef.current = null;
        fadeSlideProgress(currentSlideIndexRef.current);
        if (!isTransitioningRef.current) {
          const nextIndex = (currentSlideIndexRef.current + 1) % slides.length;
          navigateToSlide(nextIndex);
        }
      }
    }, 50);
  }, [autoSlideSpeed, stopAutoSlideTimer, updateSlideProgress, fadeSlideProgress, slides.length]);

  const safeStartTimer = useCallback((delay = 0) => {
    stopAutoSlideTimer();
    if (sliderEnabledRef.current) {
      if (delay > 0) autoSlideTimerRef.current = setTimeout(startAutoSlideTimer, delay);
      else startAutoSlideTimer();
    }
  }, [startAutoSlideTimer, stopAutoSlideTimer]);

  const navigateToSlide = useCallback((targetIndex: number) => {
    if (isTransitioningRef.current || targetIndex === currentSlideIndexRef.current) return;
    stopAutoSlideTimer();
    quickResetProgress(currentSlideIndexRef.current);

    const currentTexture = slideTexturesRef.current[currentSlideIndexRef.current];
    const targetTexture = slideTexturesRef.current[targetIndex];
    if (!currentTexture || !targetTexture || !shaderMaterialRef.current) return;

    isTransitioningRef.current = true;
    shaderMaterialRef.current.uniforms.uTexture1.value = currentTexture;
    shaderMaterialRef.current.uniforms.uTexture2.value = targetTexture;
    shaderMaterialRef.current.uniforms.uTexture1Size.value = (currentTexture as any).userData.size;
    shaderMaterialRef.current.uniforms.uTexture2Size.value = (targetTexture as any).userData.size;

    updateContent(targetIndex);
    currentSlideIndexRef.current = targetIndex;
    updateCounter(currentSlideIndexRef.current);
    updateNavigationState(currentSlideIndexRef.current);

    gsap.fromTo(shaderMaterialRef.current.uniforms.uProgress,
      { value: 0 },
      {
        value: 1,
        duration: transitionDuration,
        ease: "power2.inOut",
        onComplete: () => {
          if (shaderMaterialRef.current) {
            shaderMaterialRef.current.uniforms.uProgress.value = 0;
            shaderMaterialRef.current.uniforms.uTexture1.value = targetTexture;
            shaderMaterialRef.current.uniforms.uTexture1Size.value = (targetTexture as any).userData.size;
          }
          isTransitioningRef.current = false;
          safeStartTimer(100);
        }
      }
    );
  }, [transitionDuration, stopAutoSlideTimer, quickResetProgress, updateContent, updateCounter, updateNavigationState, safeStartTimer]);

  const createSlidesNavigation = useCallback(() => {
    const nav = document.getElementById("luminaSlidesNav");
    if (!nav) return;
    nav.innerHTML = "";
    slides.forEach((slide, i) => {
      const item = document.createElement("div");
      item.className = `lumina-slide-nav-item${i === 0 ? " active" : ""}`;
      (item as any).dataset.slideIndex = String(i);
      item.innerHTML = `<div class="lumina-slide-progress-line"><div class="lumina-slide-progress-fill"></div></div><div class="lumina-slide-nav-title">${slide.title}</div>`;
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!isTransitioningRef.current && i !== currentSlideIndexRef.current) {
          stopAutoSlideTimer();
          quickResetProgress(currentSlideIndexRef.current);
          navigateToSlide(i);
        }
      });
      nav.appendChild(item);
    });
  }, [slides, stopAutoSlideTimer, quickResetProgress, navigateToSlide]);

  useEffect(() => {
    const initRenderer = async () => {
      const canvas = document.querySelector(".lumina-webgl-canvas") as HTMLCanvasElement;
      if (!canvas || !containerRef.current) return;

      sceneRef.current = new THREE.Scene();
      cameraRef.current = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      rendererRef.current = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      shaderMaterialRef.current = new THREE.ShaderMaterial({
        uniforms: {
          uTexture1: { value: null },
          uTexture2: { value: null },
          uProgress: { value: 0 },
          uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          uTexture1Size: { value: new THREE.Vector2(1, 1) },
          uTexture2Size: { value: new THREE.Vector2(1, 1) },
          uEffectType: { value: getEffectIndex(currentEffect) },
          uGlobalIntensity: { value: SLIDER_CONFIG.settings.globalIntensity },
          uSpeedMultiplier: { value: SLIDER_CONFIG.settings.speedMultiplier },
          uDistortionStrength: { value: SLIDER_CONFIG.settings.distortionStrength },
          uColorEnhancement: { value: SLIDER_CONFIG.settings.colorEnhancement },
          uGlassRefractionStrength: { value: SLIDER_CONFIG.settings.glassRefractionStrength },
          uGlassChromaticAberration: { value: SLIDER_CONFIG.settings.glassChromaticAberration },
          uGlassBubbleClarity: { value: SLIDER_CONFIG.settings.glassBubbleClarity },
          uGlassEdgeGlow: { value: SLIDER_CONFIG.settings.glassEdgeGlow },
          uGlassLiquidFlow: { value: SLIDER_CONFIG.settings.glassLiquidFlow },
          uFrostIntensity: { value: SLIDER_CONFIG.settings.frostIntensity },
          uFrostCrystalSize: { value: SLIDER_CONFIG.settings.frostCrystalSize },
          uFrostIceCoverage: { value: SLIDER_CONFIG.settings.frostIceCoverage },
          uFrostTemperature: { value: SLIDER_CONFIG.settings.frostTemperature },
          uFrostTexture: { value: SLIDER_CONFIG.settings.frostTexture },
          uRippleFrequency: { value: SLIDER_CONFIG.settings.rippleFrequency },
          uRippleAmplitude: { value: SLIDER_CONFIG.settings.rippleAmplitude },
          uRippleWaveSpeed: { value: SLIDER_CONFIG.settings.rippleWaveSpeed },
          uRippleRippleCount: { value: SLIDER_CONFIG.settings.rippleRippleCount },
          uRippleDecay: { value: SLIDER_CONFIG.settings.rippleDecay },
          uPlasmaIntensity: { value: SLIDER_CONFIG.settings.plasmaIntensity },
          uPlasmaSpeed: { value: SLIDER_CONFIG.settings.plasmaSpeed },
          uPlasmaEnergyIntensity: { value: SLIDER_CONFIG.settings.plasmaEnergyIntensity },
          uPlasmaContrastBoost: { value: SLIDER_CONFIG.settings.plasmaContrastBoost },
          uPlasmaTurbulence: { value: SLIDER_CONFIG.settings.plasmaTurbulence },
          uTimeshiftDistortion: { value: SLIDER_CONFIG.settings.timeshiftDistortion },
          uTimeshiftBlur: { value: SLIDER_CONFIG.settings.timeshiftBlur },
          uTimeshiftFlow: { value: SLIDER_CONFIG.settings.timeshiftFlow },
          uTimeshiftChromatic: { value: SLIDER_CONFIG.settings.timeshiftChromatic },
          uTimeshiftTurbulence: { value: SLIDER_CONFIG.settings.timeshiftTurbulence }
        },
        vertexShader,
        fragmentShader
      });

      sceneRef.current.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterialRef.current));

      try {
        for (const s of slides) {
          const texture = await loadImageTexture(s.media);
          slideTexturesRef.current.push(texture);
        }

        if (slideTexturesRef.current.length >= 2 && shaderMaterialRef.current) {
          shaderMaterialRef.current.uniforms.uTexture1.value = slideTexturesRef.current[0];
          shaderMaterialRef.current.uniforms.uTexture2.value = slideTexturesRef.current[1];
          shaderMaterialRef.current.uniforms.uTexture1Size.value = (slideTexturesRef.current[0] as any).userData.size;
          shaderMaterialRef.current.uniforms.uTexture2Size.value = (slideTexturesRef.current[1] as any).userData.size;
          sliderEnabledRef.current = true;
          containerRef.current?.classList.add("loaded");
          safeStartTimer(500);
        }
      } catch (err) {
        console.warn("Failed to load some textures:", err);
      }

      const tEl = document.getElementById('luminaTitle');
      const dEl = document.getElementById('luminaDesc');
      if (tEl && dEl) {
        tEl.innerHTML = splitText(slides[0].title);
        dEl.textContent = slides[0].description;
        gsap.fromTo(tEl.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.03, ease: "power3.out", delay: 0.5 });
        gsap.fromTo(dEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 });
      }

      createSlidesNavigation();
      updateCounter(0);

      const render = () => {
        requestAnimationFrame(render);
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      };
      render();
    };

    initRenderer();

    const handleVisibilityChange = () => {
      if (document.hidden) stopAutoSlideTimer();
      else if (!isTransitioningRef.current) safeStartTimer();
    };

    const handleResize = () => {
      if (rendererRef.current && shaderMaterialRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        shaderMaterialRef.current.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", handleResize);

    return () => {
      stopAutoSlideTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      rendererRef.current?.dispose();
      slideTexturesRef.current.forEach(t => t.dispose());
      shaderMaterialRef.current?.dispose();
    };
  }, [slides, currentEffect, getEffectIndex, loadImageTexture, splitText, createSlidesNavigation, updateCounter, stopAutoSlideTimer, safeStartTimer]);

  return (
    <div ref={containerRef} className={`lumina-slider-wrapper ${className}`}>
      <canvas className="lumina-webgl-canvas" />
      <span className="lumina-slide-number" id="luminaSlideNumber">01</span>
      <span className="lumina-slide-total" id="luminaSlideTotal">{String(slides.length).padStart(2, "0")}</span>

      <div className="lumina-slide-content">
        <h1 className="lumina-slide-title" id="luminaTitle"></h1>
        <p className="lumina-slide-description" id="luminaDesc"></p>
      </div>

      <nav className="lumina-slides-navigation" id="luminaSlidesNav"></nav>
    </div>
  );
}

export default LuminaInteractiveList;
