export type TimeTable = {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export type Announcement = {
    id: number;
    blogtitle: string;
    message: string;
    read: boolean;
    createdAt: Date;
}