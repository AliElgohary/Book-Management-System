import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const existingBook = await this.bookRepository.findOne({
      where: { title: createBookDto.title, author: createBookDto.author },
    });

    if (existingBook) {
      throw new HttpException(
        'Book with the same title and author already exists.',
        HttpStatus.CONFLICT,
      );
    }

    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async findAll(title?: string, year?: number): Promise<Book[]> {
    const queryBuilder = this.bookRepository.createQueryBuilder('book');

    if (title) {
      queryBuilder.andWhere('book.title LIKE :title', { title: `%${title}%` });
    }

    if (year) {
      queryBuilder.andWhere('YEAR(book.publishedDate) = :year', { year });
    }
    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    await this.bookRepository.delete(id);
  }
}
