export default class AuthorizationMemoryService {
    private readonly _groups: { [key: string]: string[] } = {
        M1: ['admin', 'm1'],
        M2: ['admin', 'm2'],
        PRIVATE: ['admin', 'm1', 'm2']
    }
    public async authorize(user: string, group: string, actions: string): Promise<boolean> {
        return this._groups[group].includes(user);
    }
}