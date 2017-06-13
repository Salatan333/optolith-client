import * as React from 'react';
import { Scroll } from '../../components/Scroll';
import { ELStore } from '../../stores/ELStore';
import { AttributeInstance, ExperienceLevel } from '../../types/data.d';
import { translate } from '../../utils/I18n';
import { AttributeCalc } from './AttributeCalc';
import { AttributeList } from './AttributeList';
import { AttributesPermanentList } from './AttributesPermanentList';

export interface AttributesProps {
	attributes: AttributeInstance[];
	el: ExperienceLevel;
	phase: number;
}

export function Attributes(props: AttributesProps) {
	const { attributes, phase } = props;

	const sum = attributes.reduce((a, b) => a + b.value, 0);

	return (
		<section id="attribute">
			<div className="page">
				<Scroll>
					<div className="counter">{translate('attributes.view.attributetotal')}: {sum}{phase === 2 && ` / ${ELStore.getStart().maxTotalAttributeValues}`}</div>
					<AttributeList
						attributes={attributes}
						phase={phase}
						/>
					<div className="secondary">
						<AttributeCalc phase={phase} />
						<AttributesPermanentList phase={phase} />
					</div>
				</Scroll>
			</div>
		</section>
	);
}