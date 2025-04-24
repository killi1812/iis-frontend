import { User } from "./User";

/**
 * Entity
 * @targetNSAlias `tns`
 * @targetNamespace `http://schemas.datacontract.org/2004/07/soap.UserInfoService`
 */
export interface Entity {
    /** xs:anyType */
    Hashtag?: string;
    /** User */
    User?: User;
}
