export interface CustomErrorDefinition {
    /** Unique short code to identify the error */
    code: number;
    /** Short description of the error */
    message: string;
    /** Detailed description, should include possible causes and resolutions */
    detail?: string;
}

/** Custom error definition */
export interface CustomError extends CustomErrorDefinition {
    /** custom additional detail that can be added */
    addDetail?: string;
    /** Message designed to be logged somewhere */
    logMessage: string;
    /** When the error occured */
    date: Date;
    /** The standard javascript error trace, for debugging */
    trace: Error;
}

export function isCustomError(err: any): err is CustomError {
    return err instanceof Object && typeof err.code === "number" &&
        err.trace instanceof Error;
}

export const genLogMsgDetail = (addDetail?: string): string => {
    return !!addDetail ? ` - ${addDetail}` : "";
};

export function newCustomError({ code, message, trace, addDetail }: {
    code: number, message: string, trace?: Error, addDetail?: string
}): CustomError {
    return {
        code, message, date: new Date(), trace: !!trace ? trace : new Error(), addDetail,
        logMessage: `${code} - ${message}${genLogMsgDetail(addDetail)}`
    };
}