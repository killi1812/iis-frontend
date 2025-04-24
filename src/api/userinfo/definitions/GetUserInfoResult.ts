import { AccountBadges } from "./AccountBadges";
import { BioLinks } from "./BioLinks";
import { BiographyWithEntities } from "./BiographyWithEntities";
import { HdProfilePicUrlInfo } from "./HdProfilePicUrlInfo";

/**
 * GetUserInfoResult
 * @targetNSAlias `q1`
 * @targetNamespace `http://schemas.datacontract.org/2004/07/soap.UserInfoService`
 */
export interface GetUserInfoResult {
    /** AccountBadges */
    AccountBadges?: AccountBadges;
    /** xs:int */
    AccountType?: number;
    /** xs:anyType */
    AddressStreet?: string;
    /** xs:string */
    Attempts?: string;
    /** BioLinks */
    BioLinks?: BioLinks;
    /** xs:string */
    Biography?: string;
    /** BiographyWithEntities */
    BiographyWithEntities?: BiographyWithEntities;
    /** xs:string */
    Category?: string;
    /** xs:anyType */
    CityName?: string;
    /** xs:string */
    ExternalLynxUrl?: string;
    /** xs:string */
    ExternalUrl?: string;
    /** xs:string */
    FbidV2?: string;
    /** xs:int */
    FollowerCount?: number;
    /** xs:int */
    FollowingCount?: number;
    /** xs:string */
    FullName?: string;
    /** xs:anyType */
    HasChaining?: string;
    /** xs:anyType */
    HasStoryArchive?: string;
    /** HdProfilePicUrlInfo */
    HdProfilePicUrlInfo?: HdProfilePicUrlInfo;
    /** xs:string */
    Id?: string;
    /** xs:string */
    InteropMessagingUserFbid?: string;
    /** xs:boolean */
    IsBusiness?: boolean;
    /** xs:boolean */
    IsEmbedsDisabled?: boolean;
    /** xs:boolean */
    IsMemorialized?: boolean;
    /** xs:boolean */
    IsPrivate?: boolean;
    /** xs:anyType */
    IsProfessionalAccount?: string;
    /** xs:boolean */
    IsRegulatedC18?: boolean;
    /** xs:boolean */
    IsUnpublished?: boolean;
    /** xs:boolean */
    IsVerified?: boolean;
    /** xs:anyType */
    LatestBestiesReelMedia?: string;
    /** xs:anyType */
    LatestReelMedia?: string;
    /** xs:anyType */
    LiveBroadcastId?: string;
    /** xs:anyType */
    LiveBroadcastVisibility?: string;
    /** xs:int */
    MediaCount?: number;
    /** xs:anyType */
    MutualFollowersCount?: string;
    /** xs:string */
    Pk?: string;
    /** xs:anyType */
    ProfileContextLinksWithUserIds?: string;
    /** xs:string */
    ProfilePicUrl?: string;
    /** xs:anyType */
    ReelMediaSeenTimestamp?: string;
    /** RegulatedNewsInLocations */
    RegulatedNewsInLocations?: AccountBadges;
    /** xs:boolean */
    ShouldShowCategory?: boolean;
    /** xs:boolean */
    ShowAccountTransparencyDetails?: boolean;
    /** xs:boolean */
    ShowTextPostAppBadge?: boolean;
    /** xs:boolean */
    Status?: boolean;
    /** xs:anyType */
    SupervisionInfo?: string;
    /** xs:string */
    TextPostAppBadgeLabel?: string;
    /** xs:int */
    TotalClipsCount?: number;
    /** xs:anyType */
    TransparencyLabel?: string;
    /** xs:anyType */
    TransparencyProduct?: string;
    /** xs:string */
    Username?: string;
    /** xs:anyType */
    Zip?: string;
}
