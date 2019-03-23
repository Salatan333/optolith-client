// tslint:disable-next-line:no-implicit-dependencies
import { ProgressInfo } from 'builder-util-runtime';
import * as React from 'react';
import { translate, UIMessagesObject } from '../../App/Utils/I18n';
import { bytify } from '../../App/Utils/IOUtils';
import { Dialog } from '../../components/DialogNew';
import { ProgressBar } from '../../components/ProgressBar';
import { Maybe } from '../../Utilities/dataUtils';

export interface DownloaderOwnProps {
  locale: UIMessagesObject;
}

export interface DownloaderStateProps {
  progress: Maybe<ProgressInfo>;
}

export interface DownloaderDispatchProps {
}

export type DownloaderProps = DownloaderStateProps & DownloaderDispatchProps & DownloaderOwnProps;

export function Downloader (props: DownloaderProps) {
  const { locale, progress: maybeProgress } = props;

  const id = locale.get ('id');

  if (Maybe.isJust (maybeProgress)) {
    const progress = Maybe.fromJust (maybeProgress);

    return (
      <Dialog
        id="downloader"
        title={translate (locale, 'downloadupdate')}
        isOpened={typeof progress === 'object'}
        close={() => undefined}
        noCloseButton
        >
        {typeof progress === 'object' && <div>
          <div className="update-info">
            <div className="update-size">
              {bytify (progress.transferred, id)} / {bytify (progress.total, id)}
            </div>
            <div className="update-speed">
              {bytify (progress.bytesPerSecond, id)}/s
            </div>
          </div>
          <ProgressBar
            current={progress.percent}
            max={100}
            horizontal
            fullWidth
            />
        </div>}
      </Dialog>
    );
  }

  return null;
}
