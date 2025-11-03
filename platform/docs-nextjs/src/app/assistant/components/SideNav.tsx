'use client';

import Icon from '@leafygreen-ui/icon';
import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { SparkleIcon } from './SparkleIcon';
import { theme } from '@/styles/theme';
import { useConversationContext, type Conversation } from '../contexts/ConversationContext';

const StyledDivider = () => (
  <hr
    className={css`
      margin: 6px 0;
      border: none;
      border-top: 1px solid ${palette.gray.light2};
    `}
  />
);

const styledTitle = css`
  font-weight: 600 !important;
  font-size: 13px;
  line-height: 20px;
  padding: 6.5px 16px !important;
  &:hover {
    background-color: unset !important;
  }
`;

const styledNewChat = css`
  .dark-theme & {
    color: ${palette.green.light2} !important;
  }
  color: ${palette.green.dark2} !important;
  font-weight: 600 !important;
  font-size: 12px !important;
  letter-spacing: 0.4px !important;
  text-transform: uppercase !important;
`;

const styledRecentChats = css`
  > div {
    color: ${palette.gray.dark1};

    .dark-theme & {
      color: ${palette.gray.light1};
    }
    padding: 14px;
  }

  svg {
    color: ${palette.gray.dark1};

    .dark-theme & {
      color: ${palette.gray.light1};
    }
  }
`;

const conversationWrapperStyle = css`
  position: relative;
`;

const sideNavContainerStyle = css`
  position: relative;
  z-index: 2;
  height: inherit;

  @media ${theme.screenSize.upToSmall} {
    position: absolute;
    background: white;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  }
`;

export default function AssistantSideNav() {
  const { conversations, activeConversation, setCreateNewChat, setActiveConversation, setChangedConversation } =
    useConversationContext();

  const changeConvo = (convo: Conversation) => {
    if (activeConversation?.id !== convo.id) {
      setActiveConversation(convo);
      setChangedConversation(convo.id || null);
    }
  };

  return (
    <SideNav
      widthOverride={256}
      baseFontSize={14}
      aria-label="Full page MongoDB Assistant"
      className={sideNavContainerStyle}
    >
      <SideNavItem glyph={<SparkleIcon />} className={styledTitle} as={undefined}>
        MongoDB Assistant
      </SideNavItem>
      <StyledDivider />
      <SideNavItem glyph={<Icon glyph="Plus" />} className={styledNewChat} onClick={() => setCreateNewChat(true)}>
        New Chat
      </SideNavItem>
      <StyledDivider />
      <SideNavGroup glyph={<Icon glyph="ClockWithArrow" />} header={'Recent Chats'} className={styledRecentChats}>
        {conversations.map((conversation) => (
          <div key={conversation.id} className={conversationWrapperStyle}>
            <SideNavItem active={activeConversation?.id === conversation.id} onClick={() => changeConvo(conversation)}>
              {conversation.title}
            </SideNavItem>
          </div>
        ))}
      </SideNavGroup>
    </SideNav>
  );
}
