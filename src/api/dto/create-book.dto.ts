export class CreateBookDto {
  isbn!: string;
  title!: string;
  author!: string;
  publisher!: string;
  publicationYear!: number;
  availableCopies!: number;
}
