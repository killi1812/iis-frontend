import { GetUserInfo } from "../definitions/GetUserInfo";
import { GetUserInfoResponse } from "../definitions/GetUserInfoResponse";

export interface BasicHttpBindingIUserInfo {
    GetUserInfo(getUserInfo: GetUserInfo, callback: (err: any, result: GetUserInfoResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
