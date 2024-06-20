export class GetLoansPageResponseDto {
  loans!: Array<{
    id: number;
    loanDate: string;
    dueDate: string;
    user: {
      id: number;
      name: string;
      lastName: string;
      email: string;
    };
    book: {
      id: number;
      isbn: string;
      title: string;
      author: string;
      publisher: string;
      publicationYear: number;
      available: boolean;
    };
  }>;
  currentPage!: number;
  totalItems!: number;
  totalPages!: number;
  hasMore!: boolean;
}
