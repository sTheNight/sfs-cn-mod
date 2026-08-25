export interface BasicSettingCardProps {
  title: string,
  description?: string,
  showUndo?: boolean,
  isExperiment?: boolean,
  disabled?: boolean,
  vertical?: boolean
}

export type ResettableSettingCardProps<T> = Omit<BasicSettingCardProps, 'showUndo'> & {
  defaultValue?: T
}
