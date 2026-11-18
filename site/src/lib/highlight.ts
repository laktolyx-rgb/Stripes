// Build-time Shiki highlighter shared by all components (one instance, all 4 generated themes).
import { createHighlighter, type Highlighter } from 'shiki';

const themeFiles = import.meta.glob('../generated/themes/*.json', { eager: true, import: 'default' });
export const themes = Object.values(themeFiles) as { name: string }[];
const LANGS = ['typescript', 'python', 'rust', 'go', 'lua'] as const;

let hl: Promise<Highlighter> | null = null;
export async function highlight(code: string, lang: (typeof LANGS)[number], variant: string) {
  hl ??= createHighlighter({ themes: themes as any, langs: [...LANGS] });
  const name = `Stripes ${variant[0].toUpperCase()}${variant.slice(1)}`;
  return (await hl).codeToHtml(code, { lang, theme: name });
}
