export interface User {
    id: string
    username: string
    password: string
    role: string
    refresh_token?: string
}

export interface UserResponse {
    id: string
    username: string
    role: string
}

export interface LoginRequest {
    username: string
    password: string
}

export interface LoginResponse {
    token: string
    refreshToken: string
    user: UserResponse
}

export * from './user.types'