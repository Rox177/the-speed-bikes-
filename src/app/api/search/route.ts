import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/client"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""

  if (!query.trim()) {
    return NextResponse.json({ products: [] })
  }

  try {
    const supabase = createClient()
    // Perform standard PostgreSQL full text search using the search_vector index
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .textSearch("search_vector", query, {
        config: "english",
        type: "websearch",
      })

    if (error) {
      console.warn("Database full text search error, trying ilike fallback:", error)
      // Fallback: simple text match in case search vector isn't fully configured
      const { data: fallbackData } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .or(`name.ilike.%${query}%,tagline.ilike.%${query}%,description.ilike.%${query}%`)
      
      return NextResponse.json({ products: fallbackData || [] })
    }

    return NextResponse.json({ products: data || [] })
  } catch (err) {
    console.error("Search API failed:", err)
    return NextResponse.json({ products: [] })
  }
}
