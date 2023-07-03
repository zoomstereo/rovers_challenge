export default interface Photo {
    id: number;
    sol: number;
    camera: {
        id: number;
        remover_id: number;
        full_name: string;
        name: string;
    };
    img_src: string;
    earth_date: string;
    rover: {
        id: number;
        name: string;
        rover_id: number;
    };
}
