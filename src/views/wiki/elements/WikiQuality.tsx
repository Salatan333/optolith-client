import * as React from 'react';
import { Markdown } from '../../../components/Markdown';
import { _translate, UIMessages } from '../../../utils/I18n';

export interface WikiQualityProps {
	currentObject: {
		quality: string;
	};
	locale: UIMessages;
}

export function WikiQuality(props: WikiQualityProps) {
  const {
    currentObject: {
      quality
    },
    locale
  } = props;

  return (
    <Markdown source={`**${_translate(locale, 'info.quality')}:** ${quality}`} />
  );
}