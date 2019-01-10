export interface VolubleRequest<T> {
    status: "success" | "error" | "fail",
    data: T
}
