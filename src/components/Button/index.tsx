import * as Styles from './styles'

export type Props = {
  type: 'button' | 'link' | 'submit'
  title: string
  to?: string
  onClick?: () => void
  children: string
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

const Button = ({ type, title, to, onClick, children, variant = 'primary', disabled }: Props) => {
  if (type === 'button' || type === 'submit') {
    return (
      <Styles.ButtonContainer
        variant={variant}
        type={type}
        title={title}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Styles.ButtonContainer>
    )
  }

  return (
    <Styles.ButtonLink to={to as string} title={title}>
      {children}
    </Styles.ButtonLink>
  )
}

export default Button
