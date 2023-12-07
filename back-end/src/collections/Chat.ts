import { CollectionConfig } from "payload/types";

const Chat: CollectionConfig = {
  slug: "chat",
  admin: {
    useAsTitle: "Chat",
  },
  fields: [
    {
      name: 'chats',
      type: 'text',
      required: true,
    },
    {
      name: 'sender',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'group',
      type: 'relationship',
      relationTo: 'group',
      required: true,
    },
  ],
};

export default Chat;
