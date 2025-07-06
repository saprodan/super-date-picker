import clsx from "clsx";
import style from "./options-tooltip.module.scss";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  type PropsWithChildren,
} from "react";
import { createPortal } from "react-dom";

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
    window.addEventListener("click", handleWindowClick, {
      // работает во время погружения, чтобы не отрабатывать после нажатия на кнопку открытия
      capture: true,
    });

    return () => {
      window.removeEventListener("click", handleWindowClick, {
        capture: true,
      });
    };
  });
  useLayoutEffect(() => {
    // вычисляем положение тултипа в зависимости от скролла
    const resizeListener = () => {
      if (refOptions.current && target) {
        setTooltipPosition(refOptions.current, target, 5, 10);
      }
    };

    resizeListener();
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  });

  return (
    <>
      {createPortal(
        <div className={clsx(style.options, className)} ref={refOptions}>
          {children}
        </div>,
        document.body
      )}
    </>
  );
};

/**
 * Устанавливает положение тултипа относительно таргета в зависимости от доступного места на экране
 * @param tooltip
 * @param target
 * @param gap
 * @param gapToWinBorder
 */
function setTooltipPosition(
  tooltip: HTMLElement,
  target: Element,
  gap: number,
  gapToWinBorder: number
) {
  if (tooltip && target) {
    const documentHeight = document.documentElement.clientHeight;
    const rect = tooltip.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    if (
      documentHeight - targetRect.bottom - rect.height - gap >
      gapToWinBorder
    ) {
      // рисуем внизу
      tooltip.style.top = window.pageYOffset + targetRect.bottom + gap + "px";
      tooltip.style.left = targetRect.left + "px";
    } else if (targetRect.top - rect.height - gap > gapToWinBorder) {
      // рисуем вверху
      tooltip.style.bottom =
        -window.pageYOffset + documentHeight - targetRect.top + gap + "px";
      tooltip.style.left = targetRect.left + "px";
    } else {
      // рисуем справа
      tooltip.style.left = targetRect.right + gap + "px";
      tooltip.style.top =
        window.pageYOffset + targetRect.top + targetRect.height / 2 + "px";
      tooltip.style.transform = "translateY(-50%)";
    }
  }
}
