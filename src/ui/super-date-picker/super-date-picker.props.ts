export interface ISuperDatePickerProps {
  onTimeChange: (output: OnTimeChangeProps) => void;
  showUpdateButton?: boolean;
  dateFormat?: string;
  className?: string;
}

export interface OnTimeChangeProps {
  start: string;
  end: string;
  startDate: Date;
  endDate: Date;
}
