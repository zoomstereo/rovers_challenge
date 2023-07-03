export type CameraName =
    | "FHAZ"
    | "RHAZ"
    | "MAST"
    | "CHEMCAM"
    | "MAHLI"
    | "MARDI"
    | "NAVCAM"
    | "PANCAM"
    | "MINITES";

export type RoberName = "curiosity" | "opportunity" | "spirit";

export const cameraList = [
    "FHAZ",
    "RHAZ",
    "MAST",
    "CHEMCAM",
    "MAHLI",
    "MARDI",
    "NAVCAM	",
    "PANCAM",
    "MINITES",
];

export default interface SearchParams {
    id?: number;
    rober?: "curiosity" | "opportunity" | "spirit";
    camera?: CameraName;
    earthDate?: string;
    solDate?: number;
    page?: number;
}
