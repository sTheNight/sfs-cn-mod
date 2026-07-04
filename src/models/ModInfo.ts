import type { ModCategory } from "./Category";

export interface ModInfo {
  name: string;
  type: string;
  size: string;
  date: string;
  desc: string;
  link: string;
  tags: string[];
  category: ModCategory;
  images?: string[];
  version: string;
  author: string;
  heat?: string;
  compat: string;
}
