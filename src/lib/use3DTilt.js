import { useRef, useCallback } from "react";

/**
 * Lightweight 3D tilt hook — mouse-tracking perspective effect.
 * GPU-accelerated via transform3d, no libraries needed.
 *
 * @param {number} maxTilt  Max rotation in degrees (default 10)
 * @param {number} speed    Transition speed in ms (default 400)
 * @returns {{ ref, onMouseMove, onMouseLeave }}
 */
export default function use3DTilt(maxTilt = 10, speed = 400) {
  const ref = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 → 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      el.style.transition = `transform ${speed}ms cubic-bezier(0.23, 1, 0.32, 1)`;
      el.style.transform =
        `perspective(800px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale3d(1.02,1.02,1.02)`;
      el.style.zIndex = "20";
    },
    [maxTilt, speed],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = `transform ${speed}ms cubic-bezier(0.23, 1, 0.32, 1)`;
    el.style.transform =
      "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
    el.style.zIndex = "";
  }, [speed]);

  return { ref, onMouseMove, onMouseLeave };
}
