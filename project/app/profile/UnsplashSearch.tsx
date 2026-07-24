'use client';

import {useState} from "react";
import {searchUnsplash, importUnsplashPhoto} from "../actions";


export default function UnsplashSearch(){

    const [query,setQuery] = useState("");
    const [results,setResults] = useState<any[]>([]);


    async function search(){

        const photos = await searchUnsplash(query);

        setResults(photos);

    }


    return (

        <div className="bg-white rounded-lg p-4">

            <div className="flex gap-2 mb-4">

                <input
                    className="border rounded p-2 flex-1"
                    placeholder="Search Unsplash..."
                    value={query}
                    onChange={(e)=>setQuery(e.target.value)}
                />

                <button
                    onClick={search}
                    className="bg-theme_blue text-white px-4 rounded"
                >
                    Search
                </button>

            </div>


            <div className="grid grid-cols-3 gap-3">

                {results.map(photo => (

                    <div key={photo.id}>

                        <img
                            src={photo.thumbnail}
                            className="aspect-square object-cover rounded"
                        />


                        <button
                            onClick={() =>
                                importUnsplashPhoto(photo.url)
                            }
                            className="mt-2 bg-theme_blue text-white px-2 py-1 rounded w-full"
                        >
                            Add
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );
}