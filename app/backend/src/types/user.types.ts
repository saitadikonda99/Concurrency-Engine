export interface User {
    id: number
    username: string
    password: string
    role: string
    refresh_token?: string
}

export interface UserResponse {
    id: number
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