import { NextRequest, NextResponse } from "next/server";
import { MemoryStorage } from "@/utils/storage";
import { sendBookingConfirmation } from "@/lib/emails";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const status = searchParams.get('status');
        const search = searchParams.get('search');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        let bookings = MemoryStorage.getAllBookings();

        // Apply filters
        if (status) {
            bookings = bookings.filter(b => b.status === status);
        }

        if (search) {
            bookings = bookings.filter(b => 
                b.customerName.toLowerCase().includes(search.toLowerCase()) ||
                b.customerEmail.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (startDate || endDate) {
            bookings = bookings.filter(b => {
                const bookingDate = new Date(b.date);
                if (startDate && bookingDate < new Date(startDate)) return false;
                if (endDate && bookingDate > new Date(endDate)) return false;
                return true;
            });
        }

        // Sort by creation date (newest first)
        bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Apply pagination
        const total = bookings.length;
        const startIndex = (page - 1) * limit;
        const paginatedBookings = bookings.slice(startIndex, startIndex + limit);

        // Populate celebrity data
        const populatedBookings = paginatedBookings.map(booking => {
            const celebrity = MemoryStorage.getCelebrityById(booking.celebrityId);
            return {
                ...booking,
                celebrity: celebrity ? {
                    name: celebrity.name,
                    imageUrl: celebrity.imageUrl,
                    profession: celebrity.profession
                } : null
            };
        });

        return NextResponse.json({
            bookings: populatedBookings,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error: any) {
        console.error("Bookings list error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch bookings" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Create booking using memory storage
        const booking = MemoryStorage.createBooking(body);

        // Get celebrity details for email
        const celebrity = MemoryStorage.getCelebrityById(booking.celebrityId);
        if (!celebrity) {
            throw new Error('Celebrity not found');
        }

        // Send confirmation email
        try {
            await sendBookingConfirmation({
                booking,
                celebrity: {
                    name: celebrity.name,
                    profession: celebrity.profession
                }
            });
        } catch (error) {
            console.error('Failed to send confirmation email:', error);
            // Don't throw error here, we still want to return the booking
        }

        // Return response with populated celebrity data
        const populatedBooking = {
            ...booking,
            celebrity: {
                name: celebrity.name,
                imageUrl: celebrity.imageUrl,
                profession: celebrity.profession
            }
        };

        return NextResponse.json({
            message: 'Booking created successfully',
            booking: populatedBooking
        }, { status: 201 });
    } catch (error: any) {
        console.error("Booking creation error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to create booking" },
            { status: 400 }
        );
    }
}
