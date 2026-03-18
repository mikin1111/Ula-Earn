/**
 * Coin Title 币种图标
 * 来源：icons/Currency Chain Icons/
 */

const ICON_BASE = '/icons/Currency Chain Icons';

/** 币种符号 → Chain 图标文件名 */
const COIN_ICON_MAP: Record<string, string> = {
  BTC: 'Chain_BTC.svg',
  ETH: 'Chain_ETH.svg',
  USDT: 'Chain_USDT.svg',
  BNB: 'Chain_BNB.svg',
  SOL: 'Chain_SOL.svg',
  TRX: 'Chain_TRX.svg',
  XRP: 'Chain_XRP.svg',
  DOGE: 'Chain_DOGE.svg',
  LTC: 'Chain_LTC.svg',
  AVAX: 'Chain_AVAX.svg',
  DOT: 'Chain_DOT.svg',
  GT: 'Chain_GT.svg',
  SHIB: 'Chain_SHIB.svg',
  ENA: 'Chain_ENA.svg',
  RADAR: 'Chain_RADAR.svg',
  PIGCOIN: 'Chain_PIGCOIN.svg',
  MEW: 'Chain_MEW.svg',
  Base: 'Chain_Base.svg',
};

/** 默认链图标（获取不到币种时） */
export const DEFAULT_CHAIN_ICON = `${ICON_BASE}/Chain_默认链图标.svg`;

/**
 * 获取币种图标路径
 * @param coin 币种符号（如 BTC、ETH）
 * @param basePath 基础路径，用于相对路径场景（如 ../../../icons）
 */
export function getCoinIconPath(coin: string, basePath = ''): string | null {
  const symbol = (coin || '').toUpperCase();
  const filename = COIN_ICON_MAP[symbol];
  if (!filename) return null;
  const prefix = basePath ? `${basePath}/` : '';
  return `${prefix}Currency Chain Icons/${filename}`;
}

/**
 * 渲染币种图标 img 元素
 */
export function CoinIconImg({
  coin,
  size,
  className = '',
  basePath = '../../../icons',
}: {
  coin: string;
  size?: number;
  className?: string;
  basePath?: string;
}) {
  const src = getCoinIconPath(coin, basePath);
  if (!src) return null;
  return (
    <img
      src={src}
      alt={coin}
      className={className}
      width={size}
      height={size}
      loading="lazy"
    />
  );
}
