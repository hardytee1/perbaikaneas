import { CollectionConfig } from "payload/types";

const Groups: CollectionConfig = {
  slug: "groups",
  admin: {
    useAsTitle: "groups",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "groupName",
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

export default Groups;