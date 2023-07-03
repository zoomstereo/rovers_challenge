"use client";
import useSWRInfinite from "swr/infinite";
import { useEffect } from "react";
import Photo from "../_types/Photo";
import SearchParams from "../_types/SearchParams";
import { searchApiString } from "../_utils/paramBuilder";
import PhotoCard from "./PhotoCard";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function PhotoFeed(params: SearchParams) {
    const { data, size, setSize, error, isLoading } = useSWRInfinite(
        (pageIndex: any, previousPageData: any) =>
            searchApiString({ ...params, page: pageIndex }),
        fetcher,
        {
            initialSize: 1,
            revalidateFirstPage: false,
        }
    );

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight ||
            isLoading
        ) {
            return;
        }

        setSize(size + 1);
    };

    // TODO: Show error if api_key env is not setted
    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;
    if (data[0].photos.length === 0) return <div>Not found</div>; // TODO style it

    return (
        <>
            <div
                className="w-full lg:columns-3 sm:columns-2 gap-12 px-10 pt-5"
                style={{ backgroundColor: "#e1f3f8" }}
            >
                {data.map((d) =>
                    d.photos.map((photo: Photo) => (
                        <PhotoCard key={photo.id} {...photo} />
                    ))
                )}
            </div>
            {/* <button onClick={() => setSize(size + 1)}>Load more</button> */}
        </>
    );
}
