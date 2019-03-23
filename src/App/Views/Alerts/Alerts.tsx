import * as React from 'react';
import { Dispatch } from 'redux';
import { Alert as AlertOptions } from '../../App/Models/Hero/heroTypeHelpers';
import { Alert } from '../../components/Alert';
import { UIMessagesObject } from '../../types/ui';
import { Maybe } from '../../Utilities/dataUtils';

export interface AlertsOwnProps {
  locale: UIMessagesObject;
}

export interface AlertsStateProps {
  options: Maybe<AlertOptions>;
}

export interface AlertsDispatchProps {
  close (): void;
  dispatch: Dispatch;
}

export type AlertsProps = AlertsStateProps & AlertsDispatchProps & AlertsOwnProps;

export class Alerts extends React.Component<AlertsProps> {
  render () {
    return (
      <Alert {...this.props} />
    );
  }
}
