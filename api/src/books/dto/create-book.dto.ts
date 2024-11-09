import {
  IsString,
  IsOptional,
  IsDate,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  author: string;

  @IsDate()
  @IsNotEmpty()
  publishedDate: string;

  @IsOptional()
  @IsString()
  @Length(1, 1000)
  description?: string; // Optional field, max length 1000
}
