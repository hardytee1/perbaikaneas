import { CollectionConfig } from "payload/types";

const Group_name: CollectionConfig = {
  slug: "group",
  admin: {
    useAsTitle: "Group",
  },
  fields: [
    {
      name: 'groupName',
      type: 'text',
      required: true,
    },
  ],
};

export default Group_name;
