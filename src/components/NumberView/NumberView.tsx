import React, { useCallback, useState } from 'react';
import './NumberView.css';

/** 尺寸级别：Large/Medium/Small 对应 Web-H5 双端，H5 最小 12px */
export type NumberViewSize =
  | 'xl'   // 60px Web
  | 'lg'   // 40px
  | 'md'   // 30px
  | 'sm'   // 24px
  | 'xs'   // 20px
  | 'xxs-16'  // 16px
  | 'xxs'; // 14px

/** 对齐方式 */
export type NumberViewAlign = 'left' | 'middle' | 'right';

/** 组件变体 */
export type NumberViewVariant =
  | 'default'        // 纯数字 + 单位
  | 'subtitle'       // 主数字下方带副标题
  | 'subtitle-next'  // 副标题紧随主数字后
  | 'underline'      // 主数字下方带下划线 + 副标题
  | 'subtitle-icon'; // 副标题带图标

/** Subtitle 语义色 */
export type NumberViewSubtitleVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export interface NumberViewProps {
  /** 数值 */
  value: number;
  /** 单位（如 USDT） */
  unit?: string;
  /** 尺寸 */
  size?: NumberViewSize;
  /** 对齐 */
  align?: NumberViewAlign;
  /** 变体类型 */
  variant?: NumberViewVariant;
  /** 副标题文本（subtitle / subtitle-next / underline / subtitle-icon 时使用） */
  subtitle?: string;
  /** 副标题语义色 */
  subtitleVariant?: NumberViewSubtitleVariant;
  /** 副标题图标（subtitle-icon 时使用，如箭头） */
  subtitleIcon?: React.ReactNode;
  /** 敏感态：脱敏显示 */
  sensitive?: boolean;
  /** 整数时是否隐藏小数位 .00 */
  hideDecimalZero?: boolean;
  /** 小数位数 */
  decimalPlaces?: number;
  /** 多语言 locale */
  locale?: string;
  /** 是否启用点击复制（或传入 onClickCopy 即启用） */
  copyable?: boolean;
  /** 点击复制成功回调 */
  onClickCopy?: () => void;
  /** 自定义类名 */
  className?: string;
}

const LOCALE_DEFAULTS: Record<string, { group: string; decimal: string }> = {
  en: { group: ',', decimal: '.' },
  'en-US': { group: ',', decimal: '.' },
  zh: { group: ',', decimal: '.' },
  'zh-CN': { group: ',', decimal: '.' },
};

function formatNumber(
  value: number,
  locale: string,
  decimalPlaces: number,
  hideDecimalZero: boolean,
  sensitive: boolean
): { integer: string; decimal: string; full: string } {
  const isInteger = Number.isInteger(value);
  const opts = LOCALE_DEFAULTS[locale] ?? LOCALE_DEFAULTS.en;
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: hideDecimalZero && isInteger ? 0 : decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    useGrouping: true,
  });
  const full = formatter.format(value);

  if (sensitive) {
    // 脱敏：数字替换为 *，保留逗号、小数点
    const masked = full.replace(/\d/g, '*');
    const lastDot = masked.lastIndexOf(opts.decimal);
    if (lastDot >= 0) {
      return {
        integer: masked.slice(0, lastDot),
        decimal: masked.slice(lastDot),
        full: masked,
      };
    }
    return { integer: masked, decimal: '', full: masked };
  }

  const lastDot = full.lastIndexOf(opts.decimal);
  if (lastDot >= 0) {
    return {
      integer: full.slice(0, lastDot),
      decimal: full.slice(lastDot),
      full,
    };
  }
  return { integer: full, decimal: '', full };
}

/**
 * NumberView · Gate 设计规范
 * 金融场景金额/余额/价格展示，Web + H5 一体化
 * - 尺寸：xl/lg/md/sm/xs/xxs
 * - 变体：default / subtitle / subtitle-next / underline / subtitle-icon
 * - 敏感态脱敏、点击复制、多语言数字格式
 */
export function NumberView({
  value,
  unit = '',
  size = 'md',
  align = 'left',
  variant = 'default',
  subtitle,
  subtitleVariant = 'secondary',
  subtitleIcon,
  sensitive = false,
  hideDecimalZero = false,
  decimalPlaces = 2,
  locale = 'en',
  copyable = false,
  onClickCopy,
  className = '',
}: NumberViewProps) {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const canCopy = copyable || !!onClickCopy;

  const { integer, decimal, full } = formatNumber(
    value,
    locale,
    decimalPlaces,
    hideDecimalZero,
    sensitive
  );

  const handleCopy = useCallback(() => {
    if (!canCopy) return;
    const text = `${full}${unit ? ` ${unit}` : ''}`;
    navigator.clipboard?.writeText(text).then(() => {
      onClickCopy?.();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [full, unit, canCopy, onClickCopy]);

  const sizeClass = size !== 'md' ? `number-view--${size}` : '';
  const alignClass = align !== 'left' ? `number-view--align-${align}` : '';
  const variantClass = variant !== 'default' ? `number-view--${variant}` : '';
  const subtitleVarClass =
    subtitleVariant !== 'secondary'
      ? `number-view__subtitle--${subtitleVariant}`
      : '';

  const classes = [
    'number-view',
    sizeClass,
    alignClass,
    variantClass,
    sensitive ? 'number-view--sensitive' : '',
    canCopy ? 'number-view--copyable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hasSubtitle = variant !== 'default' && subtitle;
  const isSubtitleNext = variant === 'subtitle-next';

  const content = (
    <div className={classes}>
      <div className="number-view__row">
        <div className="number-view__main">
          <span className="number-view__integer">{integer}</span>
          {decimal && <span className="number-view__decimal">{decimal}</span>}
          {unit && <span className="number-view__unit">{unit}</span>}
        </div>
        {hasSubtitle && isSubtitleNext && (
          <div
            className={`number-view__subtitle number-view__subtitle--next ${subtitleVarClass}`.trim()}
          >
            {subtitleIcon && (
              <span className="number-view__subtitle-icon">{subtitleIcon}</span>
            )}
            <span className="number-view__subtitle-text">{subtitle}</span>
          </div>
        )}
      </div>
      {hasSubtitle && !isSubtitleNext && (
        <>
          {variant === 'underline' && <div className="number-view__underline" aria-hidden />}
          <div
            className={`number-view__subtitle ${subtitleVarClass}`.trim()}
            data-variant={variant}
          >
            {variant === 'subtitle-icon' && subtitleIcon && (
              <span className="number-view__subtitle-icon">{subtitleIcon}</span>
            )}
            <span className="number-view__subtitle-text">{subtitle}</span>
          </div>
        </>
      )}
    </div>
  );

  if (canCopy) {
    return (
      <div
        className="number-view__wrapper"
        role="button"
        tabIndex={0}
        onClick={handleCopy}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCopy();
          }
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="点击复制"
      >
        {content}
        {showTooltip && !copied && (
          <span className="number-view__tooltip">点击复制</span>
        )}
        {copied && (
          <span className="number-view__toast" role="status">
            复制成功
          </span>
        )}
      </div>
    );
  }

  return content;
}
