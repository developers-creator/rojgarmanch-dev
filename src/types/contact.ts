export type ContactPayload = {
  title: string;
  content: string;
};

export type ContactData = {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    payload: ContactPayload;
  };
};
