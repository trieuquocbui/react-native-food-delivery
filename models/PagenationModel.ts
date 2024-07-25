export default class PagenationModel {
  currentPageNumber!: number;
  totalPageNumber?: number;
  offset!: number;
  sortField!: string;
  sortOrder!: string;
  searchQuery?: string;
  isLastPage?: boolean;
  category?: string;
}
