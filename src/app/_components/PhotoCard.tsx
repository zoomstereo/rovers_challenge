import Image from "next/image";
import Photo from "../_types/Photo";

export default function PhotoCard(photo: Photo) {
    return (
        <div
            key={photo.id}
            className="my-6 inline-block w-full group shadow-md rounded-b-md"
            style={{ backgroundColor: "white" }}
        >
            <Image
                src={photo.img_src}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                    width: "100%",
                    height: "auto",
                }} // optional
                alt="Rover Pic"
            />
            <div className="p-5 flex grid grid-rows-2 grid-flow-col gap-2">
                <div>
                    <b>Rover:</b> {photo.rover.name}
                </div>
                <div>
                    <b>Earth:</b> {photo.earth_date}
                </div>
                <div>
                    <b>Camera:</b> {photo.camera.name}
                </div>
                <div>
                    <b>Sol:</b> {photo.sol}
                </div>
            </div>
        </div>
    );
}
