import { NextRequest, NextResponse } from "next/server";
import { MemoryStorage } from "@/utils/storage";

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

        const celebrity = MemoryStorage.getCelebrityById(id);
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
