import { useEffect } from 'react';
import { Box } from '@mui/material';
import { LazyMotion, MotionConfig, useInView, useReducedMotion } from 'motion/react';
import { useAnimate } from 'motion/react-mini';
import * as m from 'motion/react-m';

export { m };
export const curva = [0.22, 1, 0.36, 1];
const cargarFunciones = () => import('./movimiento-features').then((modulo) => modulo.default);

export function Movimiento({ children }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.35, ease: curva }}>
      <LazyMotion features={cargarFunciones} strict>{children}</LazyMotion>
    </MotionConfig>
  );
}

/* El HTML y el primer render quedan visibles. La entrada se aplica solo
   al entrar en pantalla: no depende de JS para mostrar el contenido. */
export function Revelar({ children, demora = 0, sx }) {
  const [elemento, animar] = useAnimate();
  const visible = useInView(elemento, { once: true, amount: 0.12 });
  const reducir = useReducedMotion();

  useEffect(() => {
    if (reducir) {
      elemento.current.style.opacity = '1';
      elemento.current.style.transform = 'none';
      return;
    }
    if (!visible) return;
    const control = animar(elemento.current, { opacity: [0, 1], y: [18, 0] }, { duration: 0.5, delay: demora, ease: curva });
    return () => control.stop();
  }, [visible, reducir, demora, animar, elemento]);

  return <Box ref={elemento} sx={sx} data-reveal>{children}</Box>;
}

export function EntradaPagina({ ruta, children }) {
  const [elemento, animar] = useAnimate();
  const reducir = useReducedMotion();
  useEffect(() => {
    if (reducir) {
      elemento.current.style.opacity = '1';
      return;
    }
    const control = animar(elemento.current, { opacity: [0.55, 1] }, { duration: 0.25 });
    return () => control.stop();
  }, [ruta, reducir, animar, elemento]);
  return <Box ref={elemento}>{children}</Box>;
}
