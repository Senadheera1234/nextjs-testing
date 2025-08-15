export interface Member extends Demo.Member {
    id: number;
}

export const MemberService = {
    getMembers() {
        return fetch('/demo/data/members.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Member[]);
    }
};
