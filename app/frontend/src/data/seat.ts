export type SeatStatus = 'available' | 'selected' | 'occupied';

export interface Seat {
    id: string;
    row: number;
    number: number;
    status: SeatStatus;
}

export const seatRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export const seatsPerRow = 7;

export const generateSeats = (): Seat[][] => {
    return seatRows.map((rowLabel, rowIndex) => {
        return Array.from({ length: seatsPerRow }, (_, seatIndex) => ({
            id: `${rowLabel}${seatIndex + 1}`,
            row: rowIndex + 1,
            number: seatIndex + 1,
            status: 'available' as SeatStatus,
        }));
    });
}

console.log(generateSeats());