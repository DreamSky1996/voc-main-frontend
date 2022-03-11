export const calcDate = (detaTime: number) => {
    if (detaTime == 0) {
        return 1;
    }
    const dayTime = 60 * 30;
    const date = Math.floor(detaTime/dayTime) + 1;
    return date;
};
