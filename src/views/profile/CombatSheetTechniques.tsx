import * as React from 'react';
import { TextBox } from '../../components/TextBox';
import { Attribute, CombatTechnique, UIMessages } from '../../types/view.d';
import { sortObjects } from '../../utils/FilterSortUtils';
import { _translate } from '../../utils/I18n';
import { getICName } from '../../utils/ICUtils';

export interface CombatSheetTechniquesProps {
	attributes: Attribute[];
	combatTechniques: CombatTechnique[];
	locale: UIMessages;
}

export function CombatSheetTechniques(props: CombatSheetTechniquesProps) {
	const { attributes, combatTechniques, locale } = props;
	return (
		<TextBox label={_translate(locale, 'charactersheet.combat.combattechniques.title')} className="combat-techniques">
			<table>
				<thead>
					<tr>
						<th className="name">{_translate(locale, 'charactersheet.combat.combattechniques.headers.name')}</th>
						<th className="primary">{_translate(locale, 'charactersheet.combat.combattechniques.headers.primaryattribute')}</th>
						<th className="ic">{_translate(locale, 'charactersheet.combat.combattechniques.headers.ic')}</th>
						<th className="value">{_translate(locale, 'charactersheet.combat.combattechniques.headers.ctr')}</th>
						<th className="at">{_translate(locale, 'charactersheet.combat.combattechniques.headers.atrc')}</th>
						<th className="pa">{_translate(locale, 'charactersheet.combat.combattechniques.headers.pa')}</th>
					</tr>
				</thead>
				<tbody>
					{
						sortObjects(combatTechniques, locale.id).map(e => (
							<tr key={e.id}>
								<td className="name">{e.name}</td>
								<td className="primary">{e.primary.map(p => attributes.find(a => a.id === p)!.short).join('/')}</td>
								<td className="ic">{getICName(e.ic)}</td>
								<td className="value">{e.value}</td>
								<td className="at">{e.at}</td>
								<td className="pa">{e.pa || '-'}</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</TextBox>
	);
}
