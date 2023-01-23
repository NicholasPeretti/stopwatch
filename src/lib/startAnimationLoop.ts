type StopAnimationLoopFn = () => void;

export default function startAnimationLoop(
  fn: () => void
): StopAnimationLoopFn {
  let animationFrameRef = null;
  function loopFn() {
    fn();
    animationFrameRef = window.requestAnimationFrame(loopFn);
  }

  animationFrameRef = window.requestAnimationFrame(loopFn);

  return () => {
    window.cancelAnimationFrame(animationFrameRef);
  };
}
