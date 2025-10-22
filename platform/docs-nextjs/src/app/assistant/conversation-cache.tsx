import { useChatbotContext } from 'mongodb-chatbot-ui';
import { useEffect, useState } from 'react';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import { Body } from '@leafygreen-ui/typography';

function ConversationCacheInfo() {
  const [info, setInfo] = useState<{ _id: string; name: string }[]>([]);
  const { conversation } = useChatbotContext();
  const cacheVersion = conversation.getCacheVersion();

  useEffect(() => {
    const fetchInfo = async () => {
      const info = await conversation.getCachedConversationInfo();
      setInfo(info);
    };
    fetchInfo().catch(console.error);
  }, [conversation]);

  return (
    <div>
      <Button
        leftGlyph={<Icon glyph="Plus" />}
        onClick={() => {
          conversation.createConversation();
        }}
      >
        New Conversation
      </Button>
      <Body>Cached Conversations</Body>
      {info.length > 0 ? (
        info.map((i) => {
          const isCurrent = conversation.conversationId === i._id;
          return (
            <Button
              key={i._id}
              variant={isCurrent ? 'primary' : 'default'}
              onClick={() => {
                conversation.switchConversation(i._id, {
                  from: 'cache',
                });
              }}
            >
              {i.name}
            </Button>
          );
        })
      ) : (
        <Body>{cacheVersion === -1 ? 'No cache defined' : 'No conversations in cache'}</Body>
      )}
    </div>
  );
}

export default ConversationCacheInfo;
