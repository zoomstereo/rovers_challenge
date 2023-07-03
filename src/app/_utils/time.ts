export function getTodayTime() {
    return new Date().toISOString().split("T")[0];
}
