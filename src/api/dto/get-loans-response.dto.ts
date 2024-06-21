import { GetBookDto } from "./get-book.dto";
import { GetUserDto } from "./get-user.dto";

export interface GetLoanResponseDto {
  id: number;
  loanDate: number;
  dueDate: number;
  user: GetUserDto;
  book: GetBookDto;
}