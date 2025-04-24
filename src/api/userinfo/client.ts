import { Client as SoapClient, createClientAsync as soapCreateClientAsync, IExOptions as ISoapExOptions } from "soap";
import { GetUserInfo } from "./definitions/GetUserInfo";
import { GetUserInfoResponse } from "./definitions/GetUserInfoResponse";
import { IUserInfo } from "./services/IUserInfo";

export interface UserInfoClient extends SoapClient {
    IUserInfo: IUserInfo;
    GetUserInfoAsync(getUserInfo: GetUserInfo, options?: ISoapExOptions): Promise<[result: GetUserInfoResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
}

/** Create UserInfoClient */
export function createClientAsync(...args: Parameters<typeof soapCreateClientAsync>): Promise<UserInfoClient> {
    return soapCreateClientAsync(args[0], args[1], args[2]) as any;
}
