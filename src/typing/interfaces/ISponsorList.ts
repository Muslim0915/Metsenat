export interface ISponsorList {
    id: number;
    full_name: string;
    phone: string;
    sum: number;
    payment_type: PaymentType[];
    firm: string;
    spent: number;
    created_at: string;
    get_status_display: string;
    is_legal?: boolean;
}

interface PaymentType {
    id: number;
    title: string;
}