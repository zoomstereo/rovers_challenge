import { useState } from "react";
import SearchParams, { CameraName, cameraList } from "../_types/SearchParams";
import { getTodayTime } from "../_utils/time";

type OnNewParamCallback = (params: SearchParams) => void;

export default function FilterNav(props: {
    params: SearchParams;
    onNewParams: OnNewParamCallback;
    onFavorite: Function;
}) {
    const [camera, setCamera] = useState<CameraName | undefined>(
        props.params.camera
    );
    const [earthDate, setEarthDate] = useState<string | undefined>(
        props.params.earthDate
    );
    const [solDate, setSolDate] = useState<number | undefined>(
        props.params.solDate
    );

    const handleNewParams = () => {
        props.onNewParams({
            camera,
            earthDate,
            solDate,
        });
    };

    return (
        <div
            className="flex flex-wrap justify-start px-10 py-5"
            style={{
                backgroundColor: "#0b3d91",
                color: "white",
            }}
        >
            <div className="pe-10">
                <label>
                    Camera
                    <select
                        value={camera}
                        style={{ color: "black", marginLeft: 10 }}
                        onChange={(event) =>
                            setCamera(event.target.value as CameraName)
                        }
                    >
                        <option value={""}>-- None --</option>
                        {cameraList.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="pe-10">
                <label>
                    Earth Date
                    <input
                        type="date"
                        value={earthDate}
                        onChange={(e) => setEarthDate(e.target.value)}
                        max={getTodayTime()}
                        style={{ color: "black", marginLeft: 10 }}
                    />
                </label>
            </div>
            <div className="pe-10">
                <label>
                    Sol Date
                    <input
                        type="number"
                        value={solDate}
                        placeholder="E.g: 1000"
                        onChange={(e) => setSolDate(Number(e.target.value))}
                        style={{
                            color: "black",
                            marginLeft: 10,
                            maxWidth: 120,
                        }}
                    />
                </label>
            </div>
            <button
                className="pe-10"
                style={{
                    border: "solid white",
                    textAlign: "center",
                    padding: "0px 12px",
                    marginRight: 20,
                }}
                onClick={handleNewParams}
            >
                Search
            </button>

            <button className="pe-10" onClick={() => props.onFavorite()}>
                Fav
            </button>
        </div>
    );
}
