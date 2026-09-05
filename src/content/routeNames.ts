import type { Runner } from '../domain/compatibility'
import type { Locale } from '../i18n/locale'

// Identity only: edition, setup difficulty and purchase constraints live elsewhere.
const routeNames = {
  native: { en: 'Mac edition', 'zh-CN': 'Mac 版' },
  rosetta: { en: 'Rosetta 2', 'zh-CN': 'Rosetta 2' },
  crossover: { en: 'CrossOver', 'zh-CN': 'CrossOver' },
  wine: { en: 'Wine', 'zh-CN': 'Wine' },
  whisky: { en: 'Whisky', 'zh-CN': 'Whisky' },
  'porting-kit': { en: 'Porting Kit', 'zh-CN': 'Porting Kit' },
  sikarugir: { en: 'Sikarugir', 'zh-CN': 'Sikarugir' },
  'virtual-machine': { en: 'Virtual machine', 'zh-CN': '虚拟机' },
} satisfies Record<Runner['kind'], Record<Locale, string>>

export function routeName(kind: Runner['kind'], locale: Locale): string {
  return routeNames[kind][locale]
}
