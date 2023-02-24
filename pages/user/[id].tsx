import type { User } from '@prisma/client';
import { useRouter } from 'next/router';
import useSwr from 'swr';
import fetcher from '@lib/fetcher';

export default function UserPage() {
    const { query } = useRouter();
    const { data, error, isLoading } = useSwr<User>(
        query.id ? `/api/user/${query.id}` : null,
        fetcher
    );

    if (error) return <div>Failed to load user</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!data) return null;

    return <div>{data.name}</div>;
}
