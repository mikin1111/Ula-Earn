import './BtnPrimary.css';

export interface BtnPrimaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 子元素 */
  children: React.ReactNode;
}

/**
 * 一级按钮
 * 圆角遵循 Gate APP 规范：常规按钮使用 --Radius-default (6px)
 */
export function BtnPrimary({
  size = 'md',
  children,
  className = '',
  ...props
}: BtnPrimaryProps) {
  const sizeClass = size !== 'md' ? `btn-primary--${size}` : '';
  const classes = ['btn-primary', sizeClass, className].filter(Boolean).join(' ');

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
