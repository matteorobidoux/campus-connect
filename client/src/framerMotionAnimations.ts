/**
 * Returns a framer motion animation object containing
 * a fade in animation made with given duration
 * @param {number} duration Duration of the animation
 * @return {Object}  Framer motion formatted animation object
 * @export function
 */
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

/**
 * Returns a framer motion animation object containing
 * a fade in animation made with given duration for entering and leaving
 * the animation. It also sets the delay and stagger for the animated children.
 * @param {number} visibleDuration Entering animation duration
 * @param {number} hidingDuration Leaving animation duration
 * @param {number} delay Amount of delay
 * @param {number} stagger Amount of stagger
 * @return {Object}  Framer motion formatted animation object
 * @export function
 */
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
