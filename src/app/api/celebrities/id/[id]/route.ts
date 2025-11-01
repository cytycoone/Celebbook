import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/config";
import Celebrity from "@/models/Celebrity";
import mongoose from "mongoose";

export async function GET(req: NextRequest, context: any) {
    const { params } = context;
    try {
        const { id } = await params;

        if (!id) {
            console.error('No ID provided in params');
            return NextResponse.json(
                { error: 'Celebrity ID is required' },
                { status: 400 }
            );
        }

        console.log('Processing request for celebrity ID:', id);

        await connectDb();

        // Check if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid celebrity ID format' },
                { status: 400 }
            );
        }

        const celebrity = await Celebrity.findById(id).lean();
        if (!celebrity) {
            return NextResponse.json(
                { error: 'Celebrity not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(celebrity);
    } catch (error) {
        console.error('Error fetching celebrity:', error);
        return NextResponse.json(
            { error: 'Failed to fetch celebrity' },
            { status: 500 }
        );
    }
}
