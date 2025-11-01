import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/config";
import Celebrity from "@/models/Celebrity";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const search = searchParams.get('search') || '';
        const profession = searchParams.get('profession') || '';

        await connectDb();

        // Build query
        const query: any = {};
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (profession) {
            query.profession = profession;
        }

        // Get total count
        const total = await Celebrity.countDocuments(query);

        // Get celebrities with pagination
        const celebrities = await Celebrity.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ featured: -1, name: 1 })
            .lean();

        // Get all unique professions
        const professions = await Celebrity.distinct('profession');

        console.log('Retrieved celebrities from MongoDB');
        
        return NextResponse.json({
            celebrities,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            },
            professions
        });
    } catch (error) {
        console.error('Error fetching celebrities:', error);
        return NextResponse.json(
            { error: 'Failed to fetch celebrities' },
            { status: 500 }
        );
    }
}
