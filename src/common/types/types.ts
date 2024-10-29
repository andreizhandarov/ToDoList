export type TestAction<T extends (...args: any) => any> = Omit<ReturnType<T>, "meta">

type FieldErrorType = {
    error: string
    field: string
}

export type BaseResponse<D = {}> = {
    resultCode: number;
    messages: string[];
    data: D;
    fieldsErrors: FieldErrorType[];
};