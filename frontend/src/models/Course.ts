export default interface Course {
    id: string;
    name: string;
    credits: number;
    slots: number;
    description: string;
    lecturer: string;
    day: string;
    start: number;
    duration: number;
}