export interface CheckBoxSelectProps {
  options: {
    label: string;
    value: string;
  }[];
  onChange: (selectedOptions: string[]) => void;
  label: string;
  width: string;
  height: string;
  fontSize: string;
}
