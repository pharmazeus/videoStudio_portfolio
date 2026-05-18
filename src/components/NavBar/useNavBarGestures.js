import { useCallback, useEffect, useRef, useState } from "react";

const MOBILE_DRAG_RESISTANCE = 1;
const MOBILE_COMMIT_DISTANCE = 22;
const MOBILE_COMMIT_MIN_DISTANCE = 12;
const MOBILE_COMMIT_VELOCITY = 0.36;
const MOBILE_RELEASE_FALLBACK_DISTANCE = 10;
const MOBILE_WHEEL_MIN_DELTA = 16;
const MOBILE_WHEEL_QUIET_UNLOCK_DELAY = 140;
const MOBILE_WHEEL_MAX_LOCK = 420;
const MOBILE_SNAP_DURATION = 140;
const MOBILE_MAX_DRAG = 112;

function clampDragOffset(value) {
  return Math.max(-MOBILE_MAX_DRAG, Math.min(MOBILE_MAX_DRAG, value));
}

function releasePointerCapture(element, pointerId) {
  if (!element.hasPointerCapture?.(pointerId)) return;
  element.releasePointerCapture(pointerId);
}

export default function useNavBarGestures({ isActive, slidesCount, setActiveSlide }) {
  const [dragOffsetState, setDragOffsetState] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);

  const activePointerId = useRef(null);
  const dragStartX = useRef(0);
  const dragLastX = useRef(0);
  const dragLastTime = useRef(0);
  const dragVelocity = useRef(0);
  const dragOffset = useRef(0);
  const pendingDragOffset = useRef(0);
  const dragFrame = useRef(null);
  const suppressClickUntil = useRef(0);
  const isDraggingRef = useRef(false);
  const gestureCommitted = useRef(false);
  const wheelGestureLocked = useRef(false);
  const wheelUnlockTimeout = useRef(null);
  const wheelMaxUnlockTimeout = useRef(null);
  const snapTimeout = useRef(null);

  const setDragOffset = useCallback((value) => {
    const nextValue = clampDragOffset(value);
    pendingDragOffset.current = nextValue;
    dragOffset.current = nextValue;

    if (dragFrame.current) return;

    dragFrame.current = window.requestAnimationFrame(() => {
      dragFrame.current = null;
      setDragOffsetState(pendingDragOffset.current);
    });
  }, []);

  const resetDragOffset = useCallback(() => {
    if (dragFrame.current) {
      window.cancelAnimationFrame(dragFrame.current);
      dragFrame.current = null;
    }

    pendingDragOffset.current = 0;
    dragOffset.current = 0;
    setDragOffsetState(0);
  }, []);

  const startSnapPhase = useCallback(() => {
    if (snapTimeout.current) clearTimeout(snapTimeout.current);

    setIsSnapping(true);
    snapTimeout.current = window.setTimeout(() => {
      snapTimeout.current = null;
      setIsSnapping(false);
    }, MOBILE_SNAP_DURATION);
  }, []);

  const commitSlide = useCallback((direction, keepPointer = false) => {
    gestureCommitted.current = true;
    isDraggingRef.current = false;
    if (!keepPointer) {
      activePointerId.current = null;
    }
    suppressClickUntil.current = performance.now() + 240;
    setIsDragging(false);
    setActiveSlide((prev) => (
      prev + direction + slidesCount
    ) % slidesCount);
    resetDragOffset();
    startSnapPhase();
  }, [resetDragOffset, startSnapPhase, setActiveSlide, slidesCount]);

  const handlePointerDown = useCallback((event) => {
    if (
      !event.isPrimary ||
      (event.pointerType === "mouse" && event.button !== 0)
    ) {
      return;
    }

    activePointerId.current = event.pointerId;
    if (snapTimeout.current) {
      clearTimeout(snapTimeout.current);
      snapTimeout.current = null;
    }
    setIsSnapping(false);
    dragStartX.current = event.clientX;
    dragLastX.current = event.clientX;
    dragLastTime.current = performance.now();
    dragVelocity.current = 0;
    isDraggingRef.current = true;
    gestureCommitted.current = false;
    setIsDragging(true);
    resetDragOffset();
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }, [resetDragOffset]);

  const handlePointerMove = useCallback((event) => {
    if (
      !isDraggingRef.current ||
      activePointerId.current !== event.pointerId ||
      gestureCommitted.current
    ) {
      return;
    }

    const currentTime = performance.now();
    const delta = event.clientX - dragStartX.current;
    const timeDelta = Math.max(currentTime - dragLastTime.current, 1);

    dragVelocity.current = (event.clientX - dragLastX.current) / timeDelta;
    dragLastX.current = event.clientX;
    dragLastTime.current = currentTime;

    if (Math.abs(delta) > 6) {
      suppressClickUntil.current = currentTime + 220;
    }

    const absDelta = Math.abs(delta);
    const shouldCommitByDistance = absDelta >= MOBILE_COMMIT_DISTANCE;
    const shouldCommitByVelocity =
      absDelta >= MOBILE_COMMIT_MIN_DISTANCE &&
      Math.abs(dragVelocity.current) >= MOBILE_COMMIT_VELOCITY;

    if (shouldCommitByDistance || shouldCommitByVelocity) {
      const movement = shouldCommitByDistance ? delta : dragVelocity.current;
      const direction = movement < 0 ? 1 : -1;
      commitSlide(direction, true);
      return;
    }

    setDragOffset(delta * MOBILE_DRAG_RESISTANCE);
  }, [commitSlide, setDragOffset]);

  const handlePointerEnd = useCallback((event) => {
    if (activePointerId.current !== event.pointerId) return;

    releasePointerCapture(event.currentTarget, event.pointerId);
    if (gestureCommitted.current) {
      suppressClickUntil.current = performance.now() + 260;
      gestureCommitted.current = false;
      isDraggingRef.current = false;
      activePointerId.current = null;
      setIsDragging(false);
      resetDragOffset();
      return;
    }

    if (Math.abs(dragOffset.current) > 6) {
      suppressClickUntil.current = performance.now() + 220;
    }

    const currentOffset = dragOffset.current;
    if (Math.abs(currentOffset) >= MOBILE_RELEASE_FALLBACK_DISTANCE) {
      commitSlide(currentOffset < 0 ? 1 : -1);
      return;
    }

    isDraggingRef.current = false;
    activePointerId.current = null;
    setIsDragging(false);
    resetDragOffset();
  }, [commitSlide, resetDragOffset]);

  const handlePointerCancel = useCallback((event) => {
    if (activePointerId.current !== event.pointerId) return;

    releasePointerCapture(event.currentTarget, event.pointerId);
    isDraggingRef.current = false;
    activePointerId.current = null;
    gestureCommitted.current = false;
    setIsDragging(false);
    resetDragOffset();
  }, [resetDragOffset]);

  const unlockWheelGesture = useCallback(() => {
    wheelGestureLocked.current = false;

    if (wheelUnlockTimeout.current) {
      clearTimeout(wheelUnlockTimeout.current);
      wheelUnlockTimeout.current = null;
    }

    if (wheelMaxUnlockTimeout.current) {
      clearTimeout(wheelMaxUnlockTimeout.current);
      wheelMaxUnlockTimeout.current = null;
    }
  }, []);

  const handleWheel = useCallback((event) => {
    const absDeltaX = Math.abs(event.deltaX);
    if (
      absDeltaX <= Math.abs(event.deltaY) ||
      absDeltaX < MOBILE_WHEEL_MIN_DELTA
    ) {
      return;
    }

    suppressClickUntil.current = performance.now() + 220;

    if (wheelUnlockTimeout.current) clearTimeout(wheelUnlockTimeout.current);
    wheelUnlockTimeout.current = window.setTimeout(() => {
      unlockWheelGesture();
    }, MOBILE_WHEEL_QUIET_UNLOCK_DELAY);

    if (wheelGestureLocked.current) return;

    wheelGestureLocked.current = true;
    if (wheelMaxUnlockTimeout.current) clearTimeout(wheelMaxUnlockTimeout.current);
    wheelMaxUnlockTimeout.current = window.setTimeout(() => {
      unlockWheelGesture();
    }, MOBILE_WHEEL_MAX_LOCK);
    commitSlide(event.deltaX > 0 ? 1 : -1);
  }, [commitSlide, unlockWheelGesture]);

  useEffect(() => {
    if (isActive) return;

    isDraggingRef.current = false;
    activePointerId.current = null;
    gestureCommitted.current = false;
    wheelGestureLocked.current = false;
    if (wheelUnlockTimeout.current) {
      clearTimeout(wheelUnlockTimeout.current);
      wheelUnlockTimeout.current = null;
    }
    if (wheelMaxUnlockTimeout.current) {
      clearTimeout(wheelMaxUnlockTimeout.current);
      wheelMaxUnlockTimeout.current = null;
    }
    setIsDragging(false);
    if (snapTimeout.current) {
      clearTimeout(snapTimeout.current);
      snapTimeout.current = null;
    }
    setIsSnapping(false);
    resetDragOffset();
  }, [isActive, resetDragOffset]);

  useEffect(() => () => {
    if (dragFrame.current) window.cancelAnimationFrame(dragFrame.current);
    if (wheelUnlockTimeout.current) clearTimeout(wheelUnlockTimeout.current);
    if (wheelMaxUnlockTimeout.current) clearTimeout(wheelMaxUnlockTimeout.current);
    if (snapTimeout.current) clearTimeout(snapTimeout.current);
  }, []);

  return {
    dragOffsetState,
    isDragging,
    isSnapping,
    suppressClickUntil,
    resetDragOffset,
    handlePointerDown,
    handlePointerMove,
    handlePointerEnd,
    handlePointerCancel,
    handleWheel,
  };
}
