export interface Notice {
  _id: string;
  title: string;
  description: string;
  viewCount: number;
  instituteId: string;
  groupIds: string[];
  createdAt: string;
  updatedAt: string;
}
