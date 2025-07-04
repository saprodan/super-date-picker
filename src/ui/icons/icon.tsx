import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from "./collection";
import type { IconProps } from "./icon.props";

/** 
 *Компонет Icon является svg-спрайтом, в свойство icon передается строка с названием иконки, которую вы хотите получить.
 Для более глубокой стилизации передайте дополнительный класс и внутри него уже задавайте стили path или g
 @example 
 <Icon icon="close"/>
 <Icon icon="logo" className={'any'}/>
 <Icon icon='favorite' width={40} height={50} stroke='red'/>
 @param icon - строка, наведите мышкой чтобы посмотреть возможне варианты
 @param props - любые атрибуты, которые может принимать svg-элемент
 @returns {JSX.Element} - возвращает svg
*/

export const Icon = ({ icon, ...props }: IconProps) => {
  const iconsConfig = {
    ["arrow-right"]: <ArrowRightIcon {...props} />,
    ["arrow-left"]: <ArrowLeftIcon {...props} />,
    ["calendar"]: <CalendarIcon {...props} />,
  };

  return iconsConfig[icon];
};
