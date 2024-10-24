export type TestAction<T extends (...args: any) => any> = Omit<ReturnType<T>, "meta">

export type ResponseType<D = {}> = {
    resultCode: number;
    messages: string[];
    data: D;
};