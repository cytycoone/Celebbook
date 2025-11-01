import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/config";
import Booking from "@/models/Booking";
import Celebrity from "@/models/Celebrity";
import { sendBookingConfirmation } from "@/lib/emails";

export async function GET(req: NextRequest) {
    try {
        await connectDb();
        
        const searchParams = req.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const status = searchParams.get('status');
        const search = searchParams.get('search');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        // Build query
        const query: any = {};
        
        if (status) {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { customerName: { $regex: search, $options: 'i' } },
                { customerEmail: { $regex: search, $options: 'i' } }
            ];
        }

        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        // Get total count
        const total = await Booking.countDocuments(query);

        // Get bookings with pagination and populate celebrity
        const bookings = await Booking.find(query)
            .populate('celebrityId', 'name imageUrl profession')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        // Format response
        const populatedBookings = bookings.map(booking => ({
            ...booking,
            celebrity: booking.celebrityId ? {
                name: (booking.celebrityId as any).name,
                imageUrl: (booking.celebrityId as any).imageUrl,
                profession: (booking.celebrityId as any).profession
            } : null
        }));

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
        await connectDb();
        
        const body = await req.json();

        // Validate celebrity exists
        const celebrity = await Celebrity.findById(body.celebrityId);
        if (!celebrity) {
            throw new Error('Celebrity not found');
        }

        // Create booking in MongoDB
        const booking = await Booking.create(body);

        // Send confirmation email
        try {
            await sendBookingConfirmation({
                booking: booking.toObject(),
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
            ...booking.toObject(),
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
