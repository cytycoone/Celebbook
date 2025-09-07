import { NextResponse } from "next/server";
import { MemoryStorage } from "@/utils/storage";

export async function GET() {
    try {
        const celebrities = MemoryStorage.getFeaturedCelebrities();
        console.log('Found featured celebrities:', celebrities);
        return NextResponse.json(celebrities);
    } catch (error) {
        console.error('Error fetching featured celebrities:', error);
        return NextResponse.json(
            { error: 'Failed to fetch celebrities' },
            { status: 500 }
        );
    }
}
