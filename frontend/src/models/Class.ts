export default interface Class {
    class_id: string;
    cid?: string;
    cname: string;
    credit: number;
    day: string;
    room: string;
    start_period: number;
    end_period: number;
    pname: string;
    semester: string;
    slot?: number;
    fee?: number;
}