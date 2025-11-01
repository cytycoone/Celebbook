import { NextResponse } from "next/server";
import { connectDb } from "@/config";
import Celebrity from "@/models/Celebrity";

export async function GET() {
    try {
        await connectDb();
        
        const celebrities = await Celebrity.find({ featured: true })
            .sort({ name: 1 })
            .lean();
        
        console.log('Found featured celebrities from MongoDB:', celebrities);
        return NextResponse.json(celebrities);
    } catch (error) {
        console.error('Error fetching featured celebrities:', error);
        return NextResponse.json(
            { error: 'Failed to fetch celebrities' },
            { status: 500 }
        );
    }
}
