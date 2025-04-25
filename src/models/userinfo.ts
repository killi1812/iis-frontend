interface HdProfilePicURLInfo {
  Url?: string | null;
}

interface BioLink {
  LinkType?: string | null;
  LynxUrl?: string | null;
  Title?: string | null;
  Url?: string | null;
}

interface UserEntity {
  Id?: string | null;
  Username?: string | null;
}

interface Entity {
  Hashtag?: any | null;
  User?: UserEntity | null;
}

interface BiographyWithEntities {
  Entities?: Entity[] | null;
}

interface UserInfoResult {
  AccountBadges?: any[] | null;
  AccountType?: number | null;
  AddressStreet?: string | null;
  Attempts?: string | null;
  BioLinks?: BioLink[] | null;
  Biography?: string | null;
  BiographyWithEntities?: BiographyWithEntities | null;
  Category?: string | null;
  CityName?: string | null;
  ExternalLynxUrl?: string | null;
  ExternalUrl?: string | null;
  FbidV2?: string | null;
  FollowerCount?: number | null;
  FollowingCount?: number | null;
  FullName?: string | null;
  HasChaining?: any | null;
  HasStoryArchive?: any | null;
  HdProfilePicUrlInfo?: HdProfilePicURLInfo | null;
  Id?: string | null;
  InteropMessagingUserFbid?: string | null;
  IsBusiness?: boolean | null;
  IsEmbedsDisabled?: boolean | null;
  IsMemorialized?: boolean | null;
  IsPrivate?: boolean | null;
  IsProfessionalAccount?: any | null;
  IsRegulatedC18?: boolean | null;
  IsUnpublished?: boolean | null;
  IsVerified?: boolean | null;
  LatestBestiesReelMedia?: any | null;
  LatestReelMedia?: any | null;
  LiveBroadcastId?: any | null;
  LiveBroadcastVisibility?: any | null;
  MediaCount?: number | null;
  MutualFollowersCount?: any | null;
  Pk?: string | null;
  ProfileContextLinksWithUserIds?: any | null;
  ProfilePicUrl?: string | null;
  ReelMediaSeenTimestamp?: any | null;
  RegulatedNewsInLocations?: any[] | null;
  ShouldShowCategory?: boolean | null;
  ShowAccountTransparencyDetails?: boolean | null;
  ShowTextPostAppBadge?: boolean | null;
  Status?: boolean | null;
  SupervisionInfo?: any | null;
  TextPostAppBadgeLabel?: string | null;
  TotalClipsCount?: number | null;
  TransparencyLabel?: any | null;
  TransparencyProduct?: any | null;
  Username?: string | null;
  Zip?: string | null;
}
