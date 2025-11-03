import { useChatbotContext } from 'mongodb-chatbot-ui';
import { useEffect, useState } from 'react';
import { useConversationContext } from '../../contexts/ConversationContext';

function ConversationCacheInfo() {
  const [firstLoad, setFirstLoad] = useState(true);
  const { conversation } = useChatbotContext();
  const {
    createNewChat,
    setCreateNewChat,
    conversations,
    setConversations,
    setActiveConversation,
    changedConversation,
    setChangedConversation,
  } = useConversationContext();

  // updates the conversation list with the new conversation
  useEffect(() => {
    const fetchInfo = async () => {
      if (firstLoad && conversation.conversationId) {
        // updates the conversation list with the real conversation id
        const updatedConversations = [...conversations];
        updatedConversations[0] = {
          ...updatedConversations[0],
          id: conversation.conversationId,
        };
        setConversations(updatedConversations);
        setActiveConversation(updatedConversations[0]);
        setFirstLoad(false);
      } else if (conversation.conversationId && !conversations.some((c) => c.id === conversation.conversationId)) {
        // Add the new conversation to the list
        const newConversation = {
          id: conversation.conversationId,
          title: `Conversation ${conversations.length + 1}`,
        };
        setConversations([...conversations, newConversation]);
        setActiveConversation(newConversation);
      }
    };
    fetchInfo().catch(console.error);
  }, [conversation]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (createNewChat) {
      conversation.createConversation();
      setCreateNewChat(false);
    }
  }, [createNewChat]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (changedConversation) {
      conversation.switchConversation(changedConversation, {
        from: 'cache',
      });
      setChangedConversation(null);
    }
  }, [changedConversation]); // eslint-disable-line react-hooks/exhaustive-deps

  return <></>;
}

export default ConversationCacheInfo;
