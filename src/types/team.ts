export interface TeamMember {
  id: number;
  title: string;
  content: string;
  image: string | null;
  positions: string[];
}

export interface TeamPagePayload {
  content: string;
  team: TeamMember[];
}

export interface TeamPage {
  id: number;
  post_type: "page";
  slug: string;
  title: string;
  template: string;
  payload: TeamPagePayload;
}

export interface TeamPageResponse {
  success: boolean;
  message: string;
  data: TeamPage;
}
