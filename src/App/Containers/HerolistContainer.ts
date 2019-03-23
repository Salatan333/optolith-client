import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import * as HerolistActions from '../App/Actions/HerolistActions';
import * as IOActions from '../App/Actions/IOActions';
import * as LocationActions from '../App/Actions/LocationActions';
import * as SubwindowsActions from '../App/Actions/SubwindowsActions';
import { InputTextEvent } from '../App/Models/Hero/heroTypeHelpers';
import { AppState } from '../reducers/appReducer';
import { getAdventurePointsObject } from '../Selectors/adventurePointsSelectors';
import { getSortedBooks } from '../Selectors/bookSelectors';
import { getSortedHerolist, getUnsavedHeroesById } from '../Selectors/herolistSelectors';
import { getCurrentHeroPresent, getHerolistFilterText, getIsCharacterCreatorOpen, getUsers, getWiki, getWikiExperienceLevels } from '../Selectors/stateSelectors';
import { getHerolistSortOrder, getHerolistVisibilityFilter } from '../Selectors/uisettingsSelectors';
import { Just, Maybe, OrderedSet } from '../Utilities/dataUtils';
import { Herolist, HerolistDispatchProps, HerolistOwnProps, HerolistStateProps } from '../Views/herolist/Herolist';

const mapStateToProps = (state: AppState, props: HerolistOwnProps) => ({
  currentHero: getCurrentHeroPresent (state),
  currentHeroAdventurePoints: getAdventurePointsObject (state, props),
  experienceLevels: getWikiExperienceLevels (state),
  filterText: getHerolistFilterText (state),
  list: getSortedHerolist (state, props),
  unsavedHeroesById: getUnsavedHeroesById (state),
  users: getUsers (state),
  sortOrder: getHerolistSortOrder (state),
  visibilityFilter: getHerolistVisibilityFilter (state),
  isCharacterCreatorOpen: getIsCharacterCreatorOpen (state),
  sortedBooks: getSortedBooks (state, props),
  wiki: getWiki (state),
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  { locale }: HerolistOwnProps
) => ({
  loadHero (id: string) {
    dispatch (HerolistActions.loadHero (id));
  },
  showHero () {
    dispatch (LocationActions.setTab ('profile'));
  },
  saveHero (id: string) {
    (dispatch as Dispatch<Action, AppState>) (HerolistActions.saveHero (locale) (Just (id)));
  },
  saveHeroAsJSON (id: string) {
    (dispatch as Dispatch<Action, AppState>) (HerolistActions.exportHeroValidate (locale) (id));
  },
  deleteHero (id: string) {
    (dispatch as Dispatch<Action, AppState>) (HerolistActions.deleteHeroValidate (locale) (id));
  },
  duplicateHero (id: string) {
    dispatch (HerolistActions.duplicateHero (id));
  },
  createHero (
    name: string,
    sex: 'm' | 'f',
    el: string,
    enableAllRuleBooks: boolean,
    enabledRuleBooks: OrderedSet<string>
  ) {
    (dispatch as Dispatch<Action, AppState>) (
      HerolistActions.createHero (name, sex, el, enableAllRuleBooks, enabledRuleBooks)
    );
  },
  importHero () {
    (dispatch as Dispatch<Action, AppState>) (IOActions.requestHeroImport (locale));
  },
  setSortOrder (id: string) {
    dispatch (HerolistActions.setHerolistSortOrder (id));
  },
  setFilterText (event: InputTextEvent) {
    dispatch (HerolistActions.setHerolistFilterText (event.target.value));
  },
  setVisibilityFilter (id: Maybe<string>) {
    if (Maybe.isJust (id)) {
      dispatch (HerolistActions.setHerolistVisibilityFilter (Maybe.fromJust (id)));
    }
  },
  openCharacterCreator () {
    dispatch (SubwindowsActions.openCharacterCreator ());
  },
  closeCharacterCreator () {
    dispatch (SubwindowsActions.closeCharacterCreator ());
  },
});

const connectHerolist =
  connect<HerolistStateProps, HerolistDispatchProps, HerolistOwnProps, AppState> (
    mapStateToProps,
    mapDispatchToProps
  );

export const HerolistContainer = connectHerolist (Herolist);
