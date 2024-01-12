import { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export const AnimatedSection = (props: PropsWithChildren) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  const variants = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0.8, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="col-span-12  grid grid-cols-12"
    >
      {props.children}
    </motion.div>
  )
}
