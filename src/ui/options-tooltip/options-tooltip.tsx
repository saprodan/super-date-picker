import clsx from 'clsx';
import style from './options-tooltip.module.scss';
import { useEffect, useRef, type PropsWithChildren } from 'react';

interface OptionsTooltipProps {
  className?: string;
  target: HTMLElement | null;
  onClose: () => void;
}

export const OptionsTooltip = ({
  className,
  onClose,
  target,
  children,
}: PropsWithChildren<OptionsTooltipProps>) => {
  const refOptions = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // добавляем обработчик на window, чтобы закрывать при нажатии
    const handleWindowClick = (e: Event) => {
      if (e.target instanceof Element && target instanceof Element) {
        if (
          !refOptions.current?.contains(e.target) &&
          !target.contains(e.target)
        ) {
          onClose();
        }
      }
    };
    window.addEventListener('click', handleWindowClick, {
      // работает во время погружения, чтобы не отрабатывать после нажатия на кнопку открытия
      capture: true,
    });

    return () => {
      window.removeEventListener('click', handleWindowClick, {
        capture: true,
      });
    };
  });
  return (
    <>
      <div
        className={clsx(style.options, className)}
        ref={refOptions}
      >
        {children}
      </div>
    </>
  );
};
