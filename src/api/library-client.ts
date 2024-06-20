import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateBookResponseDto } from './dto/create-book-response.dto';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  status: number;
};

export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    console.log('client');
    this.client = axios.create({
      baseURL: 'http://localhost:8082/api',
    });

    const token = localStorage.getItem('token');

    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  public async login(
    data: LoginDto,
  ): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        '/auth/login',
        data,
      );

      // console.log(response.data.token);
      localStorage.setItem('token', response.data.token as string);

      this.client.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.token}`;

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public logout() {
    localStorage.removeItem('token');
    delete this.client.defaults.headers.common['Authorization'];
  }

  public async getBooks(): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.get('/books');

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async createBook(
    book: CreateBookDto,
  ): Promise<ClientResponse<CreateBookResponseDto | null>> {
    try {
      const response: AxiosResponse<CreateBookResponseDto> =
        await this.client.post('/books', book);

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }

  // public async deleteBook(id: number): Promise<ClientResponse<void>> {
  //   try {
  //     const response = await this.client.delete(`/books/delete/${id}`);

  //     return {
  //       success: true,
  //       data: response.data,
  //       status: response.status,
  //     };
  //   } catch (error) {
  //     const axiosError = error as AxiosError<Error>;

  //     return {
  //       success: false,
  //       data: null,
  //       status: axiosError.response?.status || 0,
  //     };
  //   }
  // }

  public async deleteBook(id: number): Promise<ClientResponse<void>> {
    try {
      const response = await this.client.delete(`/books/delete/${id}`);

      return {
        success: true,
        data: undefined,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }
}
