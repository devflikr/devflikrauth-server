export const inDebug = () => process.env.MODE === "development" && process.env.USE_DEBUG_MODE === "true";

export const timestamp = () => {
    const d = new Date();
    return `${d.getFullYear()}-${(d.getMonth() + 1).toFixed(0).padStart(2, "0")}-${d.getDate().toFixed(0).padStart(2, "0")} ${d.getHours().toFixed(0).padStart(2, "0")}:${d.getMinutes().toFixed(0).padStart(2, "0")}:${d.getSeconds().toFixed(0).padStart(2, "0")}`;
};

export const log = (...data: any): any => inDebug() && console.log(`[${timestamp()} ~ Log]`, ...data);
export const warn = (...data: any): any => inDebug() && console.warn(`[${timestamp()} ~ Warn]`, ...data);
export const error = (...data: any): any => inDebug() && console.error(`[${timestamp()} ~ Error]`, ...data);