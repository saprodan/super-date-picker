export interface IQuckSelectProps {
  className?: string;
  onQuickChange: (interval: {
    startDate: Date;
    endDate: Date;
  }) => void;
  onCommonChange: (interval: {
    startDate: Date;
    endDate: Date;
  }) => void;
}
