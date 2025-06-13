export const callSoapFromBrowser = async (username: string): Promise<UserInfoResult> => {
  const url = "http://localhost:5206/user-info"
  const soapXml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><GetUserInfo xmlns="http://tempuri.org/"><username>${username}</username></GetUserInfo></Body></Envelope>`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
      },
      body: soapXml
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SOAP Request Failed Raw Response:", errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const responseXmlText = await response.text();
    const userInfoObject = parseUserInfoXml(responseXmlText);
    if (userInfoObject) {
      console.log("Parsed UserInfo Object:", userInfoObject);
      console.log("User Full Name:", userInfoObject.FullName);
      console.log("First BioLink URL:", userInfoObject.BioLinks?.[0]?.Url);
    } else {
      throw Error("Failed to parse user info.");
    }

    return userInfoObject

  } catch (error) {
    console.error("Error during SOAP call:", error);
    throw error;
  }
}
const NS_D4P1 = "http://schemas.datacontract.org/2004/07/soap.UserInfoService";
const NS_XSI = "http://www.w3.org/2001/XMLSchema-instance";
const NS_TEMPURI = "http://tempuri.org/"; // Namespace for GetUserInfoResponse etc.
const NS_SOAP_ENV = "http://schemas.xmlsoap.org/soap/envelope/"; // Namespace for Envelope, Body, Fault

function parseUserInfoXml(xmlString: string): UserInfoResult | null {
  try {
    //@ts-expect-error // postoji
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    // --- Check for SOAP Fault first ---
    const faultNode = xmlDoc.getElementsByTagNameNS(NS_SOAP_ENV, "Fault")[0];
    if (faultNode) {
      // Fault elements themselves are usually not namespaced or use the SOAP envelope namespace
      const faultString = faultNode.getElementsByTagName("faultstring")[0]?.textContent;
      const faultCode = faultNode.getElementsByTagName("faultcode")[0]?.textContent;
      console.error(`SOAP Fault detected: Code=${faultCode}, String=${faultString}`);
      return null; // Indicate failure
    }

    // --- Find the main result element ---
    // Use the correct namespace for GetUserInfoResult based on the parent GetUserInfoResponse
    //
    const responseNode = xmlDoc.getElementsByTagNameNS(NS_TEMPURI, "GetUserInfoResponse")[0];
    if (!responseNode) {
      console.error("Could not find <GetUserInfoResponse> element.");
      return null;
    }
    const resultNode = responseNode.getElementsByTagNameNS(NS_TEMPURI, "GetUserInfoResult")[0];
    if (!resultNode) {
      console.error("Could not find <GetUserInfoResult> element within <GetUserInfoResponse>.");
      // Sometimes the result might not have the d4p1 namespace directly, check tempuri too
      const altResultNode = responseNode.getElementsByTagNameNS(NS_TEMPURI, "GetUserInfoResult")[0];
      if (!altResultNode) {
        console.error("Also could not find <GetUserInfoResult> with tempuri namespace.");
        return null;
      }
      console.warn("Found GetUserInfoResult using tempuri namespace instead of d4p1.");
      return null;
    }


    // --- Helper Functions using getElementsByTagNameNS ---
    const isNil = (node: Element | null | undefined): boolean => {
      return node?.getAttributeNS(NS_XSI, "nil") === "true";
    };

    // Helper to get the first element by NS and local name
    const getElement = (parentNode: Element, ns: string, localName: string): Element | null => {
      const elements = parentNode.getElementsByTagNameNS(ns, localName);
      return elements.length > 0 ? elements[0] : null;
    }

    const getText = (parentNode: Element, ns: string, localName: string): string | null => {
      const node = getElement(parentNode, ns, localName);
      return isNil(node) ? null : node?.textContent ?? null;
    };

    const getInt = (parentNode: Element, ns: string, localName: string): number | null => {
      const text = getText(parentNode, ns, localName);
      if (text === null) return null;
      const num = parseInt(text, 10);
      return isNaN(num) ? null : num;
    };

    const getBool = (parentNode: Element, ns: string, localName: string): boolean | null => {
      const text = getText(parentNode, ns, localName);
      if (text === null) return null;
      const lowerText = text.toLowerCase();
      if (lowerText === 'true') return true;
      if (lowerText === 'false') return false;
      return null;
    };

    // --- Extract data into the result object ---
    const userInfo: UserInfoResult = {
      // Pass NS_D4P1 and the local name (without prefix) to helpers
      AccountBadges: [],
      AccountType: getInt(resultNode, NS_D4P1, "AccountType"),
      AddressStreet: getText(resultNode, NS_D4P1, "AddressStreet"),
      Attempts: getText(resultNode, NS_D4P1, "Attempts"),
      Biography: getText(resultNode, NS_D4P1, "Biography"),
      Category: getText(resultNode, NS_D4P1, "Category"),
      CityName: getText(resultNode, NS_D4P1, "CityName"),
      ExternalLynxUrl: getText(resultNode, NS_D4P1, "ExternalLynxUrl"),
      ExternalUrl: getText(resultNode, NS_D4P1, "ExternalUrl"),
      FbidV2: getText(resultNode, NS_D4P1, "FbidV2"),
      FollowerCount: getInt(resultNode, NS_D4P1, "FollowerCount"),
      FollowingCount: getInt(resultNode, NS_D4P1, "FollowingCount"),
      FullName: getText(resultNode, NS_D4P1, "FullName"),
      Id: getText(resultNode, NS_D4P1, "Id"),
      InteropMessagingUserFbid: getText(resultNode, NS_D4P1, "InteropMessagingUserFbid"),
      IsBusiness: getBool(resultNode, NS_D4P1, "IsBusiness"),
      IsEmbedsDisabled: getBool(resultNode, NS_D4P1, "IsEmbedsDisabled"),
      IsMemorialized: getBool(resultNode, NS_D4P1, "IsMemorialized"),
      IsPrivate: getBool(resultNode, NS_D4P1, "IsPrivate"),
      IsRegulatedC18: getBool(resultNode, NS_D4P1, "IsRegulatedC18"),
      IsUnpublished: getBool(resultNode, NS_D4P1, "IsUnpublished"),
      IsVerified: getBool(resultNode, NS_D4P1, "IsVerified"),
      MediaCount: getInt(resultNode, NS_D4P1, "MediaCount"),
      Pk: getText(resultNode, NS_D4P1, "Pk"),
      ProfilePicUrl: getText(resultNode, NS_D4P1, "ProfilePicUrl"),
      RegulatedNewsInLocations: [], // Assuming based on i:nil="true"
      ShouldShowCategory: getBool(resultNode, NS_D4P1, "ShouldShowCategory"),
      ShowAccountTransparencyDetails: getBool(resultNode, NS_D4P1, "ShowAccountTransparencyDetails"),
      ShowTextPostAppBadge: getBool(resultNode, NS_D4P1, "ShowTextPostAppBadge"),
      Status: getBool(resultNode, NS_D4P1, "Status"),
      TextPostAppBadgeLabel: getText(resultNode, NS_D4P1, "TextPostAppBadgeLabel"),
      TotalClipsCount: getInt(resultNode, NS_D4P1, "TotalClipsCount"),
      Username: getText(resultNode, NS_D4P1, "Username"),
      Zip: getText(resultNode, NS_D4P1, "Zip"),

      // Nullable complex types / types needing special handling
      HasChaining: isNil(getElement(resultNode, NS_D4P1, "HasChaining")) ? null : {},
      HasStoryArchive: isNil(getElement(resultNode, NS_D4P1, "HasStoryArchive")) ? null : {},
      IsProfessionalAccount: isNil(getElement(resultNode, NS_D4P1, "IsProfessionalAccount")) ? null : {},
      LatestBestiesReelMedia: isNil(getElement(resultNode, NS_D4P1, "LatestBestiesReelMedia")) ? null : {},
      LatestReelMedia: isNil(getElement(resultNode, NS_D4P1, "LatestReelMedia")) ? null : {},
      LiveBroadcastId: isNil(getElement(resultNode, NS_D4P1, "LiveBroadcastId")) ? null : {},
      LiveBroadcastVisibility: isNil(getElement(resultNode, NS_D4P1, "LiveBroadcastVisibility")) ? null : {},
      MutualFollowersCount: isNil(getElement(resultNode, NS_D4P1, "MutualFollowersCount")) ? null : {},
      ProfileContextLinksWithUserIds: isNil(getElement(resultNode, NS_D4P1, "ProfileContextLinksWithUserIds")) ? null : {},
      ReelMediaSeenTimestamp: isNil(getElement(resultNode, NS_D4P1, "ReelMediaSeenTimestamp")) ? null : {},
      SupervisionInfo: isNil(getElement(resultNode, NS_D4P1, "SupervisionInfo")) ? null : {},
      TransparencyLabel: isNil(getElement(resultNode, NS_D4P1, "TransparencyLabel")) ? null : {},
      TransparencyProduct: isNil(getElement(resultNode, NS_D4P1, "TransparencyProduct")) ? null : {},

      // Nested Objects / Arrays
      HdProfilePicUrlInfo: (() => {
        const node = getElement(resultNode, NS_D4P1, "HdProfilePicUrlInfo");
        if (!node || isNil(node)) return null;
        return { Url: getText(node, NS_D4P1, "Url") };
      })(),

      BioLinks: (() => {
        const container = getElement(resultNode, NS_D4P1, "BioLinks");
        if (!container || isNil(container)) return null;
        // Get the inner repeating elements
        const nodes = container.getElementsByTagNameNS(NS_D4P1, "BioLinks");
        if (!nodes || nodes.length === 0) return null;
        const links: BioLink[] = [];
        // Convert HTMLCollection to Array to use forEach
        Array.from(nodes).forEach(node => {
          if (!isNil(node)) {
            links.push({
              LinkType: getText(node, NS_D4P1, "LinkType"),
              LynxUrl: getText(node, NS_D4P1, "LynxUrl"),
              Title: getText(node, NS_D4P1, "Title"),
              Url: getText(node, NS_D4P1, "Url"),
            });
          }
        });
        return links.length > 0 ? links : null;
      })(),

      BiographyWithEntities: (() => {
        const bioNode = getElement(resultNode, NS_D4P1, "BiographyWithEntities");
        if (!bioNode || isNil(bioNode)) return null;
        const entitiesContainer = getElement(bioNode, NS_D4P1, "Entities");
        if (!entitiesContainer || isNil(entitiesContainer)) return { Entities: null };
        const entityNodes = entitiesContainer.getElementsByTagNameNS(NS_D4P1, "Entity");
        if (!entityNodes || entityNodes.length === 0) return { Entities: null };

        const entities: Entity[] = [];
        Array.from(entityNodes).forEach(eNode => {
          if (!isNil(eNode)) {
            const userNode = getElement(eNode, NS_D4P1, "User");
            entities.push({
              Hashtag: isNil(getElement(eNode, NS_D4P1, "Hashtag")) ? null : {},
              User: (!userNode || isNil(userNode)) ? null : {
                Id: getText(userNode, NS_D4P1, "Id"),
                Username: getText(userNode, NS_D4P1, "Username")
              }
            });
          }
        });
        return { Entities: entities.length > 0 ? entities : null };
      })(),
    };

    return userInfo;

  } catch (error) {
    console.error("Error parsing SOAP XML:", error);
    return null;
  }
}

