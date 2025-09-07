import { NextRequest, NextResponse } from "next/server";
import { MemoryStorage } from "@/utils/storage";

// Sample celebrities data for when database is not available
const sampleCelebrities = [
    {
        _id: "1",
        name: "Emma Watson",
        profession: "Actress", 
        imageUrl: "/celebrities/emma-watson.jpg",
        slug: "emma-watson",
        bio: "British actress and activist known for her role as Hermione Granger in the Harry Potter film series."
    },
    {
        _id: "2",
        name: "Gordon Ramsay", 
        profession: "Chef",
        imageUrl: "/celebrities/gordon-ramsay.jpg",
        slug: "gordon-ramsay",
        bio: "British chef, restaurateur, television personality, and writer known for his fiery temper and culinary expertise."
    },
    {
        _id: "3",
        name: "Serena Williams",
        profession: "Athlete", 
        imageUrl: "/celebrities/serena-williams.jpg",
        slug: "serena-williams",
        bio: "American professional tennis player and former world No. 1 with 23 Grand Slam singles titles."
    },
    {
        _id: "4",
        name: "John Legend",
        profession: "Musician",
        imageUrl: "/celebrities/john-legend.jpg",
        slug: "john-legend", 
        bio: "American singer, songwriter, pianist, and actor who has won multiple Grammy Awards."
    }
];

const sampleProfessions = ["Actress", "Chef", "Athlete", "Musician"];

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const search = searchParams.get('search') || '';
        const profession = searchParams.get('profession') || '';

        const result = MemoryStorage.getAllCelebrities(page, limit);
        let { celebrities } = result;
        
        // Apply search filter
        if (search) {
            celebrities = celebrities.filter(celebrity =>
                celebrity.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        
        // Apply profession filter  
        if (profession) {
            celebrities = celebrities.filter(celebrity =>
                celebrity.profession === profession
            );
        }

        console.log('Using memory storage celebrities data');
        
        return NextResponse.json({
            celebrities,
            pagination: {
                total: result.total,
                page: result.page,
                limit,
                totalPages: result.totalPages
            },
            professions: sampleProfessions
        });
    } catch (error) {
        console.error('Error fetching celebrities:', error);
        return NextResponse.json(
            { error: 'Failed to fetch celebrities' },
            { status: 500 }
        );
    }
}
