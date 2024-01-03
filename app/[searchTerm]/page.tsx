import getWikiResults from "@/lib/getWikiResults"
import { Metadata } from "next";
import SearchItem from "./components/SearchItem";
type searchResultProps = {
    params: {
        searchTerm: string
    }
}

export async function generateMetadata({ params: { searchTerm } }: searchResultProps): Promise<Metadata> {
    const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
    const data = await wikiData;
    const displayTerm = searchTerm.replace('%20', ' ');
    if (!data?.query?.pages) {
        return {
            title: `${displayTerm} - not found`,
            description: `No results found for ${displayTerm}`,
        }
    }
    return {
        title: `${displayTerm}!`,
        description: `Search results for ${displayTerm}`,
    }
}

export default async function SearchResults({ params: {
    searchTerm
} }: searchResultProps) {
    const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
    const data = await wikiData;
    const results: Result[] | undefined = data?.query?.pages;
    const content = (
        <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
            {results
                ? Object.values(results).map(result => {
                    return <SearchItem key={result.pageid} result={result} />
                })
                : <h2 className="p-2 text-xl">{`${searchTerm} Not Found`}</h2>
            }
        </main>
    )
    return content
}
