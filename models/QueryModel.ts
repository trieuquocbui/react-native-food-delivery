export default interface QueryModel {
  page: number;
  limit: number;
  sortField: string;
  sortOrder: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
}
