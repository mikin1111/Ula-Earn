import React, { useState, useCallback } from 'react';
import './FAQ.css';
import { FAQChevronDown, FAQChevronUp } from '../../icons';

/** Single FAQ item */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

/** Optional "More Details" link at bottom of FAQ section */
export interface FAQMoreDetails {
  text: string;
  href: string;
}

export interface FAQProps {
  /** FAQ items list */
  items?: FAQItem[];
  /** Optional section title (centered, uppercase, bold) */
  title?: string;
  /** Size: large=Web, medium=H5, h5=H5 移动端 */
  size?: 'large' | 'medium' | 'h5';
  /** Allow multiple items expanded (default false, accordion) */
  allowMultiple?: boolean;
  /** Text direction, supports RTL (e.g. Arabic) */
  dir?: 'ltr' | 'rtl' | 'auto';
  /** Optional "More Details" link shown after all FAQ items */
  moreDetails?: FAQMoreDetails;
  /** Custom class name */
  className?: string;
}

/** Default mock data: Gate.io account & security (English) */
const DEFAULT_FAQ_ITEMS: FAQItem[] = [
  {
    id: '1',
    question: 'This is a collapse title text',
    answer:
      'Gate.io is a crypto exchange that supports registration, KYC, deposits, trading 1400+ cryptocurrencies, exchange wallets, and real-time market data. Complete email or SMS verification to create your account. Enable 2FA for enhanced security.',
  },
  {
    id: '2',
    question: 'This is a collapse title text',
    answer:
      'Enable 2FA, bind your email and phone, and change your password regularly. Never share your password, verification codes, or recovery phrase. Only access via official channels and beware of phishing sites.',
  },
  {
    id: '3',
    question: 'This is a collapse title text',
    answer:
      '2FA requires a one-time code from SMS or an authenticator app after entering your password. Enable it in Settings → Security Center → Two-Factor Authentication.',
  },
  {
    id: '4',
    question: 'This is a collapse title text',
    answer:
      'Per AML and KYC regulations, identity verification is required before withdrawal. Provide a valid ID and complete face verification—approval typically takes minutes.',
  },
  {
    id: '5',
    question: 'This is a collapse title text',
    answer:
      'Yes. We notify you via app push, SMS, or email when we detect new device login, remote login, or unusual activity. If you did not authorize it, change your password immediately and contact support.',
  },
];

/**
 * FAQ Accordion (Gate.io Design System)
 * - Sizes: Large (Web) / Medium / H5 (移动端)
 * - States: Collapse, Hover, Expand
 * - Accordion (single expand), Ease out animation
 * - RTL, Light/Dark theme support
 */
export function FAQ({
  items = DEFAULT_FAQ_ITEMS,
  title,
  size,
  allowMultiple = true,
  dir = 'auto',
  moreDetails,
  className = '',
}: FAQProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggle = useCallback(
    (id: string) => {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!allowMultiple) next.clear();
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  const isExpanded = useCallback(
    (id: string) => expandedIds.has(id),
    [expandedIds]
  );

  const sizeClass = size ? `faq--${size}` : '';
  const displayTitle = (size === 'large' || size === 'medium' || size === 'h5') ? 'FAQ' : title;

  return (
    <div
      className={`faq ${sizeClass} ${className}`.trim()}
      role="region"
      aria-label="Frequently Asked Questions"
      dir={dir}
    >
      {displayTitle && (
        <h2 className="faq__title">{displayTitle}</h2>
      )}
      <ul className="faq__list" role="list">
        {items.map((item) => {
          const expanded = isExpanded(item.id);
          const contentId = `faq-answer-${item.id}`;
          const triggerId = `faq-trigger-${item.id}`;

          return (
            <li key={item.id} className="faq__item">
              <div className="faq__header">
                <button
                  id={triggerId}
                  type="button"
                  className="faq__trigger"
                  aria-expanded={expanded}
                  aria-controls={contentId}
                  onClick={() => toggle(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggle(item.id);
                    }
                  }}
                >
                  <span className="faq__question">{item.question}</span>
                  <span className="faq__icon">
                    {expanded ? (
                      <FAQChevronUp className="faq__icon-svg" />
                    ) : (
                      <FAQChevronDown className="faq__icon-svg" />
                    )}
                  </span>
                </button>
              </div>
              <div
                id={contentId}
                className="faq__content"
                role="region"
                aria-labelledby={triggerId}
                data-expanded={expanded}
              >
                <div className="faq__content-inner">
                  <p className="faq__answer">{item.answer}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {moreDetails && (
        <div className="faq__footer">
          <a
            href={moreDetails.href}
            className="faq__more"
            target="_blank"
            rel="noopener noreferrer"
          >
            {moreDetails.text}
          </a>
        </div>
      )}
    </div>
  );
}
