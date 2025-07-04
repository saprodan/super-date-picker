import clsx from 'clsx';
import { useState, type ReactNode } from 'react';

import style from './tabs.module.scss';

interface TabsProps {
  tabsNames: string[];
  childrenList: ReactNode[];
  className?: string;
}
export default function Tabs({
  tabsNames,
  childrenList,
  className,
}: TabsProps) {
  const [currentTab, setCurrentTab] = useState<number>(0);
  return (
    <div className={clsx(className)}>
      <div className={style.tabBar}>
        <ul>
          {tabsNames.map((name, i) => (
            <li
              className={clsx(i === currentTab && style.activeTab)}
              onClick={() => setCurrentTab(i)}
              key={name}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
      <div>{childrenList[currentTab]}</div>
    </div>
  );
}
