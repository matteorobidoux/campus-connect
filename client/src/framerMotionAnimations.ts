export function FadeInAnimation(duration: number) {
  return {
    hidden: {
      opacity: 0,
      transition: {
        duration: duration,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: duration,
      },
    },
  };
}

export function StaggeredFadeInAnimation(
  visibleDuration: number,
  hidingDuration: number,
  delay: number,
  stagger: number
) {
  return {
    hidden: {
      opacity: 0,
      transition: {
        duration: hidingDuration,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: visibleDuration,
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };
}
