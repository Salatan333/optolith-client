import { ActiveViewObject, DeactiveViewObject } from '../App/Models/Hero/heroTypeHelpers';
import { Advantage, Disadvantage, SpecialAbility } from '../App/Models/Wiki/wikiTypeHelpers';
import { createMaybeSelector } from '../App/Utils/createMaybeSelector';
import { List, Maybe, Record, RecordInterface } from '../Utilities/dataUtils';
import { AllSortOptions, filterAndSortObjects } from '../Utilities/FilterSortUtils';
import { getAdvantagesForEdit, getDisadvantagesForEdit, getSpecialAbilitiesForEdit } from './activatableSelectors';
import { getDeactiveAdvantages, getDeactiveDisadvantages, getDeactiveSpecialAbilities } from './inactiveActivatablesSelectors';
import { getSpecialAbilitiesSortOptions } from './sortOptionsSelectors';
import { getInactiveAdvantagesFilterText, getInactiveDisadvantagesFilterText, getInactiveSpecialAbilitiesFilterText, getLocaleAsProp } from './stateSelectors';
import { getEnableActiveItemHints } from './uisettingsSelectors';

type InactiveOrActiveAdvantage =
  Record<ActiveViewObject<Advantage>>
  | Record<DeactiveViewObject<Advantage>>;

export const getFilteredInactiveAdvantages = createMaybeSelector (
  getDeactiveAdvantages,
  getAdvantagesForEdit,
  getInactiveAdvantagesFilterText,
  getLocaleAsProp,
  getEnableActiveItemHints,
  (
    maybeInactive,
    maybeActive,
    filterText,
    locale,
    areActiveItemHintsEnabled
  ): Maybe<List<InactiveOrActiveAdvantage>> =>
    maybeInactive.fmap (
      inactive => areActiveItemHintsEnabled
        ? filterAndSortObjects<RecordInterface<InactiveOrActiveAdvantage>> (
          /**
           * FIXME: Remove `<any>` in future version of TypeScript or when
           * type inference and compatibility for `Record` is better.
           */
          Maybe.fromMaybe<any>
            (inactive)
            (maybeActive .fmap (List.mappend<InactiveOrActiveAdvantage> (inactive))),
          locale.get ('id'),
          filterText
        )
        : filterAndSortObjects (
          inactive,
          locale.get ('id'),
          filterText
        )
    )
);

type InactiveOrActiveDisadvantage =
  Record<ActiveViewObject<Disadvantage>>
  | Record<DeactiveViewObject<Disadvantage>>;

export const getFilteredInactiveDisadvantages = createMaybeSelector (
  getDeactiveDisadvantages,
  getDisadvantagesForEdit,
  getInactiveDisadvantagesFilterText,
  getLocaleAsProp,
  getEnableActiveItemHints,
  (maybeInactive, maybeActive, filterText, locale, areActiveItemHintsEnabled) =>
    maybeInactive.fmap (
      inactive => areActiveItemHintsEnabled
        ? filterAndSortObjects<RecordInterface<InactiveOrActiveDisadvantage>> (
          /**
           * FIXME: Remove `<any>` in future version of TypeScript or when
           * type inference and compatibility for `Record` is better.
           */
          Maybe.fromMaybe<any>
            (inactive)
            (maybeActive .fmap (List.mappend<InactiveOrActiveDisadvantage> (inactive))),
          locale.get ('id'),
          filterText
        )
        : filterAndSortObjects (
          inactive,
          locale.get ('id'),
          filterText
        )
    )
);

type InactiveOrActiveSpecialAbility =
  Record<ActiveViewObject<SpecialAbility>>
  | Record<DeactiveViewObject<SpecialAbility>>;

export const getFilteredInactiveSpecialAbilities = createMaybeSelector (
  getDeactiveSpecialAbilities,
  getSpecialAbilitiesForEdit,
  getSpecialAbilitiesSortOptions,
  getInactiveSpecialAbilitiesFilterText,
  getLocaleAsProp,
  getEnableActiveItemHints,
  (maybeInactive, maybeActive, sortOptions, filterText, locale, areActiveItemHintsEnabled) =>
    maybeInactive.fmap (
      inactive => areActiveItemHintsEnabled
        ? filterAndSortObjects<RecordInterface<InactiveOrActiveSpecialAbility>> (
          /**
           * FIXME: Remove `<any>` in future version of TypeScript or when
           * type inference and compatibility for `Record` is better.
           */
          Maybe.fromMaybe<any>
            (inactive)
            (maybeActive .fmap (List.mappend<InactiveOrActiveSpecialAbility> (inactive))),
          locale.get ('id'),
          filterText,
          sortOptions as AllSortOptions<RecordInterface<InactiveOrActiveSpecialAbility>>
        )
        : filterAndSortObjects (
          inactive,
          locale.get ('id'),
          filterText,
          sortOptions as AllSortOptions<DeactiveViewObject<SpecialAbility>>
        )
    )
);
