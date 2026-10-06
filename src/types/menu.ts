export type MenuItem = {
  id: number;
  title: string;
  slug: string;
  description: string;
  url: string;
  target: string;
  classes: string[];
  order: number;
  parent: number;
  children: MenuItem[];
};

export type Menu = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export type MenuData = {
  success: boolean;
  message: string;
  data: {
    menu: Menu;
    items: MenuItem[];
  };
};
