/** Shared content shapes — keep field names stable for a future CMS. */

export type Post = {
  id: number | string;
  slug: string;
  title: string;
  excerpt?: string;
  href: string;
  imageUrl?: string;
  imageAlt?: string;
  category?: string;
  author?: string;
  authorAvatar?: string;
  dateLabel?: string;
  dateIso?: string;
};

export type TeamMember = {
  role: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
};

export type SiteInfo = {
  name: string;
  domain: string;
  registrationNo: string;
  address: string;
  phone: string;
  email: string;
  social: { label: string; href: string; icon: string }[];
  team: TeamMember[];
  quickLinks: { href: string; label: string }[];
};

export type HighlightStory = Post & {
  authorAvatar?: string;
};

export type IgStorySlide = {
  imageUrl: string;
  title?: string;
  href?: string;
  durationMs?: number;
};

export type IgStory = {
  id: string;
  label: string;
  avatarUrl: string;
  slides: IgStorySlide[];
};

export type YtVideo = {
  id: string;
  youtubeId: string;
  title: string;
  duration?: string;
  viewsLabel?: string;
};

export type YtShort = {
  id: string;
  youtubeId: string;
  title: string;
  viewsLabel?: string;
};

export type YoutubeBlock = {
  videos: YtVideo[];
  /** First video is treated as the highlight if featuredId omitted. */
  featuredId?: string;
  shorts: YtShort[];
  channelUrl?: string;
};

export type HomePageData = {
  teasers: Post[];
  recent: Post[];
  highlight: HighlightStory;
  highlightMore: HighlightStory[];
  feature: Post;
  featurePair: Post[];
  ranked: Post[];
  stories: Post[];
  igStories: IgStory[];
  youtube: YoutubeBlock;
  flashNews: Post[];
  trending: Post[];
};
