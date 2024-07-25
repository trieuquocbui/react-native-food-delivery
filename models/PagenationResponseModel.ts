export default interface PagenationResponseModel<T> {
  content: T;
  page: number;
  totalPages: number;
  isLastPage: boolean;
}
