import { Entities } from "./Entities";

/**
 * BiographyWithEntities
 * @targetNSAlias `tns`
 * @targetNamespace `http://schemas.datacontract.org/2004/07/soap.UserInfoService`
 */
export interface BiographyWithEntities {
    /** Entities */
    Entities?: Entities;
}
