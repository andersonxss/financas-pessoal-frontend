export interface Member { id: string; name: string; email: string; role: string; active: boolean }
export interface IMembers {
    items: Array<Member>;
    limit: number;
    page: number;
    pages: number;
    total: number;
}

