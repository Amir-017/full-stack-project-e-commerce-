import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: string;
}

export interface UsersResponse {
  data: User[];
}

export interface UserInfo {
  infoAboutUser: User;
}

export interface LoginResponse {
  accesstoken: string;
}

export interface UpdateProfileRequest {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userName = signal<string | null>(null);
  isAuthenticated = new BehaviorSubject<boolean>(false);
  role = signal<string | null>(null);

  constructor(private http: HttpClient) {
    const savedName = localStorage.getItem('userName');
    const savedToken = localStorage.getItem('accessToken');
    const savedRole = localStorage.getItem('role');

    this.userName.set(savedName);
    this.role.set(savedRole);
    this.isAuthenticated.next(!!savedToken);
  }

  postUsers(postedUser: {}) {
    return this.http.post('http://localhost:3000/users', postedUser);
  }

  loginUser(loginData: LoginRequest) {
    return this.http.post<LoginResponse>('http://localhost:3000/users/login', loginData);
  }

  saveAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
    this.isAuthenticated.next(true);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  saveUserName(name: string) {
    localStorage.setItem('userName', name);
    this.userName.set(name);
  }

  saveRole(role: string) {
    localStorage.setItem('role', role);
    this.role.set(role);
  }
  // getUserName() {
  //   return this.userName.value;
  // }

  removeAccessToken() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    this.userName.set(null);
    this.role.set(null);
    this.isAuthenticated.next(false);
  }

  infoAboutUser(token: string) {
    return this.http.get<UserInfo>('http://localhost:3000/users/me', {
      headers: {
        authorization: token,
      },
    });
  }

  updateProfile(token: string, profileData: UpdateProfileRequest) {
    return this.http.patch('http://localhost:3000/users/editeProfile', profileData, {
      headers: {
        authorization: token,
      },
    });
  }

  changePassword(token: string, changepasswordUser: {}) {
    return this.http.patch('http://localhost:3000/users/changePasaword', changepasswordUser, {
      headers: {
        authorization: token,
      },
    });
  }

  getAllUsers(token: string) {
    return this.http.get<UsersResponse>('http://localhost:3000/users', {
      headers: {
        authorization: token,
      },
    });
  }

  deleteUser(token: string, userId: string) {
    return this.http.delete(`http://localhost:3000/users/${userId}`, {
      headers: {
        authorization: token,
      },
    });
  }

  changeUserRole(token: string, userId: string, role: string) {
    return this.http.patch(
      `http://localhost:3000/users/${userId}/role`,
      { role },
      {
        headers: {
          authorization: token,
        },
      },
    );
  }
}
