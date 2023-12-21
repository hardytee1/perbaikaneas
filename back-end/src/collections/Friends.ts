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
      name: "Sender",
      type: "text",
      required: true,
    },
    {
        name: "Reciever",
        type: "text",
        required: true,
      },
      {
        name: 'content',
        required: false,
        type: 'text',
      }
  ],
};

export default Friends;