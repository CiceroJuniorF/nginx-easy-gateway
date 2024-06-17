export interface LoginService {
    login(req: any): Promise<{ user: string, groups: string[], routes: string[] }>;
}