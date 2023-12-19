import localLogin from "payload/dist/auth/operations/local/login";
import { CollectionConfig } from "payload/types";

const Friends: CollectionConfig = {
  slug: "friends",
  admin: {
    useAsTitle: "friends",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "friendName",
      type: "text",
      required: true,
    },
    {
      name: "members",
      type: "array",
      required: true,
      fields: [
        {
          name: "member",
          type: "relationship",
          relationTo: "users",
          required: true,
        },
      ],
    },
    {
      name: "chats",
      type: "array",
      fields: [
        {
          name: "chat",
          type: "text",
        },
        {
          name: "chatwho",
          type: "relationship",
          relationTo: 'users',
        }
      ],
    },
  ],
};

export default Friends;