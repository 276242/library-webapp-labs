import { GetBookDto } from "./get-book.dto";
import { GetUserDto } from "./get-user.dto";

export class CreateLoanResponseDto {
  id!: number;
  loanDate!: string;
  dueDate!: string;
  user!: GetUserDto;
  book!: GetBookDto;
}
