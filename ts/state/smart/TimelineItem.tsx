import React from 'react';
import { connect } from 'react-redux';

import { mapDispatchToProps } from '../actions';
import { StateType } from '../reducer';

import { TimelineItem } from '../../components/conversation/TimelineItem';
import { getIntl } from '../selectors/user';
import {
  getMessageSelector,
  getSelectedMessage,
} from '../selectors/conversations';

import { SmartContactName } from './ContactName';
import { AttachmentType } from '../../types/Attachment';

type ExternalProps = {
  id: string;
  conversationId: string;
  forwardMessage: (
    messageId: string,
    attachments?: Array<AttachmentType>
  ) => void;
};

// Workaround: A react component's required properties are filtering up through connect()
//   https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31363
/* eslint-disable @typescript-eslint/no-explicit-any */
const FilteredSmartContactName = SmartContactName as any;
/* eslint-enable @typescript-eslint/no-explicit-any */

function renderContact(conversationId: string): JSX.Element {
  return <FilteredSmartContactName conversationId={conversationId} />;
}

const mapStateToProps = (state: StateType, props: ExternalProps) => {
  const { id, conversationId, forwardMessage } = props;

  const messageSelector = getMessageSelector(state);
  const item = messageSelector(id);

  const selectedMessage = getSelectedMessage(state);
  const isSelected = Boolean(selectedMessage && id === selectedMessage.id);

  return {
    item,
    id,
    conversationId,
    isSelected,
    renderContact,
    i18n: getIntl(state),
    forwardMessage,
  };
};

const smart = connect(mapStateToProps, mapDispatchToProps);

export const SmartTimelineItem = smart(TimelineItem);
