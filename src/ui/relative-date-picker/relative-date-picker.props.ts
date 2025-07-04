export interface IRelativeDatePickerProps {
  label: string;
  className?: string;
  dateFormat?: string;
  onChange: (date: Date) => void;
}
