import SearchParams from "../_types/SearchParams";

export function searchApiString(params: SearchParams) {
    const { solDate, camera, earthDate, page, rober } = params;
    const sol = solDate ? `sol=${solDate}&` : "";
    const cam = camera ? `camera=${camera}&` : "";
    const earth = earthDate && !solDate ? `earth_date=${earthDate}` : "";

    return `https://api.nasa.gov/mars-photos/api/v1/rovers/${rober}/photos?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
    }&${sol}${cam}${earth}&page=${page || 1}`;
}
