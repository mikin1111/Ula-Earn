import React from 'react';
import './CoinTitle.css';

/** 币种图标尺寸（px） */
export type CoinTitleSize = 40 | 36 | 32 | 28 | 24 | 20 | 16;

/** 组件类型 */
export type CoinTitleType =
  | 'single-row'
  | 'multiple-row'
  | 'coin-chain-single-row'
  | 'coin-chain-multiple-row';

/** 变量类型 */
export type CoinTitleVariant = 'default' | 'multi-chain';

/** 描边样式 */
export type CoinTitleBorder = 'subtle' | 'none';

/** 文字方向 */
export type CoinTitleDirection = 'ltr' | 'rtl';

/** 颜色模式 */
export type CoinTitleColorMode = 'light' | 'dark';

export interface CoinTitleProps {
  /** 币种名称（如 BTC） */
  coin: string;
  /** 链名称（多链场景，如 Bitcoin） */
  chain?: string;
  /** 图标尺寸（px） */
  size?: CoinTitleSize;
  /** 布局类型 */
  type?: CoinTitleType;
  /** 变量类型 */
  variant?: CoinTitleVariant;
  /** 使用占位图标（首字母或通用占位） */
  placeholder?: boolean;
  /** 描边：subtle 使用 line-border-subtle，web 端常用 */
  border?: CoinTitleBorder;
  /** 文字方向，阿语适配用 rtl */
  direction?: CoinTitleDirection;
  /** 颜色模式，不传则跟随 data-theme */
  colorMode?: CoinTitleColorMode;
  /** 副标题文本 */
  subtitle?: string;
  /** 自定义币种图标（覆盖默认/占位） */
  coinIcon?: React.ReactNode;
  /** 自定义链图标（多链时，覆盖默认） */
  chainIcon?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
}

/** 尺寸对应的链图标间距（px） */
const CHAIN_GAP: Record<CoinTitleType, number> = {
  'single-row': 8,
  'multiple-row': 6,
  'coin-chain-single-row': 6,
  'coin-chain-multiple-row': 4,
};

/**
 * CoinTitle · Gate 设计规范
 * 币种标题组件，Web + H5 一体化
 * - 类型：single-row / multiple-row / coin-chain-single-row / coin-chain-multiple-row
 * - 尺寸：40 / 36 / 32 / 28 / 24 / 20 / 16px
 * - 占位图标、描边、RTL、Light/Dark
 */
export function CoinTitle({
  coin,
  chain,
  size = 32,
  type = 'single-row',
  variant = 'default',
  placeholder = false,
  border = 'none',
  direction = 'ltr',
  colorMode,
  subtitle,
  coinIcon,
  chainIcon,
  className = '',
}: CoinTitleProps) {
  const isMultiChain = variant === 'multi-chain' || type.startsWith('coin-chain');
  const isMultipleRow = type.includes('multiple-row');
  const isSingleRow = type === 'single-row' || type === 'coin-chain-single-row';
  const isSingleRowMultiChain =
    isMultiChain && (type === 'single-row' || type === 'coin-chain-single-row');
  const chainGap = CHAIN_GAP[type];

  const displayTitle = coin || '?';
  /** 单行时仅主标题，不展示副标题 */
  const displaySubtitle = isSingleRow ? undefined : subtitle;
  const placeholderLetter = displayTitle.charAt(0).toUpperCase() || '?';

  const sizeClass = `coin-title--${size}`;
  const typeClass = `coin-title--${type}`;
  const variantClass = variant !== 'default' ? `coin-title--${variant}` : '';
  const borderClass = border === 'subtle' ? 'coin-title--border-subtle' : '';
  const dirClass = direction === 'rtl' ? 'coin-title--rtl' : '';
  const themeClass = colorMode ? `coin-title--${colorMode}` : '';

  const overlayClass = isSingleRowMultiChain ? 'coin-title--chain-overlay' : '';

  const classes = [
    'coin-title',
    sizeClass,
    typeClass,
    variantClass,
    borderClass,
    dirClass,
    themeClass,
    overlayClass,
    placeholder ? 'coin-title--placeholder' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderCoinIcon = () => {
    if (coinIcon) return coinIcon;
    if (placeholder) {
      return (
        <span className="coin-title__icon-placeholder" aria-hidden>
          {placeholderLetter}
        </span>
      );
    }
    return (
      <span className="coin-title__icon coin-title__icon--default" aria-hidden>
        {/* 默认使用首字母占位样式，实际项目可替换为 <img> 或 SVG */}
        {placeholderLetter}
      </span>
    );
  };

  const renderChainIcon = () => {
    if (chainIcon) return chainIcon;
    if (placeholder) {
      return (
        <span
          className="coin-title__chain-icon coin-title__chain-icon--placeholder"
          aria-hidden
        />
      );
    }
    return (
      <span
        className="coin-title__chain-icon coin-title__chain-icon--default"
        aria-hidden
      />
    );
  };

  /** 单行多链：Web/H5 为叠加布局，不使用 gap */
  const iconsWrapperStyle =
    isMultiChain && !isSingleRowMultiChain ? { gap: `${chainGap}px` } : undefined;

  return (
    <div
      className={classes}
      dir={direction}
      role="img"
      aria-label={`${displayTitle}${displaySubtitle ? ` ${displaySubtitle}` : ''}`}
    >
      <div className="coin-title__icons" style={iconsWrapperStyle}>
        {renderCoinIcon()}
        {isMultiChain && renderChainIcon()}
      </div>
      <div className="coin-title__text">
        <span className="coin-title__title">{displayTitle}</span>
        {displaySubtitle && (
          <span className="coin-title__subtitle">{displaySubtitle}</span>
        )}
      </div>
    </div>
  );
}
