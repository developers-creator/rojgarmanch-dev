export type SocialHandle = {
  choose_media: string;
  insert_url: string;
};

export type Settings = {
  site_title: string;
  dark_logo: string;
  white_logo: string;
  location: string;
  email: string;
  phone: string;
  mobile: string;
  chief_administrator: string;
  advisory_editor: string;
  editor: string;
  assistant_editor: string;
  columnists: string;
  correspondents: string;
  rojgar_insert_map_url: string;
  insert_iframe_url: string;
  darta_no: string;
  social_handles: SocialHandle[];
};

export type SettingsData = {
  success: boolean;
  message: string;
  data: Settings;
};
