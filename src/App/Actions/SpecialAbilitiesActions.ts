import { fmap } from "../../Data/Functor";
import { set } from "../../Data/Lens";
import { List, subscriptF } from "../../Data/List";
import { bind, bindF, ensure, fromJust, isJust, isNothing, Just, liftM2 } from "../../Data/Maybe";
import { lookup } from "../../Data/OrderedMap";
import { Pair } from "../../Data/Pair";
import { Record } from "../../Data/Record";
import { ActionTypes } from "../Constants/ActionTypes";
import { ActivatableActivationOptions } from "../Models/Actions/ActivatableActivationOptions";
import { ActivatableDeactivationOptions } from "../Models/Actions/ActivatableDeactivationOptions";
import { ActivatableDependent } from "../Models/ActiveEntries/ActivatableDependent";
import { ActiveObjectWithIdL, toActiveObjectWithId } from "../Models/ActiveEntries/ActiveObjectWithId";
import { HeroModel } from "../Models/Hero/HeroModel";
import { ActivatableNameCost, ActivatableNameCostSafeCost } from "../Models/View/ActivatableNameCost";
import { L10nRecord } from "../Models/Wiki/L10n";
import { isSpecialAbility, SpecialAbility } from "../Models/Wiki/SpecialAbility";
import { getAvailableAdventurePoints } from "../Selectors/adventurePointsSelectors";
import { getIsInCharacterCreation } from "../Selectors/phaseSelectors";
import { getCurrentHeroPresent, getWiki } from "../Selectors/stateSelectors";
import { getNameCost } from "../Utilities/Activatable/activatableActiveUtils";
import { convertPerTierCostToFinalCost } from "../Utilities/AdventurePoints/activatableCostUtils";
import { getMissingAP } from "../Utilities/AdventurePoints/adventurePointsUtils";
import { translate, translateP } from "../Utilities/I18n";
import { subtract } from "../Utilities/mathUtils";
import { pipe } from "../Utilities/pipe";
import { getWikiEntry } from "../Utilities/WikiUtils";
import { ReduxAction } from "./Actions";
import { addAlert } from "./AlertActions";

export interface ActivateSpecialAbilityAction {
  type: ActionTypes.ACTIVATE_SPECIALABILITY
  payload: Pair<Record<ActivatableActivationOptions>, Record<SpecialAbility>>
}

/**
 * Add a special ability with the provided activation properties (`args`).
 */
export const addSpecialAbility =
  (l10n: L10nRecord) =>
  (args: Record<ActivatableActivationOptions>): ReduxAction =>
  (dispatch, getState) => {
    const state = getState ()

    const mhero = getCurrentHeroPresent (state)

    if (isJust (mhero)) {
      const current_id = ActivatableActivationOptions.A.id (args)
      const current_cost = ActivatableActivationOptions.A.cost (args)

      const mwiki_entry =
        bind (getWikiEntry (getWiki (state)) (current_id))
             (ensure (isSpecialAbility))

      if (isJust (mwiki_entry)) {
        const wiki_entry = fromJust (mwiki_entry)

        const mmissingAP =
          bind (getAvailableAdventurePoints (
                  state,
                  { l10n }
                ))
                (ap => getMissingAP (getIsInCharacterCreation (state))
                                    (current_cost)
                                    (ap))

        if (isNothing (mmissingAP)) {
          dispatch<ActivateSpecialAbilityAction> ({
            type: ActionTypes.ACTIVATE_SPECIALABILITY,
            payload: Pair (args, wiki_entry),
          })
        }
        else {
          dispatch (addAlert ({
            title: translate (l10n) ("notenoughap"),
            message: translateP (l10n) ("notenoughap.text") (List (fromJust (mmissingAP))),
          }))
        }
      }
    }
  }

export interface DeactivateSpecialAbilityAction {
  type: ActionTypes.DEACTIVATE_SPECIALABILITY
  payload: Pair<Record<ActivatableDeactivationOptions>, Record<SpecialAbility>>
}

/**
 * Remove a special ability with the provided activation properties
 * (`args`).
 */
export const removeSpecialAbility =
  (args: Record<ActivatableDeactivationOptions>): ReduxAction =>
  (dispatch, getState) => {
    const state = getState ()

    const mhero = getCurrentHeroPresent (state)

    if (isJust (mhero)) {
      const hero = fromJust (mhero)

      const current_id = ActivatableDeactivationOptions.A.id (args)

      const mwiki_entry =
        bind (getWikiEntry (getWiki (state)) (current_id))
             (ensure (isSpecialAbility))

      const mhero_entry =
        lookup (current_id)
               (HeroModel.A.specialAbilities (hero))

      if (isJust (mwiki_entry) && isJust (mhero_entry)) {
        const wiki_entry = fromJust (mwiki_entry)

        dispatch<DeactivateSpecialAbilityAction> ({
          type: ActionTypes.DEACTIVATE_SPECIALABILITY,
          payload: Pair (args, wiki_entry),
        })
      }
    }
  }

