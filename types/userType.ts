import { type LinkDataType } from "./linkType";

export interface UserType {
  id: number;
  name: string;
  email: string;
  links: [LinkDataType];
  createdAt: Date;
}
