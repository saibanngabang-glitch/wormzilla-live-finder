export type Platform='youtube'|'twitch'|'tiktok'|'facebook'|'kick';
export type Country='VN'|'ID'|'TH'|'GLOBAL';
export type LiveStatus='LIVE NOW'|'OFFLINE'|'UNKNOWN';
export type PlatformState='ok'|'unsupported'|'not_configured'|'error'|'quota_exceeded'|'rate_limited';
export interface Stream {id:string;streamer:string;url:string;platform:Platform;title:string;thumbnail:string;startedAt:string|null;status:LiveStatus;viewers:number|null;country:Country|null;countryLabel:'Verified Vietnam'|'Likely Vietnam'|'Country Unknown'|'Verified Indonesia'|'Likely Indonesia'|'Verified Thailand'|'Likely Thailand';language:string|null;}
export interface AdapterResult {state:PlatformState;streams:Stream[];message?:string}
export interface SearchResponse {streams:Stream[];platforms:Partial<Record<Platform,{state:PlatformState;message?:string}>>;cachedForSeconds:number;searchedAt:string;message?:string}