export interface SetSpecialAbilityTierAction {
  type: ActionTypes.SET_SPECIALABILITY_TIER
  payload: Pair<{ id: string; index: number; tier: number }, Record<SpecialAbility>>
}

/**
 * Change the current level of a special ability.
 */
export const setSpecialAbilityLevel =
  (l10n: L10nRecord) =>
  (current_id: string) =>
  (current_index: number) =>
  (next_level: number): ReduxAction =>
  (dispatch, getState) => {
    const state = getState ()

    const mhero = getCurrentHeroPresent (state)

    if (isJust (mhero)) {
      const hero = fromJust (mhero)

      const mwiki_entry =
        bind (getWikiEntry (getWiki (state)) (current_id))
             (ensure (isSpecialAbility))

      const mhero_entry =
        lookup (current_id)
               (HeroModel.A.specialAbilities (hero))

      const mactive_entry =
        pipe (
               bindF (pipe (
                             ActivatableDependent.A_.active,
                             subscriptF (current_index)
                           )),
               fmap (toActiveObjectWithId (current_index) (current_id))
             )
             (mhero_entry)

      if (isJust (mwiki_entry) && isJust (mactive_entry)) {
        const wiki_entry = fromJust (mwiki_entry)
        const active_entry = fromJust (mactive_entry)

        const wiki = getWiki (state)

        const getCostBorder =
          (isEntryToAdd: boolean) =>
            pipe (
              getNameCost (isEntryToAdd)
                          (l10n)
                          (wiki)
                          (hero),
              fmap (pipe (
                convertPerTierCostToFinalCost (false) (l10n),
                ActivatableNameCost.A_.finalCost as
                  (x: Record<ActivatableNameCostSafeCost>) => number
              ))
            )

        const previousCost =
          getCostBorder (false) (active_entry)

        const nextCost =
          getCostBorder (true) (set (ActiveObjectWithIdL.tier)
                                    (Just (next_level))
                                    (active_entry))

        const mdiff_cost = liftM2 (subtract) (nextCost) (previousCost)

        if (isJust (mdiff_cost)) {
          const diff_cost = fromJust (mdiff_cost)

          const mmissingAP =
            bind (getAvailableAdventurePoints (
                    state,
                    { l10n }
                  ))
                  (ap => getMissingAP (getIsInCharacterCreation (state))
                                      (diff_cost)
                                      (ap))


          if (isNothing (mmissingAP)) {
            dispatch<SetSpecialAbilityTierAction> ({
              type: ActionTypes.SET_SPECIALABILITY_TIER,
              payload: Pair (
                {
                  id: current_id,
                  tier: next_level,
                  index: current_index,
                },
                wiki_entry
              ),
            })
          }
          else {
            dispatch (addAlert ({
              title: translate (l10n) ("notenoughap"),
              message: translateP (l10n) ("notenoughap.text") (List (fromJust (mmissingAP))),
            }))
          }
        }
      }
    }
  }

export interface SetSpecialAbilitiesSortOrderAction {
  type: ActionTypes.SET_SPECIALABILITIES_SORT_ORDER
  payload: {
    sortOrder: string;
  }
}

export const setSpecialAbilitiesSortOrder =
  (sortOrder: string): SetSpecialAbilitiesSortOrderAction => ({
    type: ActionTypes.SET_SPECIALABILITIES_SORT_ORDER,
    payload: {
      sortOrder,
    },
  })

export interface SetActiveSpecialAbilitiesFilterTextAction {
  type: ActionTypes.SET_SPECIAL_ABILITIES_FILTER_TEXT
  payload: {
    filterText: string;
  }
}

export const setActiveSpecialAbilitiesFilterText =
  (filterText: string): SetActiveSpecialAbilitiesFilterTextAction => ({
    type: ActionTypes.SET_SPECIAL_ABILITIES_FILTER_TEXT,
    payload: {
      filterText,
    },
  })

export interface SetInactiveSpecialAbilitiesFilterTextAction {
  type: ActionTypes.SET_INACTIVE_SPECIAL_ABILITIES_FILTER_TEXT
  payload: {
    filterText: string;
  }
}

export const setInactiveSpecialAbilitiesFilterText =
  (filterText: string): SetInactiveSpecialAbilitiesFilterTextAction => ({
    type: ActionTypes.SET_INACTIVE_SPECIAL_ABILITIES_FILTER_TEXT,
    payload: {
      filterText,
    },
  })
