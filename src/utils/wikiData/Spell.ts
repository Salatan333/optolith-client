import { Categories } from '../../constants/Categories';
import { List } from '../structures/List';
import { Maybe, Nothing } from '../structures/Maybe';
import { fromDefault, Record } from '../structures/Record';
import { SourceLink } from './sub/SourceLink';
import { AllRequirementObjects, CheckModifier, EntryWithCategory } from './wikiTypeHelpers';

export interface Spell {
  id: string
  name: string
  category: Categories
  check: List<string>
  checkmod: Maybe<CheckModifier>
  gr: number
  ic: number
  property: number
  tradition: List<number>
  subtradition: List<number>
  prerequisites: List<AllRequirementObjects>
  effect: string
  castingTime: string
  castingTimeShort: string
  cost: string
  costShort: string
  range: string
  rangeShort: string
  duration: string
  durationShort: string
  target: string
  src: List<Record<SourceLink>>
}

export const Spell =
  fromDefault<Spell> ({
    id: '',
    name: '',
    category: Categories.SPELLS,
    check: List.empty,
    checkmod: Nothing,
    gr: 0,
    ic: 0,
    property: 0,
    tradition: List.empty,
    subtradition: List.empty,
    prerequisites: List.empty,
    effect: '',
    castingTime: '',
    castingTimeShort: '',
    cost: '',
    costShort: '',
    range: '',
    rangeShort: '',
    duration: '',
    durationShort: '',
    target: '',
    src: List.empty,
  })

export const isSpell =
  (r: EntryWithCategory) => Spell.A.category (r) === Categories.SPELLS