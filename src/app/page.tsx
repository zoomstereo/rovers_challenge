"use client";
import { useState } from "react";
import FilterNav from "./_components/FilterNav";
import PhotoFeed from "./_components/PhotoFeed";
import SearchParams, { RoberName } from "./_types/SearchParams";
import { getTodayTime } from "./_utils/time";
import useFavorite from "./_hooks/useFavorite";

export default function Home() {
    const [favorites, addFavorite, removeFavorite] = useFavorite();
    const [selectedNav, setSelectedNav] = useState("curiosity");
    const [searchParams, setSearchParams] = useState({
        rober: "curiosity",
        earthDate: getTodayTime(),
    } as SearchParams);

    const getClassName = (navName: string) => {
        return selectedNav === navName ? "nav-item-selected" : "nav-item";
    };

    const handleNav = (navName: RoberName | "favorites") => {
        if (navName !== "favorites") {
            setSearchParams({
                rober: navName as RoberName,
                earthDate: getTodayTime(),
            });
        }

        setSelectedNav(navName);
    };

    const handleFavorite = (favorite: SearchParams) => {
        if (!favorite) favorite = searchParams;

        addFavorite(favorite);
    };

    const loadFavorite = (favorite: SearchParams) => {
        setSearchParams(favorite);
        setSelectedNav(favorite.rober!);
    };

    return (
        <main>
            <div>
                <div className="flex flex-wrap justify-between px-10 py-10 nav">
                    <div
                        className={getClassName("curiosity")}
                        onClick={() => handleNav("curiosity")}
                    >
                        Curiosity
                    </div>
                    <div
                        className={getClassName("opportunity")}
                        onClick={() => handleNav("opportunity")}
                    >
                        Opportunity
                    </div>
                    <div
                        className={getClassName("spirit")}
                        onClick={() => handleNav("spirit")}
                    >
                        Spirit
                    </div>
                    <div
                        className={`${getClassName("favorites")} favorite`}
                        onClick={() => handleNav("favorites")}
                    >
                        Favorites
                    </div>
                </div>

                {selectedNav === "favorites" ? (
                    <div className="flex flex-wrap">
                        {favorites.map((favorite: SearchParams) => (
                            <div
                                key={favorite.id}
                                className="m-5 flex flex-nowrap"
                            >
                                <div
                                    className="p-5 shadow-md rounded-b-md cursor-pointer"
                                    style={{ backgroundColor: "#e1f3f8" }}
                                    onClick={() => loadFavorite(favorite)}
                                >
                                    <div>
                                        <b>Rover:</b> {favorite.rober}
                                    </div>
                                    <div>
                                        <b>Earth:</b> {favorite.earthDate}
                                    </div>
                                    <div>
                                        <b>Camera:</b>{" "}
                                        {favorite.camera ?? "N/A"}
                                    </div>
                                    <div>
                                        <b>Sol:</b> {favorite.solDate ?? "N/A"}
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFavorite(favorite)}
                                    className="float-right rounded-br-md"
                                    style={{
                                        backgroundColor: "red",
                                        height: 30,
                                        width: 30,
                                        color: "white",
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <FilterNav
                            params={searchParams}
                            onNewParams={(newParams) =>
                                setSearchParams({
                                    ...searchParams,
                                    ...newParams,
                                })
                            }
                            onFavorite={handleFavorite}
                        />

                        <PhotoFeed {...searchParams} />
                    </>
                )}
            </div>
        </main>
    );
}
