import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateBookResponseDto } from './dto/create-book-response.dto';
import { GetLoanResponseDto } from './dto/get-loans-response.dto';
import { CreateLoanDto } from './dto/create-loan.dto';
import { CreateLoanResponseDto } from './dto/create-loan-response.dto';

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
    const userId = localStorage.getItem('userId');
    console.log(userId);

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
      localStorage.setItem('userId', response.data.userId as string);
      console.log(response.data.userId);

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

  public async getLoansByUserId(): Promise<
    ClientResponse<GetLoanResponseDto[]>
  > {
    try {
      const userId = localStorage.getItem('userId');
      const response: AxiosResponse<GetLoanResponseDto[]> =
        await this.client.get(`/loans/user/${userId}`); // ${userId}
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: [],
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async createLoan(
    loan: CreateLoanDto,
  ): Promise<ClientResponse<CreateLoanResponseDto | null>> {
    try {
      const response: AxiosResponse<CreateLoanResponseDto> =
        await this.client.post('/loans', loan);

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

  public async deleteLoan(id: number): Promise<ClientResponse<void>> {
    try {
      const response = await this.client.delete(`/loans/delete/${id}`);

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
