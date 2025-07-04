export interface IAbsoluteDatePickerProps {
  label: string;
  initialDate: Date;
  className?: string;
  dateFormat?: string;
  onChange: (date: Date) => void;
}
