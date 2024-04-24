export interface TabsButtonProps {
  namsOfButton: string[];
  activeButtons: number;
  setActiveTabs: React.Dispatch<React.SetStateAction<string>>;
  withOfButton?: string;
}
